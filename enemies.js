this.TURN_CHANCE_ADJUST = 30;
this.fallAcc = 562.5;

class Met {
    constructor(game, x, y, facing) {
        Object.assign(this, { game, x, y , facing});
        this.SPRITE_WIDTH = 20;
        this.SPRITE_HEIGHT = 19
        this.HEALTH_POINTS = 2;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");

        this.state = 0; //0=idle, 1=aggressive, 2=dead
        this.action = 3; //0=walk, 1=stationary/shooting/dead, 2=hide, 3=hidden, 4=unhide
        this.velocity = {x: 0, y: 0}
        this.turnTimer = 2;
        this.firstFireOccurred = 0;
        this.hideTimer = 0;
        this.hasFired = 0;

        this.dead = false;
        this.deadTimer = 0;
        this.paused = true;
        this.flickerFlag = false;

        this.animations = [];
        for (var i = 0; i < 2; i++) { //two directions
            this.animations.push([]);
        }
        //animations do not depend on state

        this.animations[0][0] = new Animator(this.spritesheet, 138, 36, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 2, 0.09 * 3, 5, true, true); //walk
        this.animations[0][1] = new Animator(this.spritesheet, 116, 36, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 1, 0.09 * 3, 5, false, true) //stationary/dead
        this.animations[0][2] = new Animator(this.spritesheet, 72, 36, 18, this.SPRITE_HEIGHT, 3, 0.09 * 3, 4, true, false) //hide
        this.animations[0][3] = new Animator(this.spritesheet, 72, 36, 18, this.SPRITE_HEIGHT, 1, 0.09 * 2, 4, false, true) //hidden
        this.animations[0][4] = new Animator(this.spritesheet, 72, 36, 18, this.SPRITE_HEIGHT, 3, 0.09 * 3, 4, false, false) //unhide

        this.animations[1][0] = new Animator(this.spritesheet, 187, 36, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 2, 0.09 * 3, 5, false, true); //walk
        this.animations[1][1] = new Animator(this.spritesheet, 236, 36, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 1, 0.09 * 3, 5, false, true) //stationary/dead
        this.animations[1][2] = new Animator(this.spritesheet, 236, 36, 18, this.SPRITE_HEIGHT, 3, 0.09 * 3, 4, false, false) //hide
        this.animations[1][3] = new Animator(this.spritesheet, 280, 36, 18, this.SPRITE_HEIGHT, 1, 0.09 * 2, 4, false, true) //hidden
        this.animations[1][4] = new Animator(this.spritesheet, 236, 36, 18, this.SPRITE_HEIGHT, 3, 0.09 * 3, 4, true, false) //unhide

        this.updateBB();
    }
    update() {

        if (this.dead) {
            this.deadTimer += this.game.clockTick;
            if (this.deadTimer > 0.5) this.removeFromWorld = true;  // flicker for half a second
        }
        if (this.paused && this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH) {
            this.paused = false;
        }
        if (!this.dead && !this.paused) {
        //console.log(this.action);
            this.velocity.y += fallAcc * this.game.clockTick * PARAMS.SCALE;
            if (this.state == 1) {
                // Todo: Aggressive state
                if (!this.firstFireOccurred) {
                    this.firstFireOccurred = 1;
                    this.action = 4;
                } else if (this.action == 4) {
                    if (this.animations[0][4].isDoneNextFrame(this.game.clockTick) || this.animations[1][4].isDoneNextFrame(this.game.clockTick)) {
                        this.animations[0][4] = new Animator(this.spritesheet, 72, 36, 18, this.SPRITE_HEIGHT, 3, 0.09 * 3, 4, false, false) //unhide
                        this.animations[1][4] = new Animator(this.spritesheet, 236, 36, 18, this.SPRITE_HEIGHT, 3, 0.09 * 3, 4, true, false) //unhide
                        this.idleTimer = 0;
                        this.action = 1;
                        this.walkTimer = 0.5;
                        this.hasFired = 0;
                    }
                } else if (this.action == 1) {
                    if (!this.hasFired) {
                        this.hasFired = 1;
                        if (this.facing == 0) {
                            this.game.addEntity(new MetProjectile(this.game, this.x - 2, this.y + this.SPRITE_HEIGHT, Math.PI));
                            this.game.addEntity(new MetProjectile(this.game, this.x - 2, this.y + this.SPRITE_HEIGHT, 3 * Math.PI / 4));
                            this.game.addEntity(new MetProjectile(this.game, this.x - 2, this.y + this.SPRITE_HEIGHT, 5 * Math.PI / 4));
                        } else {
                            this.game.addEntity(new MetProjectile(this.game, this.x + 36 + 2, this.y + this.SPRITE_HEIGHT, 0));
                            this.game.addEntity(new MetProjectile(this.game, this.x + 36 + 2, this.y + this.SPRITE_HEIGHT, Math.PI / 4));
                            this.game.addEntity(new MetProjectile(this.game, this.x + 36 + 2, this.y + this.SPRITE_HEIGHT, -Math.PI / 4));
                        }
                    }
                    this.walkTimer -= this.game.clockTick;
                    if (this.walkTimer <= 0) {
                        this.walkTimer = 0;
                        this.action = 0;
                        this.hideTimer = 1;
                    }
                } else if (this.action == 0) {
                    this.velocity.x = this.facing == 0 ? -15 : 15
                    this.turnTimer -= this.game.clockTick;
                    this.hideTimer -= this.game.clockTick;
                    if (this.hideTimer <= 0) {
                        this.hideTimer = 0;
                        if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to hide each 1/30 sec after one second of walking (adjust to framerate using clockTick)
                            this.action = 2;
                            this.hiddenTimer = 0.09 * 3;
                        }
                    }
                    if (this.turnTimer <= 0) {
                        this.turnTimer = 0;
                        if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                            this.turnTimer = 2;
                            this.facing = (this.facing == 1 ? 0 : 1);
                            this.velocity.x = -this.velocity.x;
                            console.log("random met turn");
                        } else {
                            //console.log("check failed");
                        }
                    }
                } else if (this.action == 2) {
                    this.velocity.x = 0;
                    this.hiddenTimer -= this.game.clockTick;
                    if (this.animations[0][2].isDoneNextFrame(this.game.clockTick) || this.animations[1][2].isDoneNextFrame(this.game.clockTick)) {
                        this.animations[0][2] = new Animator(this.spritesheet, 72, 36, 18, this.SPRITE_HEIGHT, 3, 0.09 * 3, 4, true, false) //hide
                        this.animations[1][2] = new Animator(this.spritesheet, 236, 36, 18, this.SPRITE_HEIGHT, 3, 0.09 * 3, 4, false, false) //hide
                        this.hiddenTimer = 0;
                        this.action = 3;
                        this.unhideTimer = 1.5;
                    }
                } else if (this.action == 3) {
                    this.velocity.x = 0;
                    this.unhideTimer -= this.game.clockTick;
                    if (this.unhideTimer <= 0) {
                        this.unhideTimer = 0;
                        this.action = 4;
                        this.idleTimer = 0.09 * 3;
                    }
                }
            }
            this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
            this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            this.updateBB();

