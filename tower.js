class Tower {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.SCALE = 0.75
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/towerdemolition.png");
        this.animations = [];
        this.animations[0] = new Animator(this.spritesheet, 0, 58, 500, 410, 1, 1, 0, false, true);
        this.animations[1] = new Animator(this.spritesheet, 0, 58, 500, 410, 20, 0.08, 0, false, false);
        this.animations[2] = new Animator(this.spritesheet, 9500, 58, 500, 410, 1, 1, 0, false, true);
        this.action = 0; //0 = standing, 1 = falling, 2 = fallen
        this.updateBB();
        this.HEALTH_POINTS = 10;
        this.fallen = false;
        console.log(this.animations[2]);
    }

    update() {
        if (this.HEALTH_POINTS > 0) {
            this.action = 0;
        } else if (!this.fallen) {
            if (this.animations[1].isDoneNextFrame(this.game.clockTick)) {

                this.action = 2;
                this.fallen = true;
            } else {
                this.action = 1;
                ASSET_MANAGER.pauseBackgroundMusic();
                ASSET_MANAGER.playAsset("./sounds/stageclear.wav");
            }
        }
        this.updateBB();
    }

    updateBB() {
        if (this.HEALTH_POINTS > 0) {
            this.BB = new BoundingBox(this.x + 97 * this.SCALE, this.y, 307 * this.SCALE, 410 * this.SCALE);
        } else {
            this.BB = new BoundingBox(0, 2000, 0, 0);
        }
    }

    draw(ctx) {
        this.animations[this.action].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.SCALE);
    }
}