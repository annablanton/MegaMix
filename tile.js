class Tile {

    constructor(game, x, y, col, row) {
        Object.assign(this, {game, x, y, col, row});
        const TILE_COLUMNS = 24;
        const TILE_ROWS = 11;
        const TILE_DIMENSION = 16; 
        const TILE_GAP = 17;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tiles.png");
        this.tileSheet = [];
        this.row = row;
        this.col = col
        for (let i = 0; i <= TILE_COLUMNS; i++) {
            this.tileSheet.push([]);
        }
        for (let j = 0; j <= TILE_ROWS; j++) {
            for (let k = 0; k < 11; k++) {
                this.tileSheet[j][k] = new Animator(this.spritesheet, (j * TILE_GAP) + 1, (k * TILE_GAP) + 1, TILE_DIMENSION, TILE_DIMENSION, 1, 1, 0, false, true);
            }
        }
        this.updateBB();
    }
    
    update() {
        this.updateBB();
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 16 * 2, 16 * 2);
        this.leftBB = new BoundingBox(this.x, this.y, 8*2,16*2);
        this.rightBB = new BoundingBox(this.x + 8*2, this.y, 8*2,16*2);
        this.topBB = new BoundingBox(this.x, this.y, 16*2,8*2);
        this.bottomBB = new BoundingBox(this.x, this.y +8*2, 16*2,8*2);
    }

    draw(ctx) {
        try {
            this.tileSheet[this.col][this.row].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        }
        catch (error) {
            if(this.row > 10) {
                throw new Error("One of the tile is using index [" + this.col+ "][" + this.row + "] is out of bound, row index " + this.row + " is too big" +
                ", make sure it is less than 24");
                throw new Error();
            }
            if(this.col > 24) {
                throw new Error("One of the tile is using index [" + this.col+ "][" + this.row + "] is out of bound, col index " + this.col + " is too big" +
                ", make sure it is less than 24");
            }
        }
        if (PARAMS.DEBUG) {
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}