            var that = this;
            this.game.entities.forEach(function (entity) {
                //console.log(entity);
                //console.log(entity.BB);
                if (entity.BB && that.BB.collide(entity.BB)) {
                    //console.log(entity.BB);
                    if ((entity instanceof Pellet)) {
                        //update lose life
                    }
                    if (entity instanceof Tile && that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE <= entity.BB.top) {
                        that.y = entity.BB.top - that.SPRITE_HEIGHT * 2;
                        that.velocity.y = 0;
                        that.updateBB();
                    } else if (entity !== that && !(entity instanceof Pellet)) { //&& !(entity instanceof Megaman)

                        //console.log(that.x);
                        //console.log(entity.BB.right);
                        //console.log("collision");

                        if (that.facing == 1 && that.BB.right - that.velocity.x * that.game.clockTick * PARAMS.SCALE <= entity.BB.left) {
                            that.velocity.x = -that.velocity.x;
                            that.facing = (that.facing == 1 ? 0 : 1);
                            that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                            that.turnTimer = that.game.timer.gameTime;
                            console.log("met collision turn");
                            console.log(entity);
                        } else if (that.facing == 0 && that.BB.left - that.velocity.x * that.game.clockTick * PARAMS.SCALE >= entity.BB.right) {
                            that.velocity.x = -that.velocity.x;
                            that.facing = (that.facing == 1 ? 0 : 1);
                            that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                            that.turnTimer = that.game.timer.gameTime;
                            console.log("met collision turn");
                            console.log(entity);
                        }
                    }
                }
                if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH / 2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT / 2 - that.y) ** 2) < 250) {
                    that.state = 1;
                }
            });
            this.updateBB();
        }
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.SPRITE_WIDTH * 2, this.SPRITE_HEIGHT * 2)
    }

    draw(ctx) {
        if (this.dead) {
            if (this.flickerFlag) {
                this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 2);
            }
            this.flickerFlag = !this.flickerFlag;
        } else {
            this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 2);
            if (PARAMS.DEBUG) {
                ctx.strokeRect(this.BB.x- this.game.camera.x, this.BB.y- this.game.camera.y, this.BB.width, this.BB.height);
                ctx.font = "25px Arial";
                
                if (this.state == 0) {
                    ctx.fillStyle = "Lightgreen";
                } else {
                    ctx.fillStyle = "Red";
                }
                ctx.fillText(" • ", this.BB.x- this.game.camera.x, this.BB.y- this.game.camera.y);
            }
            //this.animations[0][0].drawFrame(this.game.clockTick, ctx, 16, 16, 2);
            //this.animations[0][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 5, 2);
            //this.animations[0][2].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 10, 2);
            //this.animations[0][3].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 15, 2);
            //this.animations[0][4].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 20, 2);

            //this.animations[1][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16, 2);
            //this.animations[1][1].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 5, 2);
            //this.animations[1][2].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 10, 2);
            //this.animations[1][3].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 15, 2);
            //this.animations[1][4].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 20, 2);

        }
    }
}

