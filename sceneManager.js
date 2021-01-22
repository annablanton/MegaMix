class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;

        game.addEntity(new Gordo(game, 400, 380, 1, 0));
        game.addEntity(new Gordo(game, 400, 380, 0, 1));
        game.addEntity(new Gordo(game, 400, 380, -1, 0));
        game.addEntity(new Gordo(game, 400, 380, 0, -1));
        game.addEntity(new Wheelie(game, 400, 600));
        game.addEntity(new ArmorKnight(game, 400, 300));
        game.addEntity(new Bulldozer(game, 400, 170));
        game.addEntity(new Met(game, 400, 16));
	    game.addEntity(new Carock(game, 400, 64));
        game.addEntity(new Megaman(game, 100, 100));
    };

    clearEntities() {
        this.game.entities = [this];
    };

    loadLevelOne() {
        

    };

    update() {
        //PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx) {

        if (PARAMS.DEBUG) {
        }
    };
};
