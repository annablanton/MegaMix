class Mushroom {
    constructor(game, x, y, type) {
        Object.assign(this, { game, x, y, type});
        this.SPRITE_WIDTH = 32;
        this.SPRITE_HEIGHT = 32;
        
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mushrooms.png");
        this.emerging = true; //From a block when block being shot? 
        this.velocity = { x: 0, y: 0};
        this.updateBB();
    }
    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32, 32);
    }
    update() {
        const FALL_ACCELERATION = 750;

        this.velocity.y += FALL_ACCELERATION * this.game.clockTick;
        this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
        this.y += this.game.clockTick * this.velocity.y * PARAMS.SCALE;
        this.updateBB();
        
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Megaman) {
                    that.removeFromWorld = true;
                    if (that.type == 0) {
                        entity.healthPoint += 5;
                        if (entity.healthPoint > 28) {
                            entity.healthPoint = 28;
                        }
                    }
                    if (that.type == 1) entity.state = 1; 
                } else if ((entity instanceof Tile)
                    && (that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE) <= entity.BB.top) {
                    that.y = entity.BB.top - that.SPRITE_HEIGHT;
                    that.velocity.y = 0;
                    that.updateBB();
                } else if (entity !== that) {
                    that.velocity.x = -that.velocity.x;
                }
            };
        });
        
    }

    draw(ctx) {
        if (this.type == 0) {
            ctx.drawImage(this.spritesheet, 0, 0, 227, 227, this.x - this.game.camera.x, this.y - this.game.camera.y, this.SPRITE_WIDTH, this.SPRITE_HEIGHT);
        } else {
            ctx.drawImage(this.spritesheet, 228, 0, 227, 227, this.x - this.game.camera.x, this.y- this.game.camera.y, this.SPRITE_WIDTH, this.SPRITE_HEIGHT);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y- this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
}