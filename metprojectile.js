class MetProjectile {
    constructor(game, x, y, angle) {
        Object.assign(this, { game, x, y, angle });
        this.velocity = { x: 100 * Math.cos(angle), y: 100 * Math.sin(angle) };
        this.lifetime = 6;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles.png");
        this.animation = new Animator(this.spritesheet, 2, 65, 6, 6, 1, 1, 0, false, true);
        this.updateBB();
    }

    update() {
        this.lifetime -= this.game.clockTick;
        if (this.lifetime <= 0) {
            this.removeFromWorld = true;
        } else {
            this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
            this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
            this.updateBB();
        }
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 6 * 3, 6 * 3);
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 3);
    }
}