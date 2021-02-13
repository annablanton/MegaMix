class GrapplingHook {
    constructor(game, x, y, angle, megaman) {
        Object.assign(this, { game, x, y, angle, megaman});
        this.x = x
        this.y = y
        this.SPEED = 350;
        this.MAX_LENGTH = 600;
        this.HOOK_WIDTH = 9;
        this.HOOK_HEIGHT = 14;
        this.retracting = 0;
        this.pulling = 0;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles.png");
        this.rotatedHook = rotationCanvas(this.spritesheet, 3, 42, this.HOOK_WIDTH, this.HOOK_HEIGHT, this.angle, 2);
        this.rope = new GrapplingRope(game, this.megaman, this);
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.HOOK_HEIGHT * 2, this.HOOK_HEIGHT * 2)
    }

    update() {
        var megamanAngle = Math.atan2(this.y - (this.megaman.y + this.megaman.FIRE_OFFSET_Y), this.x - (this.megaman.x + this.megaman.FIRE_OFFSET_X));
        if (megamanAngle < 0) megamanAngle = Math.PI * 2 + megamanAngle;
        //this.megaman.angleRads = megamanAngle;
        //if ((this.megaman.angleRads >= 0 && this.megaman.angleRads < Math.PI / 8) || (this.megaman.angleRads >= 15 * Math.PI / 8)) this.megaman.angle = 0;
        //else if (this.megaman.angleRads < Math.PI / 2) this.megaman.angle = 1;
        //else if (this.megaman.angleRads < 7 * Math.PI / 8) this.megaman.angle = 2;
        //else if (this.megaman.angleRads < 9 * Math.PI / 8) this.megaman.angle = 3;
        //else if (this.megaman.angleRads < 11 * Math.PI / 8) this.megaman.angle = 4;
        //else if (this.megaman.angleRads < 3 * Math.PI / 2) this.megaman.angle = 5;
        //else if (this.megaman.angleRads < 13 * Math.PI / 8) this.megaman.angle = 6;
        //else this.megaman.angle = 7;
        //console.log(this.megaman.angle);
        var ellipsePoint = findEllipsePoint(40, 25, this.angle);
        if (!this.retracting && !this.pulling) { //extend hook
            this.x += this.SPEED * Math.cos(this.angle) * this.game.clockTick * PARAMS.SCALE;
            this.y += this.SPEED * Math.sin(this.angle) * this.game.clockTick * PARAMS.SCALE;
            var dist = distance(this.megaman.x + this.megaman.FIRE_OFFSET_X + ellipsePoint.x - this.game.camera.x, this.megaman.y + this.megaman.FIRE_OFFSET_Y + ellipsePoint.y - this.game.camera.y, this.x - this.game.camera.x, this.y - this.game.camera.y);
            if (dist >= this.MAX_LENGTH) { //start retracting
                this.x -= (dist - this.MAX_LENGTH) * Math.cos(this.angle);
                this.y -= (dist - this.MAX_LENGTH) * Math.sin(this.angle);
                this.retracting = 1;
            }
        } else if (this.retracting) { //retract hook

            this.x -= this.SPEED * Math.cos(megamanAngle) * this.game.clockTick * PARAMS.SCALE;
            this.y -= this.SPEED * Math.sin(megamanAngle) * this.game.clockTick * PARAMS.SCALE;
        }
        //else { //pull megaman
        //    this.megaman.action = 2;
        //    this.megaman.velocity.x += (this.SPEED * Math.cos(megamanAngle) * this.game.clockTick * PARAMS.SCALE); 
        //    this.megaman.velocity.y += (this.SPEED * Math.sin(megamanAngle) * this.game.clockTick * PARAMS.SCALE);
        //}
        this.updateBB();

        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Megaman && (that.retracting || that.pulling)) {
                    that.removeFromWorld = true;
                    that.retracting = 0;
                    that.pulling = 0;
                    //entity.firingState = 0;
                }

                if ((entity instanceof Wheelie || entity instanceof Bulldozer ||
                    entity instanceof Gordo || entity instanceof HammerBro ||
                    entity instanceof ArmorKnight || entity instanceof Carock || entity instanceof Met) && !that.retracting == 1) {
                    that.retracting = 1;
                }

                if (entity instanceof Tile && !that.retracting) {
                    //code to pull megaman to grappling spot goes here
                    that.pulling = 1;
                }
            }
        });

        this.rope.update();
    }

    draw(ctx) {
        ctx.drawImage(this.rotatedHook, this.x - this.game.camera.x, this.y- this.game.camera.y);
        this.rope.draw(ctx);
    }
}

