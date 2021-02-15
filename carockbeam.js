class CarockBeam {
    constructor(game, x, y, facing) {
        console.log()
        Object.assign(this, { game, x, y, facing });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");
        this.animations = [];
        this.animations[0] = new Animator(this.spritesheet, 41, 214, 8, 16, 4, 0.3, 6, true, true);
        this.animations[1] = new Animator(this.spritesheet, 279, 214, 8, 16, 4, 0.3, 6, false, true);
        this.velocity = this.facing == 1 ? { x: 130, y: 0 } : { x: -130, y: 0 };
        this.updateBB();
    }

    update() {
        console.log("carock update");
        this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
        this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
        this.updateBB();
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Tile) {
                    that.removeFromWorld = true;
                }
            }
        });
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 8 * 2, 16 * 2);
    }

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);
    }
}