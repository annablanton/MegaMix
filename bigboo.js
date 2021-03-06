class BigBoo {
    constructor(game, x, y, megaman) {
        Object.assign(this, { game, x, y, megaman });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bigboo.png");
        this.facing = 0;
        this.action = 0;
        this.HEALTH_POINTS = 30;
        this.turnTimer = this.game.timer.gameTime;
        this.actionTimer = this.game.timer.gameTime;
        this.teleporting = true;
        this.dead = false;
        this.reappearing = false;
        this.paused = true;
        this.deadTimer = 0;
        this.HEALTH_POINTS = 30;
        this.teleportTimer = 2;
        this.flickerFlag = false;
        this.velocity = { x: 0, y: 0 };

        this.animations = [];
        for (var i = 0; i < 2; i++) { //left/right
            this.animations.push([]);
        }

        this.animations[0].push(new Animator(this.spritesheet, 13, 11, 64, 64, 1, 1, 0, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 91, 11, 64, 64, 1, 1, 0, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 252, 11, 64, 64, 1, 1, 0, true, true));
        this.animations[1].push(new Animator(this.spritesheet, 171, 11, 64, 64, 1, 1, 0, true, true));
        this.updateBB();
    }
    update() {
        //if (this.game.timer.gameTime - this.actionTimer >= 2.5) {
        //    this.action = (this.facing == 0 ? 1 : 0);
        //    this.actionTimer = this.game.timer.gameTime;
        //}
        //if (this.game.timer.gameTime - this.turnTimer >= 5) {
        //    this.facing = (this.facing == 0 ? 1 : 0);
        //    this.turnTimer = this.game.timer.gameTime;
        //}
        if (this.dead) {
            this.deadTimer += this.game.clockTick;
            if (this.deadTimer > 1) {
                this.removeFromWorld = true;
            }
        }
        if (this.paused && this.game.camera.x > this.x - PARAMS.CANVAS_WIDTH) {
            this.paused = false;
        }
        if (!this.dead && !this.paused) {
            if (this.teleporting) {
                this.teleportTimer -= this.game.clockTick;
                if (this.teleportTimer <= 0) {
                    this.teleportTimer = 0;
                    this.teleporting = false;
                    var xOffset = 300;
                    var yOffset = -200;
                    if (this.arena) {
                        if (this.megaman.y + yOffset < this.arena.y) yOffset = this.arena.y - this.megaman.y;
                        var possibleTeleports = [{ x: this.megaman.x - xOffset, y: this.megaman.y + yOffset }, { x: this.megaman.x + xOffset, y: this.megaman.y + yOffset }];
                        console.log(possibleTeleports);
                        if (possibleTeleports[0].x < this.arena.x && !(possibleTeleports[0].x + 128 > this.arena.x + this.arena.width)) possibleTeleports.splice(0, 1);
                        else if (possibleTeleports[1].x + 128 > this.arena.x + this.arena.width) possibleTeleports.splice(1, 1);
                        else if (possibleTeleports[0].x < this.arena.x && possibleTeleports[1].x + 128 > this.arena.x + this.arena.width) possibleTeleports = [{ x: Math.random() * (this.arena.width) + this.arena.x, y: this.megaman.y + yOffset }];
                        else {
                            if (this.x < this.megaman.x) possibleTeleports.splice(0, 1);
                            else possibleTeleports.splice(1, 1);
                        }
                        var nextLocation = possibleTeleports[randomInt(possibleTeleports.length)];
                        this.x = nextLocation.x;
                        this.y = nextLocation.y;
                        this.reappearTimer = 1;
                        this.reappearing = true;
                    }

                }
            } else if (this.reappearing) {
                this.reappearTimer -= this.game.clockTick;
                if (this.reappearTimer <= 0) {
                    this.reappearTimer = 0;
                    this.reappearing = false;
                    this.action = 1;
                    this.attackTimer = 0.5;
                }
            } else if (this.action == 1) {
                if (this.attackTimer > 0) {
                    this.attackTimer -= this.game.clockTick;
                    if (this.attackTimer <= 0) {
                        this.attackTimer = 0;
                        this.parabolaOrigin = new Point(this.megaman.x + this.megaman.FIRE_OFFSET_X - 64, this.megaman.y + this.megaman.FIRE_OFFSET_Y - 64);
                        this.initPos = new Point(this.x, this.y);
                        this.hideTimer = 2;
                        var t = 1 - this.hideTimer;
                        this.velocity.x = (this.megaman.x - this.x) / 1;
                        this.velocity.y = -1 * t * (this.parabolaOrigin.y - this.y) / 1;
                        this.x += this.velocity.x * this.game.clockTick;
                        this.y += this.velocity.y * this.game.clockTick;
                        this.facing = this.x < this.parabolaOrigin.x ? 1 : 0;
                    }
                } else {
                    this.hideTimer -= this.game.clockTick;
                    if (this.hideTimer <= 0) this.hideTimer = 0;
                    var t = 1 - this.hideTimer;
                    this.velocity.y = -2 * t * (this.parabolaOrigin.y - this.initPos.y) / 1;
                    this.x += this.velocity.x * this.game.clockTick;
                    this.y += this.velocity.y * this.game.clockTick;
                    if (!this.hideTimer) {
                        this.teleporting = true;
                        this.action = 0;
                        this.teleportTimer = 2;
                    }
                }
            }
        }
        this.updateBB();


    }

    updateBB() {
        if (!this.teleporting) this.BB = new BoundingBox(this.x, this.y, 128, 128);
        else this.BB = new BoundingBox(-1000, 2000, 0, 0);
    }

    draw(ctx) {
        if (this.dead) {
            if (this.flickerFlag) {
                this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);
            }
            this.flickerFlag = !this.flickerFlag;
        } else {
            ctx.save();
            if (this.teleporting) {
                ctx.globalAlpha = Math.max(0, (this.teleportTimer - 1) / 2);
            } else if (this.reappearing) {
                ctx.globalAlpha = 1 - this.reappearTimer;
            }
            this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);
            ctx.restore();
        }
        if (PARAMS.DEBUG) {
            if (this.parabolaOrigin) ctx.fillRect(this.parabolaOrigin.x - this.game.camera.x - 2, this.parabolaOrigin.y - this.game.camera.y - 2, 4, 4);
        }
    }
}