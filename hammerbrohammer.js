class HammerBroHammer {
    constructor(game, x, y, facing) {
        Object.assign(this, { game, x, y, facing});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");
        this.animations = [];
        this.animations[0] = new Animator(this.spritesheet, 31, 11, 18, 17, 3, 0.3, 3, false, true);
        this.animations[1] = new Animator(this.spritesheet, 259, 10, 18, 17, 3, 0.3, 3, false, true);
        this.velocity = this.facing == 1 ? { x: 150, y: -40 } : { x: -150, y: -40 };
        this.stopUpdateBB = 0;
        this.updateBB();
    }

    update() {
        const FALL_ACCELERATION = 300;
        this.velocity.y += FALL_ACCELERATION * this.game.clockTick;
        this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
        this.y += this.game.clockTick * this.velocity.y * PARAMS.SCALE;
        
        if (this.stopUpdateBB == 0){
            this.updateBB();
        } else {

            //Can find a
            this.BB = new BoundingBox(0,0,0,0);
        }

        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if(entity instanceof Megaman){
                    console.log("hammer clide")
                    that.velocity.x = -that.velocity.x/1.2;
                    entity.healthPoint -= 1;
                    that.stopUpdateBB = 1;
                }
            }
        })
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 18, 17);
    }

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);
    }

}