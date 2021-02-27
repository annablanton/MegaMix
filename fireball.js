class Fireball {
    constructor(game, x, y, angle, megaman, leftoverTime, frame, totalLifetime) {
        if (!(totalLifetime > 15)) {
            Object.assign(this, { game, x, y, angle, megaman, leftoverTime, frame, totalLifetime });
            var that = this;
            this.game.entities.forEach(function (entity) {
                if (that.BB && entity.BB && that.BB.collide(entity.BB)) {
                    if (entity instanceof Tile && !entity.passable) {
                        that.removeFromWorld = true;
                    }
                }
            });
            if (!this.removeFromWorld) {
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles.png");
                if (!frame) this.animation = new Animator(this.spritesheet, 2, 77, 7, 9, 2, 0.1, 3, false, true);
                else this.animation = new Animator(this.spritesheet, 2, 77, 7, 9, 2, 0.1, 3, true, true)
                this.nextFireballSpawn = 0.03 - leftoverTime;
                this.lifetime = 0.5 - leftoverTime;
                this.fireballSpawned = false;
                if (this.nextFireballSpawn <= 0) {
                    this.game.addEntity(new Fireball(this.game, this.x + 18 * Math.cos(this.angle), this.y + 18 * Math.sin(this.angle), this.angle, this.megaman, -this.nextFireballSpawn, !this.frame, this.totalLifetime - this.nextFireballSpawn + 0.1));
                    this.fireballSpawned = true;
                }
                if (this.lifetime <= 0) this.removeFromWorld = true;
                this.BB = new BoundingBox(this.x, this.y, 14, 18);
            }
        } else this.removeFromWorld = true;

    }

    update() {
        if (this.lifetime <= 0) this.removeFromWorld = true;
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (that.BB && entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Tile && !entity.passable) {
                    that.removeFromWorld = true;
                }
            }
        });

        if (!this.removeFromWorld) {
            this.nextFireballSpawn -= this.game.clockTick;
            this.lifetime -= this.game.clockTick;
            if (this.nextFireballSpawn <= 0 && !this.fireballSpawned) {
                this.game.addEntity(new Fireball(this.game, this.x + 18 * Math.cos(this.angle), this.y + 18 * Math.sin(this.angle), this.angle, this.megaman, -this.nextFireballSpawn, !this.frame, this.totalLifetime - this.nextFireballSpawn + 0.1));
                this.fireballSpawned = true;
            }
        }
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);
    }


}