class Carock {
    constructor(game, x, y, megaman) {
        Object.assign(this, { game, x, y, megaman });

        this.state = 0; //0=idle, 1=aggressive, 2=dead
        this.action = 0; //0=walk, 1=firing, 2=stationary
        this.facing = 0; //0=left, 1=right
        this.velocity = { x: -40, y: 0 }
        this.turnTimer = 2;
        this.SPRITE_WIDTH_WALK = 20;
        this.SPRITE_WIDTH_FIRE = 32;
        this.SPRITE_HEIGHT = 47;
        this.HEALTH_POINTS = 3;
        this.fireTimer = 0;
        this.walkTimer = 0;
        this.startFireTimer = 1;
        this.firstFireOccurred = false;

        this.dead = false;
        this.deadTimer = 0;
        this.paused = true;
        this.flickerFlag = false;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");

        this.animations = [];
        for (var i = 0; i < 2; i++) { //two directions
            this.animations.push([]);
        }
        this.animations[0][0] = new Animator(this.spritesheet, 138, 197, this.SPRITE_WIDTH_WALK, this.SPRITE_HEIGHT, 2, 0.09 * 3, 4, true, true); //walk left
        this.animations[1][0] = new Animator(this.spritesheet, 188, 197, this.SPRITE_WIDTH_WALK, this.SPRITE_HEIGHT, 2, 0.09 * 3, 4, false, true); //walk right

        this.animations[0][1] = new Animator(this.spritesheet, 102, 197, this.SPRITE_WIDTH_FIRE, this.SPRITE_HEIGHT, 1, 0.09 * 3, 4, false, true);//fire left
        this.animations[1][1] = new Animator(this.spritesheet, 236, 197, this.SPRITE_WIDTH_FIRE, this.SPRITE_HEIGHT, 1, 0.09 * 3, 4, false, true);//fire right

        this.animations[0][2] = new Animator(this.spritesheet, 138, 197, this.SPRITE_WIDTH_WALK, this.SPRITE_HEIGHT, 1, 0.09 * 3, 4, true, true);
        this.animations[1][2] = new Animator(this.spritesheet, 188, 197, this.SPRITE_WIDTH_WALK, this.SPRITE_HEIGHT, 1, 0.09 * 3, 4, false, true);

        this.updateBB();
    }
    update() {
        if (this.dead) {
            this.deadTimer += this.game.clockTick;
            if (this.deadTimer > 0.5) this.removeFromWorld = true;  // flicker for half a second
        }
        if (this.paused && this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH) {
            this.paused = false;
        }
        if (!this.dead && !this.paused) {
            this.velocity.y += fallAcc * this.game.clockTick * PARAMS.SCALE;
            if (this.state == 0) {
                if (this.action == 0) {
                    if (this.turnTimer <= 0) {
                        if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                            this.turnTimer = 2;
                            this.facing = (this.facing == 1 ? 0 : 1);
                            this.velocity.x = -this.velocity.x;
                        }
                    }
                }
            } else if (this.state == 1) {
                if (!this.firstFireOccurred) {
                    this.action = 2;
                    this.fireTimer = 0.5;
                    this.firstFireOccurred = true;
                } else if (this.action == 2) {
                    if (this.megaman.x < this.x) this.facing = 0;
                    else this.facing = 1;
                    this.velocity.x = 0;
                    this.fireTimer -= this.game.clockTick;
                    if (this.fireTimer <= 0) {
                        var rand = Math.random();
                        this.game.addEntity(new CarockBeam(this.game, this.facing == 0 ? this.x - 16 : this.x + this.SPRITE_WIDTH_FIRE * 2, rand < 0.5 ? this.y : this.y + 48, this.facing));
                        this.action = 1;
                        this.fireTimer = 0;
                        this.walkTimer = 0.5;
                    }
                } else if (this.action == 1) {
                    this.walkTimer -= this.game.clockTick;
                    if (this.walkTimer <= 0) {
                        this.action = 0;
                        this.walkTimer = 0;
                        this.velocity.x = (this.facing == 0 ? -40 : 40);
                    }
                } else {
                    // Todo: Aggressive state
                    if (this.action == 0) {
                        this.turnTimer -= this.game.clockTick;
                        this.startFireTimer -= this.game.clockTick;
                        if (this.startFireTimer <= 0) {
                            this.startFireTimer = 0;
                            if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to start firing each 1/30 sec after one second of waiting
                                this.startFireTimer = 2;
                                this.action = 2;
                                this.fireTimer = 0.5;
                            }
                        }
                        else if (this.turnTimer <= 0) {
                            this.turnTimer = 0;
                            if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                                this.turnTimer = 2;
                                this.facing = (this.facing == 1 ? 0 : 1);
                                this.velocity.x = -this.velocity.x;
                            }
                        }
                    }
                }
            }

            this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
            this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            this.updateBB();

            var that = this;
            this.game.entities.forEach(function (entity) {
                //console.log(entity);
                //console.log(entity.BB);
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if((entity instanceof Pellet)){
                        //update lose life
                    }
                    //console.log(entity.BB);
                    if (entity instanceof Tile && that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE <= entity.BB.top) {
                        that.y = entity.BB.top - that.SPRITE_HEIGHT * 2;
                        that.velocity.y = 0;
                        that.updateBB();
                    } else if (entity !== that && !(entity instanceof Pellet)) { //&& !(entity instanceof Megaman)
                        
                        //console.log(that.x);
                        //console.log(entity.BB.right);
                        //console.log("collision");

                        if (that.facing == 1 && that.BB.right - that.velocity.x * that.game.clockTick * PARAMS.SCALE <= entity.BB.left) {
                            that.velocity.x = -that.velocity.x;
                            that.facing = (that.facing == 1 ? 0 : 1);
                            that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                            that.turnTimer = that.game.timer.gameTime;
                        } else if (that.facing == 0 && that.BB.left - that.velocity.x * that.game.clockTick * PARAMS.SCALE >= entity.BB.right) {
                            that.velocity.x = -that.velocity.x;
                            that.facing = (that.facing == 1 ? 0 : 1);
                            that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                            that.turnTimer = that.game.timer.gameTime;
                        }
                    }
                }
                if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH/2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT/2 - that.y) ** 2) < 250) {
                    that.state = 1;
                }
            });
            this.updateBB();
        }
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.SPRITE_WIDTH_WALK * 2, this.SPRITE_HEIGHT * 2)
    }

    draw(ctx) {
        if (this.dead) {
            if (this.flickerFlag) {
                this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 2);
            }
            this.flickerFlag = !this.flickerFlag;
        } else {
            this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 2);
            //this.animations[0][0].drawFrame(this.game.clockTick, ctx, 16, 16, 2);
            //this.animations[1][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16, 2);

            //this.animations[0][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 10, 2);
            //this.animations[1][1].drawFrame(this.game.clockTick, ctx, 16+16*5, 16 + 16 * 10, 2);
            if (PARAMS.DEBUG) {
                ctx.strokeRect(this.BB.x- this.game.camera.x, this.BB.y- this.game.camera.y, this.BB.width, this.BB.height);
                if (this.state == 0) {
                    ctx.fillStyle = "Lightgreen";
                } else {
                    ctx.fillStyle = "Red";
                }
                ctx.fillText(" • ", this.BB.x- this.game.camera.x, this.BB.y- this.game.camera.y);
            }
        }
    }
}

class Bulldozer {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");
        this.state = 0; //0=idle, 1=aggressive, 2=dead
        this.action = 0; //0=slow roll, 1=fast roll, 2=stationary/dead
        this.facing = 0; //0=left, 1=right
        this.velocity = { x: -25, y: 0 };
        this.turnTimer = this.game.timer.gameTime;
        this.met = new BulldozerMet(this.game, this);
        this.game.addEntity(this.met);

        this.dead = false;
        this.deadTimer = 0;
        this.paused = true;
        this.flickerFlag = false;

        this.SPRITE_WIDTH = 40;
        this.SPRITE_HEIGHT = 64;

        this.animations = [];
        for (var i = 0; i < 2; i++) { //two directions
            this.animations.push([]);
        }

        this.animations[0][0] = new Animator(this.spritesheet, 97, 126, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 2, 0.09 * 3, 5, true, true); //slow roll
        this.animations[0][1] = new Animator(this.spritesheet, 97, 126, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 2, 0.09, 5, true, true); //fast roll
        this.animations[0][2] = new Animator(this.spritesheet, 142, 126, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 1, 0.09, 5, true, true); //stationary/dead
        this.animations[1][0] = new Animator(this.spritesheet, 188, 126, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 2, 0.09 * 3, 5, false, true); //slow roll
        this.animations[1][1] = new Animator(this.spritesheet, 188, 126, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 2, 0.09, 5, false, true); //fast roll
        this.animations[1][2] = new Animator(this.spritesheet, 188, 126, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 1, 0.09, 5, false, true); //stationary/dead

