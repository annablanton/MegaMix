class Background {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bg1.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 1921, 1080, 1, 300, 0, false, true);
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 1);
    }

    update() {

    }
}
class Background2 {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bg2.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 626, 195, 1, 300, 0, false, true);
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 1);
    }

    update() {

    }
}