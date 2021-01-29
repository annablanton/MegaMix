class Pellet {
    constructor(game, x, y, angle) {
        Object.assign(this, { game, x, y, angle });
        this.SPEED = 350;
        this.lifetime = 0.6;
        this.PELLET_WIDTH = 8;
        this.PELLET_HEIGHT = 6;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles.png");
        this.rotatedPellet = rotationCanvas(this.spritesheet, 5, 8, this.PELLET_WIDTH, this.PELLET_HEIGHT, this.angle, 2);
    }

    update() {
        this.lifetime -= this.game.clockTick;
        if (this.lifetime <= 0) {
            this.removeFromWorld = true;
        }
        this.x += this.SPEED * Math.cos(this.angle) * this.game.clockTick;
        this.y += this.SPEED * Math.sin(this.angle) * this.game.clockTick;
    }

    draw(ctx) {
        ctx.drawImage(this.rotatedPellet, this.x, this.y);
    }
}