class BossTrigger {
    constructor(game, x, y, width, height, boss, walls) {
        Object.assign(this, { game, x, y, width, height, boss, walls});
        this.bossFightStarted = false;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.boss.arena = this;
        this.tiles = [];
    }

    update() {
        if (!this.bossFightStarted) {
            if (this.BB.collide(this.game.camera.megaman.BB)) {
                var that = this;
                this.walls.forEach(function (wall) {
                    for (var i = 0; i < wall.length; i++) {
                        var tile = new Tile(that.game, wall.x, wall.y + i * 32, 24, 3);
                        that.tiles.push(tile);
                        that.game.addEntity(tile);
                    }
                });
                this.bossFightStarted = true;
            }
        }

        if (this.boss.removeFromWorld) {
            this.tiles.forEach(function (tile) {
                tile.removeFromWorld = true;
            });
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Blue";
            ctx.strokeRect(this.x - this.game.camera.x, this.y - this.game.camera.y, this.width, this.height);
        }
    }
}