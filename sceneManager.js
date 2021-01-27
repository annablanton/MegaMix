class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.megaman = new Megaman(game, 100, 100);

        game.addEntity(new Gordo(game, 400, 380, 1, 0));
        game.addEntity(new Gordo(game, 400, 380, 0, 1));
        game.addEntity(new Gordo(game, 400, 380, -1, 0));
        game.addEntity(new Gordo(game, 400, 380, 0, -1));
        game.addEntity(new Wheelie(game, 400, 600));
        game.addEntity(new ArmorKnight(game, 600, 300));
        game.addEntity(new Bulldozer(game, 400, 170));
        game.addEntity(new Met(game, 400, 16));
        game.addEntity(new HammerBro(game, 400, 700));
        game.addEntity(new Carock(game, 400, 64));
        this.loadLevelOne();
        game.addEntity(this.megaman);
        game.addEntity(this);
    };

    clearEntities() {
        this.game.entities = [this];
    };

    loadLevelOne() {
        // Test for tile drawing method
        this.game.addEntity(new Tile(this.game, 500, 500, 9, 0));
        this.game.addEntity(new Tile(this.game, 500, 532, 9, 1));
        this.game.addEntity(new Tile(this.game, 500, 564, 9, 2));
        this.game.addEntity(new Tile(this.game, 500, 596, 9, 3));
        this.game.addEntity(new Tile(this.game, 532, 500, 10, 0));
        this.game.addEntity(new Tile(this.game, 532, 532, 10, 1));
        this.game.addEntity(new Tile(this.game, 532, 564, 10, 2));
        this.game.addEntity(new Tile(this.game, 532, 596, 10, 3));
        this.game.addEntity(new Tile(this.game, 70, 170, 0, 0));
        this.game.addEntity(new Tile(this.game, 102, 170, 1, 0));
        this.game.addEntity(new Tile(this.game, 134, 170, 2, 0));
        this.game.addEntity(new Tile(this.game, 166, 170, 3, 0));
        this.game.addEntity(new Tile(this.game, 300, 16, 3, 0));
        this.game.addEntity(new Tile(this.game, 300, 64, 3, 0));
        this.game.addEntity(new Tile(this.game, 300, 300, 3, 0));
        this.game.addEntity(new Tile(this.game, 500, 64, 3, 0));
        this.game.addEntity(new Tile(this.game, 300, 700, 3, 0));
        this.game.addEntity(new Tile(this.game, 400, 250, 3, 0));
        this.game.addEntity(new Tile(this.game, 400, 526, 3, 0));
        this.game.addEntity(new Tile(this.game, 200, 600, 3, 0));
        this.game.addEntity(new Tile(this.game, 270, 380, 3, 0));
        this.game.addEntity(new Tile(this.game, 546, 380, 3, 0));
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        let midpoint = PARAMS.CANVAS_WIDTH/2 - PARAMS.BLOCKWIDTH / 2;

        this.x = this.megaman.x - midpoint;
    };

    draw(ctx) {
        if (PARAMS.DEBUG) {
        }
    };
};
