this.TURN_CHANCE_ADJUST = 30;

class Met {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.SPRITE_WIDTH = 20;
        this.SPRITE_HEIGHT = 19

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");

        this.state = 0; //0=idle, 1=aggressive, 2=dead
        this.action = 0; //0=walk, 1=stationary/shooting/dead, 2=hide, 3=hidden, 4=unhide
        this.facing = 0; //0=left, 1=right
        this.velocity = {x: -15, y: 0}
        this.turnTimer = this.game.timer.gameTime;

        this.animations = [];
        for (var i = 0; i < 2; i++) { //two directions
            this.animations.push([]);
        }
        //animations do not depend on state

        this.animations[0][0] = new Animator(this.spritesheet, 138, 36, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 2, 0.09 * 3, 5, true, true); //walk
        this.animations[0][1] = new Animator(this.spritesheet, 116, 36, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 1, 0.09 * 3, 5, false, true) //stationary/dead
        this.animations[0][2] = new Animator(this.spritesheet, 72, 36, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 3, 0.09 * 3, 4, true, true) //hide
        this.animations[0][3] = new Animator(this.spritesheet, 72, 36, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 1, 0.09 * 2, 4, false, true) //hidden
        this.animations[0][4] = new Animator(this.spritesheet, 72, 36, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 3, 0.09 * 3, 4, false, true) //unhide

        this.animations[1][0] = new Animator(this.spritesheet, 188, 36, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 2, 0.09 * 3, 5, false, true); //walk
        this.animations[1][1] = new Animator(this.spritesheet, 236, 36, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 1, 0.09 * 3, 5, false, true) //stationary/dead
        this.animations[1][2] = new Animator(this.spritesheet, 236, 36, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 3, 0.09 * 3, 4, false, true) //hide
        this.animations[1][3] = new Animator(this.spritesheet, 280, 36, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 1, 0.09 * 2, 4, false, true) //hidden
        this.animations[1][4] = new Animator(this.spritesheet, 236, 36, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, 3, 0.09 * 3, 4, true, true) //unhide