        this.updateBB();
    }
    update() {
        if (this.dead) {
            this.deadTimer += this.game.clockTick;
            if (this.deadTimer > 0.5) this.removeFromWorld = true;  // flicker for half a second
        }
        if (this.paused && this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH) {
            this.paused = false;
        }
        if (!this.dead && !this.paused) {
            this.velocity.y += fallAcc * this.game.clockTick * PARAMS.SCALE;
            if (this.state == 0) {
                if (this.action == 0) {
                    if (this.game.timer.gameTime - this.turnTimer >= 2) {
                        if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                            this.turnTimer = this.game.timer.gameTime;
                            this.facing = (this.facing == 1 ? 0 : 1);
                            this.velocity.x = -this.velocity.x;
                        }
                    }
                }
            } else if (this.state == 1) {
                if (this.action == 0) {
                    if (this.game.timer.gameTime - this.turnTimer >= 2) {
                        if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                            this.turnTimer = this.game.timer.gameTime;
                            this.facing = (this.facing == 1 ? 0 : 1);
                            this.velocity.x = -this.velocity.x;
                        }
                    }
                }
            }

            this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
            this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;

            this.updateBB();

            var that = this;
            this.game.entities.forEach(function (entity) {
                //console.log(entity);
                //console.log(entity.BB);
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if((entity instanceof Pellet)){
                        //update lose life
                    }
                    //console.log(entity.BB);
                    if (entity instanceof Tile && that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE <= entity.BB.top) {
                        that.y = entity.BB.top - that.SPRITE_HEIGHT * 2;
                        that.velocity.y = 0;
                        that.updateBB();
                    } else if (entity !== that &&!(entity instanceof Pellet)&& !(entity instanceof Megaman)) { //

                        //console.log(that.x);
                        //console.log(entity.BB.right);
                        //console.log("collision");

                        if (that.facing == 1 && that.BB.right - that.velocity.x * that.game.clockTick * PARAMS.SCALE <= entity.BB.left) {
                            that.velocity.x = -that.velocity.x;
                            that.facing = (that.facing == 1 ? 0 : 1);
                            that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                            that.turnTimer = that.game.timer.gameTime;
                        } else if (that.facing == 0 && that.BB.left - that.velocity.x * that.game.clockTick * PARAMS.SCALE >= entity.BB.right) {
                            that.velocity.x = -that.velocity.x;
                            that.facing = (that.facing == 1 ? 0 : 1);
                            that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                            that.turnTimer = that.game.timer.gameTime;
                        }
                    }
                }

                if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH/2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT/2 - that.y) ** 2) < 400 &&
                Math.sqrt((entity.x + entity.MEGAMAN_WIDTH/2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT/2 - that.y) ** 2) > 350) {
                    that.state=1
                    that.action=0;
                    if(entity.x - that.x <0){
                        that.facing = 0
                        that.velocity.x = -30
                    } else if(entity.x - that.x >0){
                        that.facing=1;
                        that.velocity.x = 30
                    }

                }else if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH/2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT/2 - that.y) ** 2) <200 ){
                    that.state = 1;
                    that.action = 1;
                    if(that.facing==0){
                        that.velocity.x = -150
                    } else if(that.facing==1){
                        that.velocity.x = 150
                    } 
                } else{
                    that.state = 0;
                    that.action = 0;
                }



            });
            this.updateBB();
        }
    }

    updateBB() {
        if (this.facing == 0) {
            this.BB = new BoundingBox(this.x + 25, this.y + 48, this.SPRITE_WIDTH * 2 - 10 - 25, this.SPRITE_HEIGHT * 2 - 48)
        } else {
            this.BB = new BoundingBox(this.x + 10, this.y + 48, this.SPRITE_WIDTH * 2 - 10 - 25, this.SPRITE_HEIGHT * 2 - 48)
        }
    }

    draw(ctx) {
        if (this.dead) {
            if (this.flickerFlag) {
                this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 2);
            }
            this.flickerFlag = !this.flickerFlag;
        } else {
            this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 2);

            //console.log(this.animations[0][0][0]);
            //this.animations[0][0].drawFrame(this.game.clockTick, ctx, 16, 16, 2);
            //this.animations[0][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 10, 2);
            //this.animations[0][2].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 20, 2);
            //this.animations[1][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 7, 16, 2);
            //this.animations[1][1].drawFrame(this.game.clockTick, ctx, 16 + 16 * 7, 16 + 16 * 10, 2);
            //this.animations[1][2].drawFrame(this.game.clockTick, ctx, 16 + 16 * 7, 16 + 16 * 20, 2);

            if (PARAMS.DEBUG) {
                ctx.strokeRect(this.BB.x- this.game.camera.x, this.BB.y- this.game.camera.y, this.BB.width, this.BB.height);
                if (this.state == 0) {
                    ctx.fillStyle = "Lightgreen";
                } else {
                    ctx.fillStyle = "Red";
                }
                ctx.strokeRect(this.BB.x- this.game.camera.x, this.BB.y- this.game.camera.y, this.BB.width, this.BB.height);
            }
        }
    }
}

class BulldozerMet {
    constructor(game, bulldozer) {
        Object.assign(this, { game, bulldozer });
        this.HEALTH_POINTS = 6;
        this.MET_WIDTH = 46;
        this.MET_HEIGHT = 48;
        this.dead = this.bulldozer.dead;
        if (this.bulldozer.facing == 0) {
            this.x = this.bulldozer.x + 10 + 14;
            this.y = this.bulldozer.y;
        } else {
            this.x = this.bulldozer.x + 10;
            this.y = this.bulldozer.y;
        }
        this.updateBB();
    }

    update() {
        if (this.bulldozer.facing == 0) {
            this.x = this.bulldozer.x + 10 + 14;
            this.y = this.bulldozer.y;
        } else {
            this.x = this.bulldozer.x + 10;
            this.y = this.bulldozer.y;
        }
        this.updateBB();
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.MET_WIDTH, this.MET_HEIGHT);
    }

    draw(ctx) {
        if (!this.dead) {
            if (PARAMS.DEBUG) {
                ctx.fillStyle = "Red";
                ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, this.MET_WIDTH, this.MET_HEIGHT);
            }
        }
    }
}

class ArmorKnight {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");

