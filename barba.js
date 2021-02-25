class Barba {
    constructor(game, megaman, xLocations, yLocations) {
        this.HEALTH_POINTS = 30;
        Object.assign(this, { game, megaman, xLocations, yLocations });
        this.centerX = xLocations[randomInt(xLocations.length)];
        this.y = yLocations[randomInt(yLocations.length)];
        this.targetY = this.y;
        if (this.megaman.x < this.centerX) this.facing = 0;
        else this.facing = 1;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/barba.png");
        this.animations = [];
        this.action = 0; // 0 = moving 1 = opening mouth 2 = attacking 3 = closing mouth
        for (var i = 0; i < 2; i++) { //two directions
            this.animations.push([]);
        }
        this.turnTimer = this.game.timer.gameTime;
        this.animations[0].push(new Animator(this.spritesheet, 110, 50, 48, 17, 1, 0.5, 1, true, true));
        this.animations[0].push(new Animator(this.spritesheet, 12, 50, 48, 17, 3, 0.2, 1, true, false));
        this.animations[0].push(new Animator(this.spritesheet, 12, 50, 48, 17, 1, 0.5, 1, true, true))
        this.animations[0].push(new Animator(this.spritesheet, 12, 50, 48, 17, 3, 0.2, 1, false, false));
        this.animations[1].push(new Animator(this.spritesheet, 249, 50, 48, 17, 1, 0.5, 1, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 249, 50, 48, 17, 3, 0.2, 1, false, false));
        this.animations[1].push(new Animator(this.spritesheet, 347, 50, 48, 17, 1, 0.5, 1, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 249, 50, 48, 17, 3, 0.2, 1, true, false));
        this.child = new BarbaBody(this.game, this, 12, 12, this.megaman);
        this.changingLocations = false;
        this.locationTimer = 1;
        this.riseTimer = 0;
        this.deadTimer = 0;
        this.closeMouthTimer = 0;
        this.rising = false;
        this.attacking = false;
        this.flickerFlag = false;
        this.HEALTH_POINTS = 30;
        this.dead = false;
        this.updateBB();
    }
    update() {
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
            this.x = this.centerX + 10 * Math.sin(2 * this.game.timer.gameTime);
            if (this.action == 1) {
                var mouthOpenFinished;
                if (!this.facing) mouthOpenFinished = this.animations[0][1].isDoneNextFrame(this.game.clockTick);
                else mouthOpenFinished = this.animations[1][1].isDoneNextFrame(this.game.clockTick);
                if (mouthOpenFinished) {
                    this.action = 2;
                    this.closeMouthTimer = 2;
                    this.fireBallTimer = 0;
                    this.animations[0][1] = new Animator(this.spritesheet, 12, 50, 48, 17, 3, 0.2, 1, true, false);
                    this.animations[1][1] = new Animator(this.spritesheet, 249, 50, 48, 17, 3, 0.2, 1, false, false);
                }
            } else if (this.action == 2) {
                this.closeMouthTimer -= this.game.clockTick;
                this.fireBallTimer -= this.game.clockTick;
                if (this.closeMouthTimer <= 0) {
                    this.closeMouthTimer = 0;
                    this.action = 3;
                }
                if (this.fireBallTimer <= 0) {
                    if (!this.facing) {
                        var barbaMegamanVector = new Vector(this.megaman.x + 48 - this.x, this.megaman.y + 46 - (this.y + 18));
                        barbaMegamanVector.normalize();
                        var barbaMegamanAngle = getAngle(barbaMegamanVector);
                        this.game.addEntity(new Fireball(this.game, this.x, this.y + 18, barbaMegamanAngle, this.megaman, -this.fireBallTimer, true, -this.fireBallTimer));
                    }
                    else {
                        var barbaMegamanVector = new Vector(this.megaman.x  + 48 - (this.x + 82), this.megaman.y + 46 - (this.y + 18));
                        barbaMegamanVector.normalize();
                        var barbaMegamanAngle = getAngle(barbaMegamanVector);
                        this.game.addEntity(new Fireball(this.game, this.x + 82, this.y + 18, barbaMegamanAngle, this.megaman, -this.fireBallTimer, true, -this.fireBallTimer));
                    }
                    this.fireBallTimer = 0.7;
                }
            } else if (this.action == 3) {
                var mouthCloseFinished;
                if (!this.facing) mouthCloseFinished = this.animations[0][3].isDoneNextFrame(this.game.clockTick);
                else mouthCloseFinished = this.animations[1][3].isDoneNextFrame(this.game.clockTick);
                if (mouthCloseFinished) {
                    this.action = 0;
                    this.animations[0][3] = new Animator(this.spritesheet, 12, 50, 48, 17, 3, 0.2, 1, false, false);
                    this.animations[1][3] = new Animator(this.spritesheet, 249, 50, 48, 17, 3, 0.2, 1, true, false);
                }
            } else {
                this.locationTimer -= this.game.clockTick;
                if (this.locationTimer <= 0) {
                    this.locationTimer = 0;
                    if (this.megaman.x < this.centerX) this.facing = 0;
                    else this.facing = 1;
                    if (!this.riseTimer && !this.rising) {
                        this.y += 80 * this.game.clockTick * PARAMS.SCALE;
                        if (this.y > CANVAS_HEIGHT) {
                            this.y = CANVAS_HEIGHT;
                            this.riseTimer = 2;
                            this.centerX = this.xLocations[randomInt(this.xLocations.length)];
                            this.targetY = this.yLocations[randomInt(this.yLocations.length)];
                        }
                    } else if (!this.rising) {
                        this.riseTimer -= this.game.clockTick;
                        if (this.riseTimer <= 0) {
                            this.riseTimer = 0;
                            this.rising = true;
                        }
                    } else {
                        if (this.targetY < this.y) {
                            this.y -= 80 * this.game.clockTick * PARAMS.SCALE;
                        }

                        if (this.targetY >= this.y) {
                            this.y = this.targetY;
                            this.locationTimer = 1;
                            this.rising = false;
                            this.riseTimer = 0;
                            this.action = 1;
                        }
                    }
                }
            }
            this.child.update();
            this.updateBB();
        }
    }

    updateBB() {
        if (!this.facing) {
            this.BB = new BoundingBox(this.centerX + 10 * Math.sin(2 * this.game.timer.gameTime), this.y, 64, 34);
        } else {
            this.BB = new BoundingBox(this.centerX + 10 * Math.sin(2 * this.game.timer.gameTime) + 32, this.y, 64, 34);
        }
    }

    draw(ctx) {
        if (this.dead) {
            if (this.flickerFlag) {
                this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);
                this.child.draw(ctx);
            }
            this.flickerFlag = !this.flickerFlag;
        } else {
            this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);
            this.child.draw(ctx);
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = "Red";
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            }
        }
    }
}