        this.updateBB();
    }
    update() {
        // console.log(1/this.game.clockTick);
        
        if (this.state == 0) {
            if (this.action == 0) {
                if (this.game.timer.gameTime - this.turnTimer >= 2) {
                    if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                        this.turnTimer = this.game.timer.gameTime;
                        this.facing = (this.facing == 1 ? 0 : 1);
                        this.velocity.x = -this.velocity.x;
                    } else {
                        //console.log("check failed");
                    }
                }

                this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
                this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            }
        } else if (this.state == 1) {
            // Todo: Aggressive state
            if (this.action == 0) {
                if (this.game.timer.gameTime - this.turnTimer >= 2) {
                    if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                        this.turnTimer = this.game.timer.gameTime;
                        this.facing = (this.facing == 1 ? 0 : 1);
                        this.velocity.x = -this.velocity.x;
                    } else {
                        //console.log("check failed");
                    }
                }

                this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
                this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            }
        }

        this.updateBB();

        var that = this;
        this.game.entities.forEach(function (entity) {
            //console.log(entity);
            //console.log(entity.BB);
            if (entity.BB && that.BB.collide(entity.BB)) {
                //console.log(entity.BB);
                if (entity instanceof Tile && that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE <= entity.BB.top) {
                    that.y = entity.BB.top - SPRITE_HEIGHT;
                    that.velocity.y = 0;
                    that.updateBB();
                } else if (entity !== that &&!(entity instanceof Pellet)) { //&& !(entity instanceof Megaman)
                    if((entity instanceof Pellet)){
                        //update lose life
                    }
                    //console.log(that.x);
                    //console.log(entity.BB.right);
                    //console.log("collision");

                    if (that.facing == 1 && that.BB.right - that.velocity.x * that.game.clockTick * PARAMS.SCALE <= entity.BB.left) {
                        that.velocity.x = -that.velocity.x;
                        that.facing = (that.facing == 1 ? 0 : 1);
                    } else if (that.facing == 0 && that.BB.left - that.velocity.x * that.game.clockTick * PARAMS.SCALE >= entity.BB.right) {
                        that.velocity.x = -that.velocity.x;
                        that.facing = (that.facing == 1 ? 0 : 1);
                    }
                    that.turnTimer = that.game.timer.gameTime;
                    that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                }
            }
            if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH/2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT/2 - that.y) ** 2) < 250) {
                that.state = 1;
            }
        });
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.SPRITE_WIDTH * 2, this.SPRITE_HEIGHT * 2)
    }

    draw(ctx) {
        this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        if (PARAMS.DEBUG) {
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            ctx.font = "25px Arial";
            
            if (this.state == 0) {
                ctx.fillStyle = "Lightgreen";
            } else {
                ctx.fillStyle = "Red";
            }
            ctx.fillText(" • ", this.BB.x, this.BB.y);
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

class Carock {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.state = 0; //0=idle, 1=aggressive, 2=dead
        this.action = 0; //0=walk, 1=firing
        this.facing = 0; //0=left, 1=right
        this.velocity = { x: -40, y: 0 }
        this.turnTimer = this.game.timer.gameTime;
        this.SPRITE_WIDTH_WALK = 20;
        this.SPRITE_WIDTH_FIRE = 32;
        this.SPRITE_HEIGHT = 47;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");

        this.animations = [];
        for (var i = 0; i < 2; i++) { //two directions
            this.animations.push([]);
        }
        this.animations[0][0] = new Animator(this.spritesheet, 138, 197, this.SPRITE_WIDTH_WALK, this.SPRITE_HEIGHT, 2, 0.09 * 3, 4, true, true); //walk left
        this.animations[1][0] = new Animator(this.spritesheet, 188, 197, this.SPRITE_WIDTH_WALK, this.SPRITE_HEIGHT, 2, 0.09 * 3, 4, false, true) //walk right

        this.animations[0][1] = new Animator(this.spritesheet, 102, 197, this.SPRITE_WIDTH_FIRE, this.SPRITE_HEIGHT, 1, 0.09 * 3, 4, false, true);//fire left
        this.animations[1][1] = new Animator(this.spritesheet, 236, 197, this.SPRITE_WIDTH_FIRE, this.SPRITE_HEIGHT, 1, 0.09 * 3, 4, false, true);//fire right

        this.updateBB();
    }
    update() {
        

        if (this.state == 0) {
            if (this.action == 0) {
                if (this.game.timer.gameTime - this.turnTimer >= 2) {
                    if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                        this.turnTimer = this.game.timer.gameTime;
                        this.facing = (this.facing == 1 ? 0 : 1);
                        this.velocity.x = -this.velocity.x;
                    }
                }

                this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
                this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            }
        } else if (this.state == 1) {
            // Todo: Aggressive state
            if (this.action == 0) {
                if (this.game.timer.gameTime - this.turnTimer >= 2) {
                    if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                        this.turnTimer = this.game.timer.gameTime;
                        this.facing = (this.facing == 1 ? 0 : 1);
                        this.velocity.x = -this.velocity.x;
                    }
                }

                this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
                this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            }
        }
        this.updateBB();

        var that = this;
        this.game.entities.forEach(function (entity) {
            //console.log(entity);
            //console.log(entity.BB);
            if (entity.BB && that.BB.collide(entity.BB)) {
                //console.log(entity.BB);
                if (entity instanceof Tile && that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE <= entity.BB.top) {
                    that.y = entity.BB.top - SPRITE_HEIGHT;
                    that.velocity.y = 0;
                    that.updateBB();
                } else if (entity !== that &&!(entity instanceof Pellet)) { //&& !(entity instanceof Megaman)
                    if((entity instanceof Pellet)){
                        //update lose life
                    }
                    //console.log(that.x);
                    //console.log(entity.BB.right);
                    //console.log("collision");

                    if (that.facing == 1 && that.BB.right - that.velocity.x * that.game.clockTick * PARAMS.SCALE <= entity.BB.left) {
                        that.velocity.x = -that.velocity.x;
                        that.facing = (that.facing == 1 ? 0 : 1);
                    } else if (that.facing == 0 && that.BB.left - that.velocity.x * that.game.clockTick * PARAMS.SCALE >= entity.BB.right) {
                        that.velocity.x = -that.velocity.x;
                        that.facing = (that.facing == 1 ? 0 : 1);
                    }
                    that.turnTimer = that.game.timer.gameTime;
                    that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                }
            }
            if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH/2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT/2 - that.y) ** 2) < 250) {
                that.state = 1;
            }
        });
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.SPRITE_WIDTH_WALK * 2, this.SPRITE_HEIGHT * 2)
    }

    draw(ctx) {
        this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        //this.animations[0][0].drawFrame(this.game.clockTick, ctx, 16, 16, 2);
        //this.animations[1][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16, 2);

        //this.animations[0][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 10, 2);
        //this.animations[1][1].drawFrame(this.game.clockTick, ctx, 16+16*5, 16 + 16 * 10, 2);
        if (PARAMS.DEBUG) {
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            if (this.state == 0) {
                ctx.fillStyle = "Lightgreen";
            } else {
                ctx.fillStyle = "Red";
            }
            ctx.fillText(" • ", this.BB.x, this.BB.y);
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
        if (this.state == 0) {
            if (this.action == 0) {
                if (this.game.timer.gameTime - this.turnTimer >= 2) {
                    if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                        this.turnTimer = this.game.timer.gameTime;
                        this.facing = (this.facing == 1 ? 0 : 1);
                        this.velocity.x = -this.velocity.x;
                    }
                }

                this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
                this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            }
        } else if (this.state == 1) {
            // Todo: Aggressive state
            if (this.action == 0) {
                if (this.game.timer.gameTime - this.turnTimer >= 2) {
                    if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                        this.turnTimer = this.game.timer.gameTime;
                        this.facing = (this.facing == 1 ? 0 : 1);
                        this.velocity.x = -this.velocity.x;
                    }
                }

                this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
                this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            }
        }

        this.updateBB();

        var that = this;
        this.game.entities.forEach(function (entity) {
            //console.log(entity);
            //console.log(entity.BB);
            if (entity.BB && that.BB.collide(entity.BB)) {
                //console.log(entity.BB);
                if (entity instanceof Tile && that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE <= entity.BB.top) {
                    that.y = entity.BB.top - SPRITE_HEIGHT;
                    that.velocity.y = 0;
                    that.updateBB();
                } else if (entity !== that &&!(entity instanceof Pellet)) { //&& !(entity instanceof Megaman)
                    if((entity instanceof Pellet)){
                        //update lose life
                    }
                    //console.log(that.x);
                    //console.log(entity.BB.right);
                    //console.log("collision");

                    if (that.facing == 1 && that.BB.right - that.velocity.x * that.game.clockTick * PARAMS.SCALE <= entity.BB.left) {
                        that.velocity.x = -that.velocity.x;
                        that.facing = (that.facing == 1 ? 0 : 1);
                    } else if (that.facing == 0 && that.BB.left - that.velocity.x * that.game.clockTick * PARAMS.SCALE >= entity.BB.right) {
                        that.velocity.x = -that.velocity.x;
                        that.facing = (that.facing == 1 ? 0 : 1);
                    }
                    that.turnTimer = that.game.timer.gameTime;
                    that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                }
            }

            if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH/2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT/2 - that.y) ** 2) < 250) {
                that.state = 1;
            }
        });

    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.SPRITE_WIDTH * 2, this.SPRITE_HEIGHT * 2)
    }

    draw(ctx) {
        this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);

        //console.log(this.animations[0][0][0]);
        //this.animations[0][0].drawFrame(this.game.clockTick, ctx, 16, 16, 2);
        //this.animations[0][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 10, 2);
        //this.animations[0][2].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 20, 2);
        //this.animations[1][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 7, 16, 2);
        //this.animations[1][1].drawFrame(this.game.clockTick, ctx, 16 + 16 * 7, 16 + 16 * 10, 2);
        //this.animations[1][2].drawFrame(this.game.clockTick, ctx, 16 + 16 * 7, 16 + 16 * 20, 2);

        if (PARAMS.DEBUG) {
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            if (this.state == 0) {
                ctx.fillStyle = "Lightgreen";
            } else {
                ctx.fillStyle = "Red";
            }
            ctx.fillText(" • ", this.BB.x, this.BB.y);
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

        this.SPRITE_WIDTH_WALK = 24;
        this.SPRITE_WIDTH_ATTACK = 39;
        this.SPRITE_HEIGHT = 32;

        this.animations = [];
        for (var i = 0; i < 2; i++) { //two directions
            this.animations.push([]);
        }

        this.animations[0][0] = new Animator(this.spritesheet, 65, 65, this.SPRITE_WIDTH_WALK, this.SPRITE_HEIGHT, 3, 0.09 * 3, 2, true, true); // walk
        this.animations[0][1] = new Animator(this.spritesheet, 143, 65, this.SPRITE_WIDTH_ATTACK, this.SPRITE_HEIGHT, 1, 0.09 * 3, 0, false, true); //spear attack
        this.animations[1][0] = new Animator(this.spritesheet, 229, 65, this.SPRITE_WIDTH_WALK, this.SPRITE_HEIGHT, 3, 0.09 * 3, 2, false, true); // walk
        this.animations[1][1] = new Animator(this.spritesheet, 188, 65, this.SPRITE_WIDTH_ATTACK, this.SPRITE_HEIGHT, 1, 0.09 * 3, 0, false, true); //spear attack
        this.updateBB();
    }
    update() {
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

                this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
                this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
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

                this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
                this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            }
        }

        this.updateBB();

        var that = this;
        this.game.entities.forEach(function (entity) {
            //console.log(entity);
            //console.log(entity.BB);
            if (entity.BB && that.BB.collide(entity.BB)) {
                //console.log(entity.BB);
                if (entity instanceof Tile && that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE <= entity.BB.top) {
                    that.y = entity.BB.top - SPRITE_HEIGHT;
                    that.velocity.y = 0;
                    that.updateBB();
                }                 
                else if (entity !== that&&!(entity instanceof Pellet)) { // && !(entity instanceof Megaman)
                    if((entity instanceof Pellet)){
                        //update lose life
                    }
                    console.log(that.x);
                    console.log(entity.BB.right);
                    //console.log("collision");

                    if (that.facing == 1 && that.BB.right - that.velocity.x * that.game.clockTick * PARAMS.SCALE <= entity.BB.left) {
                        that.velocity.x = -that.velocity.x;
                        that.facing = (that.facing == 1 ? 0 : 1);
                    } else if (that.facing == 0 && that.BB.left - that.velocity.x * that.game.clockTick * PARAMS.SCALE >= entity.BB.right) {
                        that.velocity.x = -that.velocity.x;
                        that.facing = (that.facing == 1 ? 0 : 1);
                    }
                    that.turnTimer = that.game.timer.gameTime;
                    that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                }
            }
            if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH/2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT/2 - that.y) ** 2) < 250) {
                that.state = 1;
            }
        });
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.SPRITE_WIDTH_WALK * 2.25, this.SPRITE_HEIGHT * 2.25)
    }

    draw(ctx) {
        this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2.25);
        if (PARAMS.DEBUG) {
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            if (this.state == 0) {
                ctx.fillStyle = "Lightgreen";
            } else {
                ctx.fillStyle = "Red";
            }
            ctx.fillText(" • ", this.BB.x, this.BB.y);
        }
        //this.animations[0][0].drawFrame(this.game.clockTick, ctx, 16, 16, 2);
        //this.animations[0][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 5, 2);
        //this.animations[1][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16, 2);
        //this.animations[1][1].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 5, 2);
    }
}

