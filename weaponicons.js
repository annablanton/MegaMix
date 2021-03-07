class WeaponIcon {
    constructor(agent) {
        Object.assign(this, { agent });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/weapon_icon.png");
    }
    update() {
    }
    draw(ctx) {
        if (!this.agent.weaponToggle) {
            ctx.drawImage(this.spritesheet, 0, 0, 18, 18, 967, 220, 36, 36);
        } else {
            ctx.drawImage(this.spritesheet, 17, 0, 18, 18, 967, 220, 36, 36);
        }
    }
}