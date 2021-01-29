class Laser {
    constructor(game, x, y, angle) {
        Object.assign(this, { game, x, y, angle });
        console.log(this.x);
        console.log(this.y);
        this.lifetime = 0.25;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles.png");
        this.LASER_WIDTH = 512;
        this.LASER_HEIGHT = 8;
        this.rotatedLaser = rotationCanvas(this.spritesheet, 22, 25, this.LASER_WIDTH, this.LASER_HEIGHT, this.angle, 2);
    }

    update() {
        this.lifetime -= this.game.clockTick;
        if (this.lifetime <= 0) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.rotatedLaser, this.x, this.y);
    }
}