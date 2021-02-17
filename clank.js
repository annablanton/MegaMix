class Clank {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/effects.png");
        this.lifetime = 0.1;
        this.animation = new Animator(this.spritesheet, 0, 0, 16, 16, 1, 1, 0, false, true);
    }

    update() {
        this.lifetime -= this.game.clockTick;
        if (this.lifetime <= 0) this.removeFromWorld = true;
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);
    }
}