class BarbaBody {
    constructor(game, parent, numSections, numSectionsRemaining, megaman) {
        this.animations = [];
        this.sectionNum = numSections - numSectionsRemaining + 1;
        Object.assign(this, { game, parent, megaman });
        if (parent instanceof Barba) {
            this.centerX = this.parent.centerX + 16 * 2;
            this.x = this.centerX;
            this.y = this.parent.y + 17 * 2;
        } else {
            this.centerX = this.parent.centerX;
            this.x = this.centerX;
            this.y = this.parent.y + 16 * 2;
        }
        if (numSectionsRemaining >= 0) {
            this.child = new BarbaBody(this.game, this, numSections, numSectionsRemaining - 1, this.megaman);
        }
        this.facing = this.parent.facing;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/barba.png");
        this.animations.push(new Animator(this.spritesheet, 82, 72, 19, 16, 1, 0.5, 0, false, true));
        this.animations.push(new Animator(this.spritesheet, 282, 72, 19, 16, 1, 0.5, 0, false, true));
    }

    update() {
        this.facing = this.parent.facing;
        this.centerX = this.parent.centerX;
        if (this.parent instanceof Barba) {
            this.centerX = this.parent.centerX + 16 * 2;
            this.y = this.parent.y + 17 * 2;
        } else {
            this.centerX = this.parent.centerX;
            this.y = this.parent.y + 16 * 2;
        }
        this.x = this.centerX + 10 * Math.sin(2 * this.game.timer.gameTime - this.sectionNum * Math.PI / 7);
        if (this.child) {
            this.child.update();
        }
        this.updateBB();
        if (this.BB.collide(this.megaman.BB)) this.megaman.damage(3, 100);
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 38, 32);
    }

    draw(ctx) {
        if (this.parent.dead) {
            if (this.parent.flickerFlag) {
                this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);
                if (this.child) this.child.draw(ctx);
            }
            this.flickerFlag = !this.flickerFlag;
        } else {
            this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);
            if (this.child) {
                this.child.draw(ctx);
            }
        }
    }
}