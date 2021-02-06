class Laser {
    constructor(game, x, y, angle, laserOriginX, laserOriginY) {

        Object.assign(this, { game, x, y, angle, laserOriginX, laserOriginY});
        this.lifetime = 0.25;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles.png");

        //the laser should only collide with other entities on the first frame
        //therefore, we will perform collision detection during the constructor method
        this.laserLength = 1280;
        var possibleHits = [];
        var that = this;
        this.game.entities.forEach(function (entity) {
            //console.log("a");
            //we need two passes over the entities list
            //this first one determines the first tile that the laser hits, then the second one determines which enemies are between megaman and the tile
            if (entity.BB && that.collide(entity.BB)) {
                //console.log(entity.BB);
                if (entity instanceof Tile) {
                    console.log("tile collision");
                    var length = lineAndBoxIntersect(that.laserOriginX, that.laserOriginY, that.angle, that.laserLength, entity.BB);
                    console.log(length);
                    if (length < that.laserLength) that.laserLength = length;
                } else if ((entity instanceof HammerBro || entity instanceof Barba
                    || entity instanceof BigBoo || entity instanceof Wheelie || entity instanceof Met
                    || entity instanceof ArmorKnight || entity instanceof Bulldozer || entity instanceof Gordo
                    || entity instanceof Carock)) possibleHits.push(entity);
            }
        });


        possibleHits.forEach(function (entity) {
            //console.log("a");
            if (entity.BB && that.collide(entity.BB)) entity.removeFromWorld = true;
        });
    }

    collide(bb) {
        //currently assumes all relevant BBs are boxes
        //if that changes, update this code
        return lineAndBoxIntersect(this.laserOriginX, this.laserOriginY, this.angle, this.laserLength, bb) < this.laserLength;
    }

    update() {
        this.lifetime -= this.game.clockTick;
        if (this.lifetime <= 0) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x - this.game.camera.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x + this.game.camera.x, -this.y);
        
        ctx.drawImage(this.spritesheet, 22, 25, 512, 16, this.x + 38 + 14 * -Math.abs(Math.sin(this.angle)) - this.game.camera.x, this.y - 8, this.laserLength, 32);
        ctx.restore();
        if (PARAMS.DEBUG) {
            ctx.fillRect(this.x - 5-this.game.camera.x, this.y - 5, 10, 10)
            ctx.fillRect(this.laserOriginX - 2 - this.game.camera.x, this.laserOriginY - 2, 4, 4);
        }
    }
}