class HammerBro {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");
        this.SPRITE_WIDTH = 16;
        this.SPRITE_HEIGHT = 24;

        this.state = 0; //0=idle, 1=aggressive
        this.action = 0; //0=walk, 1=attacking
        this.facing = 0; //0=left, 1=right
        this.velocity = { x: -25, y: 0 };

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
        if (this.state == 0) {
            if (this.action == 0) {
                if (this.game.timer.gameTime - this.turnTimer >= 2) {
                    if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                        this.turnTimer = this.game.timer.gameTime;
                        this.facing = (this.facing == 1 ? 0 : 1);
                        this.velocity.x = -this.velocity.x;
                    }
                }

                this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
                this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            }
        } else if (this.state == 1) {
            // Todo: Aggressive state
            if (this.action == 0) {
                if (this.game.timer.gameTime - this.turnTimer >= 2) {
                    if (Math.random() >= 0.5 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                        this.turnTimer = this.game.timer.gameTime;
                        this.facing = (this.facing == 1 ? 0 : 1);
                        this.velocity.x = -this.velocity.x;
                    }
                }

                this.x += 3 * this.velocity.x * this.game.clockTick * PARAMS.SCALE;
                this.y += 3 * this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            }
        }
        this.updateBB();

        var that = this;
        this.game.entities.forEach(function (entity) {
            //console.log(entity);
            //console.log(entity.BB);
            if (entity.BB && that.BB.collide(entity.BB)) {
                //console.log(entity.BB);
                if (entity instanceof Tile && that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE <= entity.BB.top) {
                    that.y = entity.BB.top - SPRITE_HEIGHT;
                    that.velocity.y = 0;
                    that.updateBB();
                } 
                if (entity instanceof Tile && that.BB.collide(entity.BB)){
                    if (that.BB.collide(entity.leftBB)) {
                        that.facing = (that.facing == 1 ? 0 : 1);
                        that.velocity.x = -that.velocity.x;
                        that.turnTimer = that.game.timer.gameTime;
                        that.turnTimer = that.game.timer.gameTime;
                        that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                    } else if (that.BB.collide(entity.rightBB)) {
                        that.facing = (that.facing == 1 ? 0 : 1);
                        that.velocity.x = -that.velocity.x;
                        that.turnTimer = that.game.timer.gameTime;
                        that.turnTimer = that.game.timer.gameTime;
                        that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                    }
                    that.updateBB();
                }
                else if (entity !== that && !(entity instanceof Pellet)) {//!(entity instanceof Megaman)
                    if((entity instanceof Pellet)){
                        //update lose life
                    }
                    console.log(that.x);
                    console.log(entity.BB.right);
                    //console.log("collision");
                    that.facing = (that.facing == 1 ? 0 : 1);
                    that.velocity.x = -that.velocity.x;
                    that.turnTimer = that.game.timer.gameTime;
                    that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                } 
            }
            if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH/2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT/2 - that.y) ** 2) < 250) {
                that.state = 1;
            }
        });
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.SPRITE_WIDTH * 2.5, this.SPRITE_HEIGHT * 2.5)
    }

    draw(ctx) {
        this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2.5);
        if (PARAMS.DEBUG) {
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            if (this.state == 0) {
                ctx.fillStyle = "Lightgreen";
            } else {
                ctx.fillStyle = "Red";
            }
            ctx.fillText(" • ", this.BB.x, this.BB.y);
        }
    }
}

