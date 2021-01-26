class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.loadLevelOne();
        game.addEntity(new Gordo(game, 16, 16));
        //game.addEntity(new Wheelie(game, 16, 16));
        //game.addEntity(new ArmorKnight(game, 16, 16));
        //game.addEntity(new Bulldozer(game, 16, 16));
        //game.addEntity(new Met(game, 16, 16));
        //game.addEntity(new Carock(game, 16, 16));
        // game.addEntity(new HammerBro(game, 120, 120));
        game.addEntity(new Megaman(game, 100, 100));
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
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;

        let midpoint = PARAMS.CANVAS_WIDTH/2 - PARAMS.BLOCKWIDTH / 2;

        this.x = this.Megaman.x - midpoint;
    };

    draw(ctx) {
        if (PARAMS.DEBUG) {
        }
    };
};
