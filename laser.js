class Laser {
    constructor(game, x, y, angle, laserOriginX, laserOriginY) {

        Object.assign(this, { game, x, y, angle, laserOriginX, laserOriginY});
        this.lifetime = 0.25;
        this.Laser_Damage= 4;
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
                var intersect = findIntersectPoint(that.laserOriginX, that.laserOriginY, that.angle, that.laserLength, entity.BB);
                //console.log(entity.BB);
                var length = lineAndBoxIntersect(that.laserOriginX, that.laserOriginY, that.angle, that.laserLength, entity.BB);
                if (entity instanceof ArmorKnightShield || entity instanceof Bulldozer) {
                    var length = lineAndBoxIntersect(that.laserOriginX, that.laserOriginY, that.angle, that.laserLength, entity.BB);
                    if (entity instanceof ArmorKnightShield && length < that.laserLength && length < lineAndBoxIntersect(that.laserOriginX, that.laserOriginY, that.angle, that.laserLength, entity.armorKnight.BB)) that.laserLength = length;
                    if (entity instanceof Bulldozer && length < that.laserLength && length < lineAndBoxIntersect(that.laserOriginX, that.laserOriginY, that.angle, that.laserLength, entity.met.BB)) that.laserLength = length;
                }
                if (entity instanceof Tile || entity instanceof Gordo || (entity instanceof Met && entity.action == 3) || entity instanceof Tower) {
                    console.log("tile collision");
                    if (entity instanceof Tower) possibleHits.push(entity);
                    if (length < that.laserLength) that.laserLength = length;
                } else if ((entity instanceof HammerBro || entity instanceof Barba 
                    || entity instanceof BigBoo || entity instanceof Wheelie || (entity instanceof Met && entity.action != 3)
                    || entity instanceof ArmorKnight || entity instanceof BulldozerMet
                    || entity instanceof Carock) && intersect.x - that.game.camera.x <= 1024 && intersect.x - that.game.camera.x >= 0
                        && intersect.y - that.game.camera.y <= 768 && intersect.y - that.game.camera.y >= 0) possibleHits.push(entity);
            }
        });


        possibleHits.forEach(function (entity) {
            //console.log("a");
            var intersect = lineAndBoxIntersect(that.laserOriginX, that.laserOriginY, that.angle, that.laserLength, entity.BB);
            if (entity.BB && that.collide(entity.BB)) {
                //that.game.addEntity(new Clank(that.game, that.laserOriginX + intersect * Math.cos(that.angle), that.laserOriginY + intersect * Math.sin(that.angle)));
                if(entity.HEALTH_POINTS > 1){                        
                    entity.HEALTH_POINTS -= that.Laser_Damage 
                } if (entity.HEALTH_POINTS <= 1 && !(entity instanceof Tower)) {
                    entity.HEALTH_POINTS -= that.Laser_Damage
                    entity.dead = true;
                    if (entity instanceof ArmorKnight) entity.shield.removeFromWorld = true;
                    if (entity instanceof BulldozerMet) entity.bulldozer.dead = true;
                }
            }
            if (entity instanceof Tower && intersect == that.laserLength) {
                entity.HEALTH_POINTS -= that.Laser_Damage;
                console.log("tower hit");
            }
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
        ctx.translate(this.x - this.game.camera.x, this.y- this.game.camera.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x + this.game.camera.x, -this.y+ this.game.camera.y);
        
        ctx.drawImage(this.spritesheet, 22, 25, 512, 16, this.x + 38 + 14 * -Math.abs(Math.sin(this.angle)) - this.game.camera.x, this.y - 8- this.game.camera.y, this.laserLength, 32);
        ctx.restore();
        if (PARAMS.DEBUG) {
            ctx.fillRect(this.x - 5-this.game.camera.x, this.y - 5- this.game.camera.y, 10, 10)
            ctx.fillRect(this.laserOriginX - 2 - this.game.camera.x, this.laserOriginY - 2- this.game.camera.y, 4, 4);
        }
    }
}