class GrapplingRope {
    constructor(game, megaman, hook) {
        Object.assign(this, { game, megaman, hook });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles.png");
        //this is a really inelegant implementation
        //if you can figure out a way to mathematically model the offset for hookX and hookY, please change this
        //otherwise, it works, it's just ugly
        if (this.megaman.angle == 0) {
            this.ropeOriginX = this.megaman.x + 41 * 2;
            this.ropeOriginY = this.megaman.y + 21 * 2;
            this.hookX = this.hook.x + 5;
            this.hookY = this.hook.y + 10;
        } else if (this.megaman.angle == 1) {
            this.ropeOriginX = this.megaman.x + 40 * 2;
            this.ropeOriginY = this.megaman.y + 28 * 2;
            this.hookX = this.hook.x + 10;
            this.hookY = this.hook.y + 5;
        } else if (this.megaman.angle == 2) {
            this.ropeOriginX = this.megaman.x + 8 * 2;
            this.ropeOriginY = this.megaman.y + 32 * 2;
            this.hookX = this.hook.x + 22;
            this.hookY = this.hook.y + 12;
        } else if (this.megaman.angle == 3) {
            this.ropeOriginX = this.megaman.x + 3 * 2;
            this.ropeOriginY = this.megaman.y + 25 * 2;
            this.hookX = this.hook.x + 23;
            this.hookY = this.hook.y + 17;
        } else if (this.megaman.angle == 4) {
            this.ropeOriginX = this.megaman.x + 6 * 2;
            this.ropeOriginY = this.megaman.y + 18 * 2;
            this.hookX = this.hook.x + 18;
            this.hookY = this.hook.y + 23;
        } else if (this.megaman.angle == 5) {
            this.ropeOriginX = this.megaman.x + 16 * 2;
            this.ropeOriginY = this.megaman.y + 11 * 2;
            this.hookX = this.hook.x + 10;
            this.hookY = this.hook.y + 22;
        } else if (this.megaman.angle == 6) {
            this.ropeOriginX = this.megaman.x + 26 * 2;
            this.ropeOriginY = this.megaman.y + 12 * 2;
            this.hookX = this.hook.x + 10;
            this.hookY = this.hook.y + 22;
        } else {
            this.ropeOriginX = this.megaman.x + 37 * 2;
            this.ropeOriginY = this.megaman.y + 14 * 2;
            this.hookX = this.hook.x + 6;
            this.hookY = this.hook.y + 20;
        }
        this.angle = Math.atan2(this.hookY - this.ropeOriginY, this.hook.x - this.ropeOriginX);
        this.length = distance(this.ropeOriginX, this.ropeOriginY, this.hookX, this.hookY);
    }
    update() {
        if (this.megaman.angle == 0) {
            this.ropeOriginX = this.megaman.x + 41 * 2;
            this.ropeOriginY = this.megaman.y + 21 * 2;
            this.hookX = this.hook.x + 5;
            this.hookY = this.hook.y + 10;
        } else if (this.megaman.angle == 1) {
            this.ropeOriginX = this.megaman.x + 40 * 2;
            this.ropeOriginY = this.megaman.y + 28 * 2;
            this.hookX = this.hook.x + 10;
            this.hookY = this.hook.y + 5;
        } else if (this.megaman.angle == 2) {
            this.ropeOriginX = this.megaman.x + 8 * 2;
            this.ropeOriginY = this.megaman.y + 32 * 2;
            this.hookX = this.hook.x + 22;
            this.hookY = this.hook.y + 12;
        } else if (this.megaman.angle == 3) {
            this.ropeOriginX = this.megaman.x + 3 * 2;
            this.ropeOriginY = this.megaman.y + 25 * 2;
            this.hookX = this.hook.x + 23;
            this.hookY = this.hook.y + 17;
        } else if (this.megaman.angle == 4) {
            this.ropeOriginX = this.megaman.x + 6 * 2;
            this.ropeOriginY = this.megaman.y + 18 * 2;
            this.hookX = this.hook.x + 18;
            this.hookY = this.hook.y + 23;
        } else if (this.megaman.angle == 5) {
            this.ropeOriginX = this.megaman.x + 16 * 2;
            this.ropeOriginY = this.megaman.y + 11 * 2;
            this.hookX = this.hook.x + 10;
            this.hookY = this.hook.y + 22;
        } else if (this.megaman.angle == 6) {
            this.ropeOriginX = this.megaman.x + 26 * 2;
            this.ropeOriginY = this.megaman.y + 12 * 2;
            this.hookX = this.hook.x + 10;
            this.hookY = this.hook.y + 22;
        } else {
            this.ropeOriginX = this.megaman.x + 37 * 2;
            this.ropeOriginY = this.megaman.y + 14 * 2;
            this.hookX = this.hook.x + 6;
            this.hookY = this.hook.y + 20;
        }
        this.angle = Math.atan2(this.hookY - this.ropeOriginY, this.hookX - this.ropeOriginX);
        this.length = distance(this.ropeOriginX, this.ropeOriginY, this.hookX, this.hookY);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.ropeOriginX - this.game.camera.x, this.ropeOriginY- this.game.camera.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.ropeOriginX + this.game.camera.x, -this.ropeOriginY+ this.game.camera.y);

        ctx.drawImage(this.spritesheet, 16, 47, this.length / 2, 16, this.ropeOriginX - this.game.camera.x, this.ropeOriginY- this.game.camera.y, this.length, 32)
        ctx.restore();
    }
}