class Gordo {
    constructor(game, x, y, movementScaleX, movementScaleY) {
        Object.assign(this, { game, x, y, movementScaleX, movementScaleY });

        this.velocity = { x: 15, y: 15 };
        this.SPRITE_WIDTH = 16;
        this.SPRITE_HEIGHT = 16;

        

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");

        this.animation = new Animator(this.spritesheet, 146, 255, 16, 16, 2, 0.09 * 3, 4, true, true);
        this.updateBB();

    }
    update() {
        this.x += this.velocity.x * this.movementScaleX * this.game.clockTick * PARAMS.SCALE;
        this.y += this.velocity.y * this.movementScaleY * this.game.clockTick * PARAMS.SCALE;

        this.updateBB();
        //console.log(this.BB);

        var that = this;
        this.game.entities.forEach(function (entity) {
            //console.log(entity);
            //console.log(entity.BB);
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (!(entity instanceof Gordo) &&!(entity instanceof Pellet)) { //&& !(entity instanceof Megaman)
                    if((entity instanceof Pellet)){
                        //update lose life
                    }
                    //console.log("collided with " + entity.constructor.name);
                    if (that.BB.right - that.velocity.x * that.movementScaleX * that.game.clockTick * PARAMS.SCALE <= entity.BB.left) {
                        that.velocity.x = -that.velocity.x;
                        that.x += that.velocity.x * that.game.clockTick * that.movementScaleX * PARAMS.SCALE;
                    } else if (that.BB.left - that.velocity.x * that.movementScaleX * that.game.clockTick * PARAMS.SCALE >= entity.BB.right) {
                        that.x += (entity.BB.right - that.BB.left) * 2;
                        that.velocity.x = -that.velocity.x;
                        that.x += that.velocity.x * that.game.clockTick * that.movementScaleX * PARAMS.SCALE;
                    }

                    if (that.BB.bottom - that.velocity.y * that.movementScaleY * that.game.clockTick * PARAMS.SCALE <= entity.BB.top) {
                        that.velocity.y = -that.velocity.y;
                        that.y += (that.velocity.y * that.game.clockTick * that.movementScaleY * PARAMS.SCALE);
                    } else if (that.BB.top - that.velocity.y * that.movementScaleY * that.game.clockTick * PARAMS.SCALE >= entity.BB.bottom) {
                        that.velocity.y = -that.velocity.y;
                        that.y += (that.velocity.y * that.game.clockTick * that.movementScaleY * PARAMS.SCALE);
                    }
                }
            }
        });
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.SPRITE_WIDTH * 3, this.SPRITE_HEIGHT * 3)
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
        if (PARAMS.DEBUG) {
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class Wheelie {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.SPRITE_HEIGHT = 16;
        this.SPRITE_WIDTH = 16;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");

        this.state = 0; //0=idle, 1=aggressive, 2=dead
        this.action = 0; //0=walk, 1=firing
        this.facing = 0; //0=left, 1=right
        this.velocity = { x: -25, y: 0 };
        this.turnTimer = this.game.timer.gameTime;

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
        this.lastX = this.x;
        if (this.state == 0) {
            if (this.action == 0) {
                if (this.game.timer.gameTime - this.turnTimer >= 2) {
                    if (Math.random() >= 0.98 ** (1 / ((1 / this.game.clockTick) / TURN_CHANCE_ADJUST))) { //2% chance to turn around each 1/30 sec after two seconds of walking (adjust to framerate using clockTick)
                        this.turnTimer = this.game.timer.gameTime;
                        this.facing = (this.facing == 1 ? 0 : 1);
                        this.velocity.x = -this.velocity.x;
                    }
                }

                this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
                this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
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

                this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
                this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            }
        }

        this.updateBB();

        var that = this;
        this.game.entities.forEach(function (entity) {
            //console.log(entity);
            //console.log(entity.BB);
            if (entity.BB && that.BB.collide(entity.BB)) {
                //console.log(entity.BB);
                if (entity instanceof Tile && that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE <= entity.BB.top) {
                    that.y = entity.BB.top - SPRITE_HEIGHT;
                    that.velocity.y = 0;
                    that.updateBB();
                }
                //added for side hit of tiles 
                if (entity instanceof Tile && that.BB.collide(entity.BB)){
                    if (that.BB.collide(entity.leftBB)) {
                        that.facing = (that.facing == 1 ? 0 : 1);
                        that.velocity.x = -that.velocity.x;
                        that.turnTimer = that.game.timer.gameTime;
                        that.turnTimer = that.game.timer.gameTime;
                        that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                    } else if (that.BB.collide(entity.rightBB)) {
                        that.facing = (that.facing == 1 ? 0 : 1);
                        that.velocity.x = -that.velocity.x;
                        that.turnTimer = that.game.timer.gameTime;
                        that.turnTimer = that.game.timer.gameTime;
                        that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                    }
                    that.updateBB();
                }

                else if (entity !== that &&!(entity instanceof Pellet)) { //&& !(entity instanceof Megaman)
                    if((entity instanceof Pellet)){
                        //update lose life
                    }
                    console.log(entity.constructor.name);
                    //console.log(entity.BB.right);
                    //console.log("collision");
                    that.facing = (that.facing == 1 ? 0 : 1);
                    that.velocity.x = -that.velocity.x;
                    that.turnTimer = that.game.timer.gameTime;
                    that.turnTimer = that.game.timer.gameTime;
                    that.x += that.velocity.x * that.game.clockTick * PARAMS.SCALE;
                }
                
            }
            if (entity instanceof Megaman && Math.sqrt((entity.x + entity.MEGAMAN_WIDTH/2 - that.x) ** 2 + (entity.y + entity.MEGAMAN_HEIGHT/2 - that.y) ** 2) < 250 && that.state == 0) {
                that.state = 1;
                that.velocity.x *= 5;
                that.velocity.y *= 5;
            }
        });
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.SPRITE_WIDTH * 3, this.SPRITE_HEIGHT * 3)
    }

    draw(ctx) {
        this.animations[this.facing][this.state][this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
        if (PARAMS.DEBUG) {
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            if (this.state == 0) {
                ctx.fillStyle = "Lightgreen";
            } else {
                ctx.fillStyle = "Red";
            }
            ctx.fillText(" • ", this.BB.x, this.BB.y);
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