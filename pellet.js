class Pellet {
    constructor(game, x, y, angle, momentumX) {
        Object.assign(this, { game, x, y, angle });
        this.x = x
        this.y = y
        this.SPEED = 100;
        this.velocity = { x: (this.SPEED) * Math.cos(this.angle) + momentumX, y: this.SPEED * Math.sin(this.angle) };
        this.lifetime = 0.6;
        this.PELLET_WIDTH = 8;
        this.PELLET_HEIGHT = 6;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles.png");
        this.rotatedPellet = rotationCanvas(this.spritesheet, 5, 8, this.PELLET_WIDTH, this.PELLET_HEIGHT, this.angle, 2);
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.PELLET_WIDTH * 2, this.PELLET_HEIGHT * 2)
    }

    update() {
        this.lifetime -= this.game.clockTick;
        if (this.lifetime <= 0) {
            this.removeFromWorld = true;
        }
        this.x += this.velocity.x * this.game.clockTick * PARAMS.SCALE;
        this.y += this.velocity.y * this.game.clockTick * PARAMS.SCALE;
        this.updateBB();
        var that = this;
        var possibleHits = []
        this.game.entities.forEach(function (entity) {
            if ((entity instanceof Tile||entity instanceof Wheelie || entity instanceof Bulldozer||
                entity instanceof Gordo || entity instanceof HammerBro || entity instanceof Carock
                || entity instanceof Met || entity instanceof ArmorKnightShield) && that.BB.collide(entity.BB)) {
                that.removeFromWorld= true;   
            }

            if ((entity instanceof ArmorKnight || entity instanceof BulldozerMet) && that.BB.collide(entity.BB)) {
                possibleHits.push(entity);
            }

            if ((entity instanceof Wheelie ||
                entity instanceof HammerBro || entity instanceof Carock || entity instanceof Met) && that.BB.collide(entity.BB)) {
                entity.removeFromWorld = true;
            }
        });

        if (!this.removeFromWorld) {
            var i = 0;
            while (i < possibleHits.length) {
                possibleHits[i].removeFromWorld = true;
                if (possibleHits[i] instanceof ArmorKnight) {
                    possibleHits[i].shield.removeFromWorld = true;
                }
                if (possibleHits[i] instanceof BulldozerMet) {
                    possibleHits[i].bulldozer.removeFromWorld = true;
                }
                possibleHits.splice(i, 1);
                i++;
                this.removeFromWorld = true;
            }
        }
    }



    draw(ctx) {
        ctx.drawImage(this.rotatedPellet, this.x - this.game.camera.x, this.y - this.game.camera.y);
        if (PARAMS.DEBUG) {
            ctx.fillStyle = "Red";
            ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, this.PELLET_WIDTH * 2, this.PELLET_WIDTH * 2);
        }
    }
}