        this.state = 0; //0=idle, 1=aggressive, 2=dead
        this.action = 0; //0=walk, 1=attacking
        this.facing = 0; //0=left, 1=right
        this.velocity = { x: -25, y: 0 };
        this.turnTimer = this.game.timer.gameTime;
        this.attackTimer = 0;
        this.HEALTH_POINTS = 4;

        this.SPRITE_WIDTH_WALK = 24;
        this.SPRITE_WIDTH_ATTACK = 39;
        this.SPRITE_HEIGHT = 32;
        this.SPEAR_LENGTH = 17;

        this.dead = false;
        this.deadTimer = 0;
        this.paused = true;
        this.flickerFlag = false;

        this.animations = [];
        for (var i = 0; i < 2; i++) { //two directions
            this.animations.push([]);
        }

        this.animations[0][0] = new Animator(this.spritesheet, 65, 65, this.SPRITE_WIDTH_WALK, this.SPRITE_HEIGHT, 3, 0.09 * 3, 2, true, true); // walk
        this.animations[0][1] = new Animator(this.spritesheet, 143, 65, this.SPRITE_WIDTH_ATTACK, this.SPRITE_HEIGHT, 1, 0.09 * 3, 0, false, true); //spear attack
        this.animations[1][0] = new Animator(this.spritesheet, 229, 65, this.SPRITE_WIDTH_WALK, this.SPRITE_HEIGHT, 3, 0.09 * 3, 2, false, true); // walk
        this.animations[1][1] = new Animator(this.spritesheet, 188, 65, this.SPRITE_WIDTH_ATTACK, this.SPRITE_HEIGHT, 1, 0.09 * 3, 0, false, true); //spear attack
        this.updateBB();
        this.shield = new ArmorKnightShield(this.game, this)
        this.game.addEntity(this.shield);
    }
    update() {
        if (this.dead) {
            this.deadTimer += this.game.clockTick;
            if (this.deadTimer > 0.5) this.removeFromWorld = true;  // flicker for half a second
        }
        if (this.paused && this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH) {
            this.paused = false;
        }
        if (!this.dead && !this.paused) {
            this.velocity.y += fallAcc * this.game.clockTick * PARAMS.SCALE;
            if (this.state == 0) {
                if (this.action == 0) {
                    if (this.game.timer.gameTime - this.turnTimer >= 2) {
                        if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                            //console.log("random turn");
                            this.turnTimer = this.game.timer.gameTime;
                            this.facing = (this.facing == 1 ? 0 : 1);
                            this.velocity.x = -this.velocity.x;
                        }
                    }
                }
            } else if (this.state == 1) {           
                if (this.action == 0) {
                    if (this.game.timer.gameTime - this.turnTimer >= 2) {
                        if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                            //console.log("random turn");
                            this.turnTimer = this.game.timer.gameTime;
                            this.facing = (this.facing == 1 ? 0 : 1);
                            this.velocity.x = -this.velocity.x;
                        }
                    }
                }
            }

            this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
            this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            this.updateBB();

            var that = this;
            this.game.entities.forEach(function (entity) {
                //console.log(entity);
                //console.log(entity.BB);
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if((entity instanceof Pellet)){
                        //update lose life
                    }
                    //console.log(entity.BB);
                    if (entity instanceof Tile && that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE <= entity.BB.top) {
                        that.y = entity.BB.top - that.SPRITE_HEIGHT * 2.25;
                        that.velocity.y = 0;
                        that.updateBB();
                    }                 
                    else if (entity !== that&&!(entity instanceof Pellet) && !(entity instanceof Megaman)) { // )
                        
                        // console.log(that.x);
                        // console.log(entity.BB.right);
                        //console.log("collision");

                        if (that.facing == 1 && that.BB.right - that.velocity.x * that.game.clockTick * PARAMS.SCALE <= entity.BB.left) {
                            that.velocity.x = -that.velocity.x;
                            that.facing = (that.facing == 1 ? 0 : 1);
                            that.turnTimer = that.game.timer.gameTime;
                            that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                        } else if (that.facing == 0 && that.BB.left - that.velocity.x * that.game.clockTick * PARAMS.SCALE >= entity.BB.right) {
                            that.velocity.x = -that.velocity.x;
                            that.facing = (that.facing == 1 ? 0 : 1);
                            that.turnTimer = that.game.timer.gameTime;
                            that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                        }
                    }
                }
                if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH/2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT/2 - that.y) ** 2) < 350) { 
                    if(entity.x - that.x <0){
                        that.facing = 0
                    } else if(entity.x - that.x >0){
                        that.facing=1;
                    }
                }
                if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH/2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT/2 - that.y) ** 2) < 100) { 
                    if(entity.x - that.x <0){
                        that.facing = 0
                    } else if(entity.x - that.x >0){
                        that.facing=1;
                    }
                    that.state = 1;
                    that.action = 1;
                    if(that.facing==0){
                        that.velocity.x = -40
                    } else if(that.facing==1){
                        that.velocity.x = 40
                    }
                } 
                else if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH/2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT/2 - that.y) ** 2) > 50){
                    that.state = 0;
                    that.action = 0;
                    if(that.facing==0){
                        that.velocity.x = -24
                    } else if(that.facing==1){
                        that.velocity.x = 24
                    }
                } 
            });
            this.updateBB();
        }
    }

    updateBB() {
        if (this.facing == 0) {
            if(this.action ==1){
                this.BB = new BoundingBox(this.x, this.y, this.SPRITE_WIDTH_WALK * 2.25 - this.SPEAR_LENGTH, this.SPRITE_HEIGHT * 2.25)
            } else{
                this.BB = new BoundingBox(this.x + this.SPEAR_LENGTH, this.y, this.SPRITE_WIDTH_WALK * 2.25 - this.SPEAR_LENGTH, this.SPRITE_HEIGHT * 2.25)
            }
        } else if (this.facing ==1){
            if(this.action ==1){
                this.BB = new BoundingBox(this.x + this.SPEAR_LENGTH*3, this.y, this.SPRITE_WIDTH_WALK * 2.25 - this.SPEAR_LENGTH, this.SPRITE_HEIGHT * 2.25)
            } else{
                this.BB = new BoundingBox(this.x, this.y, this.SPRITE_WIDTH_WALK * 2.25 - this.SPEAR_LENGTH, this.SPRITE_HEIGHT * 2.25)
            }
        }
    
    }

    draw(ctx) {
        if (this.dead) {
            if (this.flickerFlag) {
                this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 2.25);
            }
            this.flickerFlag = !this.flickerFlag;
        } else {
            this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 2.25);
            if (PARAMS.DEBUG) {
                //ctx.strokeRect(this.BB.x- this.game.camera.x, this.BB.y- this.game.camera.y, this.BB.width, this.BB.height);
                // ctx.fillStyle = "Red";
                // ctx.strokeRect(this.BB.x- this.game.camera.x, this.BB.y- this.game.camera.y, this.BB.width, this.BB.height);
                // ctx.fillStyle = "Lightgreen";
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y- this.game.camera.y, this.BB.width, this.BB.height);
                if (this.state == 0) {
                    ctx.fillStyle = "Lightgreen";
                } else {
                    ctx.fillStyle = "Red";
                }
                ctx.fillText(" • ", this.BB.x - this.game.camera.x, this.BB.y- this.game.camera.y);
            }
        }
        //this.shield.draw(ctx);
        //this.animations[0][0].drawFrame(this.game.clockTick, ctx, 16, 16, 2);
        //this.animations[0][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 5, 2);
        //this.animations[1][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16, 2);
        //this.animations[1][1].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 5, 2);
        this.shield.draw(ctx);
    }
}

