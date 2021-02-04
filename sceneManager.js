class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.megaman = new Megaman(game, 100, 20);

        game.addEntity(new Gordo(game, 400, 380, 1, 0));
        game.addEntity(new Gordo(game, 400, 380, 0, 1));
        game.addEntity(new Gordo(game, 400, 380, -1, 0));
        game.addEntity(new Gordo(game, 400, 380, 0, -1));
        game.addEntity(new Wheelie(game, 400, 600));
        game.addEntity(new ArmorKnight(game, 600, 300));
        game.addEntity(new Bulldozer(game, 200, 200));
        game.addEntity(new Met(game, 400, 16));
        game.addEntity(new HammerBro(game, 500, 672));
        game.addEntity(new Carock(game, 400, 64));
        game.addEntity(new Barba(game, 600, 100));
        game.addEntity(new BigBoo(game, 600, 600));
        game.addEntity(new Pellet(game, 16, 16, Math.PI / 8));

        this.loadLevelOne();
        game.addEntity(this.megaman);
        game.addEntity(this);
    };

    clearEntities() {
        this.game.entities = [this];
    };

    loadLevelOne() {
        // Test for tile drawing method
        //testing map
        this.game.addEntity(new Tile(this.game, 500, 500, 9, 0));
        this.game.addEntity(new Tile(this.game, 500, 532, 9, 1));
        this.game.addEntity(new Tile(this.game, 500, 564, 9, 2));
        this.game.addEntity(new Tile(this.game, 500, 596, 9, 3));
        this.game.addEntity(new Tile(this.game, 532, 500, 10, 0));
        this.game.addEntity(new Tile(this.game, 532, 532, 10, 1));
        this.game.addEntity(new Tile(this.game, 532, 564, 10, 2));
        this.game.addEntity(new Tile(this.game, 532, 596, 10, 3));
        this.game.addEntity(new Tile(this.game, 70, 300, 0, 0));
        this.game.addEntity(new Tile(this.game, 102, 300, 1, 0));
        this.game.addEntity(new Tile(this.game, 134, 300, 2, 0));
        this.game.addEntity(new Tile(this.game, 166, 300, 3, 0));
        this.game.addEntity(new Tile(this.game, 300, 16, 3, 0));
        this.game.addEntity(new Tile(this.game, 300, 64, 3, 0));
        this.game.addEntity(new Tile(this.game, 300, 300, 3, 0));
      
        this.game.addEntity(new Tile(this.game, 500, 64, 3, 0));
        this.game.addEntity(new Tile(this.game, 500, 96, 3, 0));
        this.game.addEntity(new Tile(this.game, 500, 128, 3, 0));
        this.game.addEntity(new Tile(this.game, 300, 700, 3, 0));
        this.game.addEntity(new Tile(this.game, 400, 250, 3, 0));
        this.game.addEntity(new Tile(this.game, 400, 526, 3, 2));

        this.game.addEntity(new Tile(this.game, 200, 600, 3, 2));
        this.game.addEntity(new Tile(this.game, 200, 632, 3, 2));
        this.game.addEntity(new Tile(this.game, 270, 360, 3, 3));
        this.game.addEntity(new Tile(this.game, 270, 392, 3, 1));
        this.game.addEntity(new Tile(this.game, 270, 424, 3, 1));
        this.game.addEntity(new Tile(this.game, 546, 380, 3, 0));
        

        // testing map2
        // this.game.addEntity(new Tile(this.game, 0, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 704, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 672, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 640, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 608, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 576, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 544, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 512, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 480, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 448, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 416, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 384, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 352, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 320, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 288, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 256, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 224, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 192, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 160, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 128, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 96, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 64, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 32, 9, 0));
        // this.game.addEntity(new Tile(this.game, 0, 0, 9, 0));          ////left side wall
        // this.game.addEntity(new Tile(this.game, 32, 32, 9, 0));          ////left side wall
        
        // this.game.addEntity(new Tile(this.game, 32, 608, 9, 0));
        // this.game.addEntity(new Tile(this.game, 64, 608, 9, 0));
        // this.game.addEntity(new Tile(this.game, 96, 608, 9, 0));
        // this.game.addEntity(new Tile(this.game, 128, 608, 9, 0));      //left ceiling
        
        // this.game.addEntity(new Tile(this.game, 32, 736, 9, 0));       //bottom
        // this.game.addEntity(new Tile(this.game, 64, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 64, 250, 9, 0));
        // this.game.addEntity(new Tile(this.game, 96, 250, 9, 0));
        // this.game.addEntity(new Tile(this.game, 128, 250, 9, 0));


        // this.game.addEntity(new Tile(this.game, 96, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 96, 704, 9, 0));
        // this.game.addEntity(new Tile(this.game, 96, 672, 9, 0));
        
        // this.game.addEntity(new Tile(this.game, 128, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 160, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 192, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 224, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 256, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 288, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 320, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 353, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 385, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 417, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 449, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 481, 736, 9, 0));
        // // this.game.addEntity(new Tile(this.game, 397, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 513, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 545, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 577, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 609, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 641, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 673, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 705, 736, 9, 0));
        // this.game.addEntity(new Tile(this.game, 737, 736, 9, 0));
        /////////////////////////////////////////////////////////////// second testing map end

        // this.game.addEntity(new Tile(this.game, 500, 532, 9, 1));
        // this.game.addEntity(new Tile(this.game, 500, 564, 9, 2));
        // this.game.addEntity(new Tile(this.game, 500, 596, 9, 3));
        // this.game.addEntity(new Tile(this.game, 532, 500, 10, 0));
        // this.game.addEntity(new Tile(this.game, 532, 532, 10, 1));
        // this.game.addEntity(new Tile(this.game, 532, 564, 10, 2));
        // this.game.addEntity(new Tile(this.game, 532, 596, 10, 3));
        // this.game.addEntity(new Tile(this.game, 70, 300, 0, 0));
        // this.game.addEntity(new Tile(this.game, 102, 300, 1, 0));
        // this.game.addEntity(new Tile(this.game, 134, 300, 2, 0));
        // this.game.addEntity(new Tile(this.game, 166, 300, 3, 0));
        // this.game.addEntity(new Tile(this.game, 300, 16, 3, 0));
        // this.game.addEntity(new Tile(this.game, 300, 64, 3, 0));
        // this.game.addEntity(new Tile(this.game, 300, 300, 3, 0));
        // this.game.addEntity(new Tile(this.game, 500, 64, 3, 0));
        // this.game.addEntity(new Tile(this.game, 6, 500, 3, 0));
        // this.game.addEntity(new Tile(this.game, 6, 468, 3, 0));
        // this.game.addEntity(new Tile(this.game, 6, 436, 3, 0));
        // this.game.addEntity(new Tile(this.game, 6, 404, 3, 0));
        // this.game.addEntity(new Tile(this.game, 38, 372, 3, 0));
        // this.game.addEntity(new Tile(this.game, 70, 372, 3, 0));
        // this.game.addEntity(new Tile(this.game, 102, 372, 3, 0));


        
        // this.game.addEntity(new Tile(this.game, 38, 596, 3, 0));
        // this.game.addEntity(new Tile(this.game, 70, 596, 3, 0));

        
        // this.game.addEntity(new Tile(this.game, 38, 500, 3, 0));
        // this.game.addEntity(new Tile(this.game, 70, 500, 3, 0));
        // this.game.addEntity(new Tile(this.game, 102, 500, 3, 0));
        // this.game.addEntity(new Tile(this.game, 134, 500, 3, 0));
        // this.game.addEntity(new Tile(this.game, 166, 500, 3, 0));
        // this.game.addEntity(new Tile(this.game, 198, 500, 3, 0));
        // this.game.addEntity(new Tile(this.game, 230, 500, 3, 0));
        // this.game.addEntity(new Tile(this.game, 230, 468, 3, 0));
        // this.game.addEntity(new Tile(this.game, 230, 436, 3, 0));
        // this.game.addEntity(new Tile(this.game, 230, 404, 3, 0));
        // this.game.addEntity(new Tile(this.game, 198, 436, 3, 0));
        // this.game.addEntity(new Tile(this.game, 166, 456, 3, 0));

        // this.game.addEntity(new Tile(this.game, 400, 250, 3, 0));
        // this.game.addEntity(new Tile(this.game, 400, 526, 3, 0));
        // this.game.addEntity(new Tile(this.game, 200, 600, 3, 0));
        // this.game.addEntity(new Tile(this.game, 270, 380, 3, 0));
        // this.game.addEntity(new Tile(this.game, 546, 380, 3, 0));
        // this.game.addEntity(new Tile(this.game, 500, 500, 9, 0));
        // this.game.addEntity(new Tile(this.game, 500, 532, 9, 1));

        // this.game.addEntity(new Tile(this.game, 500, 564, 9, 2));
        // this.game.addEntity(new Tile(this.game, 500, 596, 9, 3));

        // this.game.addEntity(new Tile(this.game, 532, 500, 10, 0));
        // this.game.addEntity(new Tile(this.game, 532, 532, 10, 1));
        // this.game.addEntity(new Tile(this.game, 532, 564, 10, 2));
        // this.game.addEntity(new Tile(this.game, 532, 596, 10, 0));
        // this.game.addEntity(new Tile(this.game, 70, 300, 0, 0));
        // this.game.addEntity(new Tile(this.game, 102, 300, 1, 0));
        // this.game.addEntity(new Tile(this.game, 134, 300, 2, 0));
        // this.game.addEntity(new Tile(this.game, 166, 300, 3, 0));
        // this.game.addEntity(new Tile(this.game, 300, 16, 3, 0));
        // this.game.addEntity(new Tile(this.game, 300, 64, 3, 0));
        // this.game.addEntity(new Tile(this.game, 300, 300, 3, 0));
        // this.game.addEntity(new Tile(this.game, 500, 64, 3, 0));
        // this.game.addEntity(new Tile(this.game, 300, 700, 3, 0));
        // this.game.addEntity(new Tile(this.game, 400, 250, 3, 0));
        // this.game.addEntity(new Tile(this.game, 400, 526, 3, 0));

        // this.game.addEntity(new Tile(this.game, 232, 596, 3, 2)); //this one is working
        // // this.game.addEntity(new Tile(this.game, 200, 596, 3, 2)); //this one is not working
        // this.game.addEntity(new Tile(this.game, 270, 380, 3, 0));
        // this.game.addEntity(new Tile(this.game, 546, 380, 3, 0));
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
