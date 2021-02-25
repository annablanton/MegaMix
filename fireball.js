class Fireball {
    constructor(game, x, y, angle, megaman, leftoverTime, frame, totalLifetime) {
        if (!(totalLifetime > 15)) {
            Object.assign(this, { game, x, y, angle, megaman, leftoverTime, frame });
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles.png");
            if (!frame) this.animation = new Animator(this.spritesheet, 2, 77, 7, 9, 2, 0.1, 3, false, true);
            else this.animation = new Animator(this.spritesheet, 2, 77, 7, 9, 2, 0.1, 3, true, true)
            this.nextFireballSpawn = 0.03 - leftoverTime;
            this.lifetime = 0.5 - leftoverTime;
            this.fireballSpawned = false;
            if (this.nextFireballSpawn <= 0) {
                this.game.addEntity(new Fireball(this.game, this.x + 18 * Math.cos(this.angle), this.y + 18 * Math.sin(this.angle), this.angle, -this.nextFireballSpawn));
                this.fireballSpawned = true;
            }
            if (this.lifetime <= 0) this.removeFromWorld = true;
            this.BB = new BoundingBox(this.x, this.y, 14, 18);
        } else this.removeFromWorld = true;

    }

    update() {
        this.nextFireballSpawn -= this.game.clockTick;
        this.lifetime -= this.game.clockTick;
        if (this.nextFireballSpawn <= 0 && !this.fireballSpawned) {
            this.game.addEntity(new Fireball(this.game, this.x + 18 * Math.cos(this.angle), this.y + 18 * Math.sin(this.angle), this.angle, -this.nextFireballSpawn, !this.frame, -this.nextFireballSpawn + 0.1));
            this.fireballSpawned = true;
        }
        if (this.lifetime <= 0) this.removeFromWorld = true;
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);
    }


}