class ArmorKnightShield {
    constructor(game, armorKnight) {
        Object.assign(this, { game, armorKnight });
        this.WIDTH = 5;
        this.HEIGHT = 45;
        if (this.armorKnight.facing == 0) {
            this.x = this.armorKnight.x - this.armorKnight.SPRITE_WIDTH_WALK+ 15 + this.WIDTH;
        } else {
            this.x = this.armorKnight.x + this.armorKnight.SPRITE_WIDTH_WALK - 15- this.WIDTH;
        }
        this.y = this.armorKnight.y + 20;
        if (this.armorKnight.action == 0) {
            this.shieldUp = true;
        } else if (this.armorKnight.action == 1) {
            this.shieldUp = false;
        } 
        this.updateBB();
    }

    update() {
        if (this.armorKnight.facing == 0) {
            this.x = this.armorKnight.x + 15;
        } else {
            this.x = this.armorKnight.x + this.armorKnight.SPRITE_WIDTH_WALK * 2.25 - 15 - this.WIDTH;
        }
        this.y = this.armorKnight.y + 20;
        if (this.armorKnight.action == 0) {
            this.shieldUp = true;
        } else if (this.armorKnight.action == 1) {
            this.shieldUp = false;
        }
        this.updateBB();
    }

    updateBB() {
        if (this.shieldUp) {
            this.BB = new BoundingBox(this.x, this.y, this.WIDTH, this.HEIGHT);
        } else {
            this.BB = new BoundingBox(0, 0, 0, 0);
        }
    }

    draw(ctx) {
        if (PARAMS.DEBUG) {
            ctx.fillStyle = "Red";
            ctx.fillRect(this.x - this.game.camera.x, this.y - this.game.camera.y, this.WIDTH, this.HEIGHT);
        }
    }
}

class HammerBro {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");
        this.SPRITE_WIDTH = 16;
        this.SPRITE_HEIGHT = 24;
        this.HEALTH_POINTS = 3;
        this.state = 0; //0=idle, 1=aggressive
        this.action = 0; //0=walk, 1=attacking
        this.facing = 0; //0=left, 1=right
        this.velocity = { x: -15, y: 0 };
        this.fireTimer = 0.15;
        this.jumpTimer = 0;
        this.hasJump = false;
        this.hasFired = true;
        
        this.dead = false;
        this.deadTimer = 0;
        this.paused = true;
        this.flickerFlag = false;


