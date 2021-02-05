class HealthMeter {
    constructor(agent) {
        Object.assign(this, { agent });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/healthmeter.png");
    }
    update() {
    }

    draw(ctx) {     
        ctx.drawImage(this.spritesheet, 7 * this.agent.healthPoint, 0, 6, 60, 975, 25, 20, 200);
    }
}