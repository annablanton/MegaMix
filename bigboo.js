class BigBoo {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bigboo.png");
        this.facing = 0;
        this.action = 0;
        this.HEALTH_POINTS = 30;
        this.turnTimer = this.game.timer.gameTime;
        this.actionTimer = this.game.timer.gameTime;

        this.animations = [];
        for (var i = 0; i < 2; i++) { //left/right
            this.animations.push([]);
        }

        this.animations[0].push(new Animator(this.spritesheet, 13, 11, 64, 64, 1, 1, 0, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 91, 11, 64, 64, 1, 1, 0, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 252, 11, 64, 64, 1, 1, 0, true, true));
        this.animations[1].push(new Animator(this.spritesheet, 171, 11, 64, 64, 1, 1, 0, true, true));
    }
    update() {
        if (this.game.timer.gameTime - this.actionTimer >= 2.5) {
            this.action = (this.facing == 0 ? 1 : 0);
            this.actionTimer = this.game.timer.gameTime;
        }
        if (this.game.timer.gameTime - this.turnTimer >= 5) {
            this.facing = (this.facing == 0 ? 1 : 0);
            this.turnTimer = this.game.timer.gameTime;
        }
    }

    draw(ctx) {
        this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 2);
    }
}