        this.animations = [];
        for (var i = 0; i < 2; i++) {
            this.animations.push([]);
        }
        this.animations[0][0] = new Animator(this.spritesheet, 112, 5, 16, 24, 2, 0.09 * 3, 1, false, true); // idle left
        this.animations[0][1] = new Animator(this.spritesheet, 146, 5, 16, 24, 2, 0.09 * 3, 4, false, true); // attack left
        this.animations[1][0] = new Animator(this.spritesheet, 225, 5, 16, 24, 2, 0.09 * 3, 1, true, true); // idle right
        this.animations[1][1] = new Animator(this.spritesheet, 188, 5, 16, 24, 2, 0.09 * 3, 4, false, true); // attack right
        this.updateBB();
    }
    update() {
        if (this.dead) {
            this.deadTimer += this.game.clockTick;
            if (this.deadTimer > 0.5) {
                this.removeFromWorld = true;
            }
        }
        if (this.paused && this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH) {
            this.paused = false;
        }
        if (!this.dead && !this.paused) {
            this.velocity.y += fallAcc * this.game.clockTick * PARAMS.SCALE;

            if (this.state == 0) {     
                if (this.game.timer.gameTime - this.turnTimer >= 2) {
                    if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                        this.turnTimer = this.game.timer.gameTime;
                        this.facing = (this.facing == 1 ? 0 : 1);
                        this.velocity.x = -this.velocity.x;
                    }
                }
            }
            if (this.state == 1) {
                if (this.jumpTimer > 0) {
                    this.jumpTimer -= this.game.clockTick;
                    if (this.hasJump == false) {
                        this.velocity.y = -300;
                        this.hasJump = true;        
                    }
                    
                } else {
                    this.jumpTimer = 2;
                    this.hasJump = false;
                    this.action = 0;
                }
                if (this.fireTimer > 0) {
                    this.fireTimer -= this.game.clockTick;
                    if (this.hasFired == false) {
                        this.game.addEntity(new HammerBroHammer(this.game, this.x, this.y, this.facing));
                        this.hasFired = true;
                        this.action = 0;
                    }
                } else {
                    this.fireTimer = 2;
                    this.hasFired = false;
                    this.action = 1;
                }
            }

            this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
            this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            this.updateBB();

            var that = this;
            this.game.entities.forEach(function (entity) {
                //console.log(entity);
                //console.log(entity.BB);
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if ((entity instanceof Pellet)) {
                        //update lose life
                    }
                    //console.log(entity.BB);
                    if (entity instanceof Tile && that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE <= entity.BB.top) {
                        that.y = entity.BB.top - that.SPRITE_HEIGHT * 2.5;
                        that.velocity.y = 0;
                        that.updateBB();
                    }
                    //added for side hit of tiles 
                    if (entity instanceof Tile && that.BB.collide(entity.topBB) && that.BB.collide(entity.bottomBB)) {
                        if (that.BB.collide(entity.leftBB)) {
                            that.facing = (that.facing == 1 ? 0 : 1);
                            that.velocity.x = -that.velocity.x;
                            that.turnTimer = that.game.timer.gameTime;
                        } else if (that.BB.collide(entity.rightBB)) {
                            that.facing = (that.facing == 1 ? 0 : 1);
                            that.velocity.x = -that.velocity.x;
                            that.turnTimer = that.game.timer.gameTime;
                        }
                        that.updateBB();
                    }

                    else if (entity !== that && !(entity instanceof Pellet) && !(entity instanceof Tile) && !(entity instanceof HammerBroHammer)) { //&& !(entity instanceof Megaman)
                        console.log(entity.constructor.name);
                        //console.log(entity.BB.right);
                        //console.log("collision");
                        that.facing = (that.facing == 1 ? 0 : 1);
                        that.velocity.x = -that.velocity.x;
                        that.turnTimer = that.game.timer.gameTime;
                    }


                }
                if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH / 2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT / 2 - that.y) ** 2) < 300) {
                    that.state = 1;
                    if (entity.x < that.x) {
                        that.facing = 0;
                        that.velocity.x = -20;
                    }
                    if (entity.x > that.x) {
                        that.facing = 1;
                        that.velocity.x = 20; 
                    }
                    
                } 
                // Ceiling hitting collision detection
                if (that.velocity.y < 0) {
                    if((entity instanceof Tile && (that.BB.top - that.velocity.y * that.game.clockTick * PARAMS.SCALE) >= entity.BB.bottom && that.BB.collide(entity.BB))){
                        that.velocity.y = 0;
                        that.y = entity.BB.bottom - 24;
                    }
                }
            });
        }
    }


    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.SPRITE_WIDTH * 2.5, this.SPRITE_HEIGHT * 2.5)
    }

    draw(ctx) {
        if (this.dead) {
            if (this.flickerFlag) {
                this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 2.5);
            }
            this.flickerFlag = !this.flickerFlag;
        } else {
            this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 2.5);
            if (PARAMS.DEBUG) {
                ctx.strokeRect(this.BB.x- this.game.camera.x, this.BB.y- this.game.camera.y, this.BB.width, this.BB.height);
                if (this.state == 0) {
                    ctx.fillStyle = "Lightgreen";
                } else {
                    ctx.fillStyle = "Red";
                }
                ctx.fillText(" • ", this.BB.x- this.game.camera.x, this.BB.y- this.game.camera.y);
            }
        }
    }
}

