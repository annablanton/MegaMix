class BossTrigger {
    constructor(game, x, y, width, height) {
        Object.assign(game, x, y, width, height);
    }

    update() {

    }

    draw(ctx) {
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Blue";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}