class Gordo {
    constructor(game, x, y, movementScaleX, movementScaleY) {
        Object.assign(this, { game, x, y, movementScaleX, movementScaleY });
        this.HEALTH_POINTS = 3;
        this.velocity = { x: 15, y: 15 };
        this.SPRITE_WIDTH = 16;
        this.SPRITE_HEIGHT = 16;

        

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");

        this.animation = new Animator(this.spritesheet, 146, 255, 16, 16, 2, 0.09 * 3, 4, true, true);
        this.updateBB();

    }
    update() {
        //console.log(this.BB);


        this.x += this.velocity.x * this.movementScaleX * this.game.clockTick * PARAMS.SCALE;
        this.y += this.velocity.y * this.movementScaleY * this.game.clockTick * PARAMS.SCALE;
        this.updateBB();

        var that = this;
        this.game.entities.forEach(function (entity) {
            //console.log(entity);
            //console.log(entity.BB);
            if (entity.BB && that.BB.collide(entity.BB)) {
                if ((entity instanceof Pellet)) {
                    //update lose life
                }
                if (!(entity instanceof Pellet)) { //&& !(entity instanceof Megaman)
                    //console.log("collided with " + entity.constructor.name);
                    if (that.BB.right - that.velocity.x * that.movementScaleX * that.game.clockTick * PARAMS.SCALE <= entity.BB.left) {
                        that.velocity.x = -that.velocity.x;
                        that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                    } else if (that.BB.left - that.velocity.x * that.movementScaleX * that.game.clockTick * PARAMS.SCALE >= entity.BB.right) {
                        that.velocity.x = -that.velocity.x;
                        that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                    }

                    if (that.BB.bottom - that.velocity.y * that.movementScaleY * that.game.clockTick * PARAMS.SCALE <= entity.BB.top) {
                        that.velocity.y = -that.velocity.y;
                        that.y += that.velocity.y * that.game.clockTick * PARAMS.SCALE;
                    } else if (that.BB.top - that.velocity.y * that.movementScaleY * that.game.clockTick * PARAMS.SCALE >= entity.BB.bottom) {
                        that.velocity.y = -that.velocity.y;
                        that.y += that.velocity.y * that.game.clockTick * PARAMS.SCALE;
                    }
                }
            }
        });
        this.updateBB();
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.SPRITE_WIDTH * 3, this.SPRITE_HEIGHT * 3)
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 3);
        if (PARAMS.DEBUG) {
            ctx.strokeRect(this.BB.x- this.game.camera.x, this.BB.y- this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
}

class Wheelie {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.SPRITE_HEIGHT = 16;
        this.SPRITE_WIDTH = 16;
        this.HEALTH_POINTS = 3;
        this.HEALTH_POINTS = 2;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");
        console.log(this.spritesheet);


        this.state = 0; //0=idle, 1=aggressive, 2=dead
        this.action = 0; //0=walk, 1=firing
        this.facing = 0; //0=left, 1=right
        this.velocity = { x: -25, y: 0 };
        this.isTurning = false;
        this.turningTimer = 2;
        this.turnTimer = this.game.timer.gameTime;
        
        this.dead = false;
        this.deadTimer = 0;
        this.paused = true;
        this.flickerFlag = false;

        this.animations = [];
        for (var i = 0; i < 2; i++) { //two directions (left right)
            this.animations.push([]);
            this.animations[i].push([]);
            for (var j = 0; j < 3; j++) { //three states (idle, aggressive, dead)
                this.animations[i].push([]);
            }
        }

        this.loadAnimations();
        this.updateBB();


    }
    update() {
        if (this.dead) {
            this.deadTimer += this.game.clockTick;
            if (this.deadTimer > 0.5) this.removeFromWorld = true;  // flicker for half a second
        }
        if (this.paused && this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH) {
            this.paused = false;
        }
        if (!this.dead && !this.paused) {
            this.velocity.y += fallAcc * this.game.clockTick * PARAMS.SCALE;

            if (this.state == 0) {
                if (this.action == 0) {
                    if (this.game.timer.gameTime - this.turnTimer >= 2) {
                        if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                            this.turnTimer = this.game.timer.gameTime;
                            this.facing = (this.facing == 1 ? 0 : 1);
                            this.velocity.x = -this.velocity.x;
                        }
                    }
                }
            }


            this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
            this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            this.updateBB();

            var that = this;
            this.game.entities.forEach(function (entity) {
                //console.log(entity);
                //console.log(entity.BB);
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if ((entity instanceof Pellet)) {
                        //update lose life
                    }
                    //console.log(entity.BB);
                    if (entity instanceof Tile && that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE <= entity.BB.top) {
                        that.y = entity.BB.top - that.SPRITE_HEIGHT * 3;
                        that.velocity.y = 0;
                        that.updateBB();
                    }
                    //added for side hit of tiles 
                    if (entity instanceof Tile && that.BB.collide(entity.topBB) && that.BB.collide(entity.bottomBB)) {
                        if (that.BB.collide(entity.leftBB)) {
                            that.facing = (that.facing == 1 ? 0 : 1);
                            that.velocity.x = -that.velocity.x;
                            that.turnTimer = that.game.timer.gameTime;
                        } else if (that.BB.collide(entity.rightBB)) {
                            that.facing = (that.facing == 1 ? 0 : 1);
                            that.velocity.x = -that.velocity.x;
                            that.turnTimer = that.game.timer.gameTime;
                        }
                        that.updateBB();
                    }  else if (entity !== that && !(entity instanceof Pellet) && !(entity instanceof Tile) && !(entity instanceof HammerBroHammer)) { //&& !(entity instanceof Megaman)
                        console.log(entity.constructor.name);
                        //console.log(entity.BB.right);
                        //console.log("collision");
                        that.facing = (that.facing == 1 ? 0 : 1);
                        that.velocity.x = -that.velocity.x;
                        that.turnTimer = that.game.timer.gameTime;
                    }

                }
                if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH / 2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT / 2 - that.y) ** 2) < 250 && that.state == 0) {
                    that.state = 1;
                    that.velocity.x *= 5;
                    that.velocity.y *= 5;
                    if (entity.x < that.x) {
                        if (that.facing == 1 && that.velocity.x > 0) {
                            that.facing = 0;
                            that.velocity.x = -that.velocity.x;
                        }
                        
                        // that.facing = 0;
                        // this.velocity.x = -this.velocity.x;
                    } else if (entity.x > that.x) {
                        if (that.facing == 0 && that.velocity.x < 0) {
                            that.facing = 1;
                            that.velocity.x = -that.velocity.x;
                        }
                    }
                } else if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH / 2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT / 2 - that.y) ** 2) > 350 && that.state == 1) {
                    that.state = 0;
                    that.velocity.x /= 5;
                    that.velocity.y /= 5;    
                }
            });
        }
        
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.SPRITE_WIDTH * 3, this.SPRITE_HEIGHT * 3)
    }

    draw(ctx) {
        if (this.dead) {
            if (this.flickerFlag) {
                this.animations[this.facing][this.state][this.action].drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 3);
            }
            this.flickerFlag = !this.flickerFlag;
        } else {
            this.animations[this.facing][this.state][this.action].drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 3);
            if (PARAMS.DEBUG) {
                    ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y- this.game.camera.y, this.BB.width, this.BB.height);
                    if (this.state == 0) {
                        ctx.fillStyle = "Lightgreen";
                    } else {
                        ctx.fillStyle = "Red";
                    }
                    ctx.fillText(" • ", this.BB.x - this.game.camera.x, this.BB.y- this.game.camera.y);
                }
            }
        
        //this.animations[0][0][0].drawFrame(this.game.clockTick, ctx, 16, 16, 3);
        //this.animations[1][0][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16, 3);

        //this.animations[0][0][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 5, 3);
        //this.animations[1][0][1].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 5, 3);

        //this.animations[0][1][0].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 10, 3);
        //this.animations[1][1][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 10, 3);
        //this.animations[0][1][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 15, 3);
        //this.animations[1][1][1].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 15, 3);

        //this.animations[0][2][0].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 20, 3);
        //this.animations[1][2][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 20, 3);
        //this.animations[0][2][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 25, 3);
        //this.animations[1][2][1].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 25, 3);

    }

    loadAnimations() {
        this.animations[0][0][0] = new Animator(this.spritesheet, 127, 102, 16, 16, 2, 0.09 * 2, 4, true, true);
        this.animations[1][0][0] = new Animator(this.spritesheet, 207, 102, 16, 16, 2, 0.09 * 2, 4, false, true);
        this.animations[0][0][1] = new Animator(this.spritesheet, 167, 102, 16, 16, 1, 0.09 * 2, 4, false, true);
        this.animations[1][0][1] = new Animator(this.spritesheet, 188, 102, 16, 16, 1, 0.09 * 2, 4, false, true);

        this.animations[0][1][0] = new Animator(this.spritesheet, 127, 102, 16, 16, 2, 0.09, 4, true, true);
        this.animations[1][1][0] = new Animator(this.spritesheet, 207, 102, 16, 16, 2, 0.09, 4, false, true);
        this.animations[0][1][1] = new Animator(this.spritesheet, 167, 102, 16, 16, 1, 0.09, 4, false, true);
        this.animations[1][1][1] = new Animator(this.spritesheet, 188, 102, 16, 16, 1, 0.09, 4, false, true);

        this.animations[0][2][0] = new Animator(this.spritesheet, 107, 102, 16, 16, 1, 0.09, 4, false, true);
        this.animations[1][2][0] = new Animator(this.spritesheet, 247, 102, 16, 16, 1, 0.09, 4, false, true);
        this.animations[0][2][1] = new Animator(this.spritesheet, 107, 102, 16, 16, 1, 0.09, 4, false, true);
        this.animations[1][2][1] = new Animator(this.spritesheet, 247, 102, 16, 16, 1, 0.09, 4, false, true);

    }
}