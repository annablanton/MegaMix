class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        
        this.megaman = new Megaman(game, 100, 500);

        // game.addEntity(new Gordo(game, 400, 380, 1, 0));
        // game.addEntity(new Gordo(game, 400, 380, 0, 1));
        // game.addEntity(new Gordo(game, 400, 380, -1, 0));
        // game.addEntity(new Gordo(game, 400, 380, 0, -1));
        // game.addEntity(new Wheelie(game, 400, 600));
        // game.addEntity(new ArmorKnight(game, 600, 300));
        // game.addEntity(new Bulldozer(game, 200, 200));
        // game.addEntity(new Met(game, 400, 16));
        // game.addEntity(new HammerBro(game, 500, 672));
        // game.addEntity(new Carock(game, 400, 64));
        // game.addEntity(new Barba(game, 600, 100));
        // game.addEntity(new BigBoo(game, 600, 600));
        
        // game.addEntity(new Mushroom(game, 800, 600, 1));
        // game.addEntity(new Mushroom(game, 900, 600, 0));
        game.addEntity(new HealthMeter(game, 975, 25));
        game.addEntity(new Pellet(game, 16, 16, Math.PI / 8));
        this.loadLevelOne();
        game.addEntity(this.megaman);
        game.addEntity(this);
        
    };

    clearEntities() {
        this.game.entities = [this];
    };

    loadLevelOne() {
        this.x = 0;
        for (var i =0 ; i< 50; i ++){
            this.game.addEntity(new Tile(this.game, 0+i*32,736,2,2)); 
        }
        for (var i =0 ; i< 50; i ++){
            this.game.addEntity(new Tile(this.game, 0+i*32,704,2,1)); 
        }
        for (var i =0 ; i< 50; i ++){
            this.game.addEntity(new Tile(this.game, 0+i*32,672,1,0)); 
        }

        this.game.addEntity(new Tile(this.game, 1000,570,3,2)); 
        this.game.addEntity(new Tile(this.game, 1032,570,3,2)); 
        this.game.addEntity(new Tile(this.game, 1064,570,3,2)); 


        for (var i =0 ; i< 50; i ++){
            this.game.addEntity(new Tile(this.game, 1800+i*32,736,1,3)); 
        }
        for (var i =0 ; i< 50; i ++){
            this.game.addEntity(new Tile(this.game, 1800+i*32,704,1,0)); 
        }
        for (var i =0 ; i< 50; i ++){
            this.game.addEntity(new Tile(this.game, 1800+i*32,672,3,0)); 
        }
        this.game.addEntity(new Gordo(this.game, 1700, 450, 1, 0));
        this.game.addEntity(new Gordo(this.game, 1800, 450, -1, 0));
        this.game.addEntity(new ArmorKnight(this.game, 1000, 600));
        this.game.addEntity(new Wheelie(this.game, 600, 550));
        this.game.addEntity(new Bulldozer(this.game, 2000, 543));
        this.game.addEntity(new Met(this.game, 2500, 543));
        this.game.addEntity(new Carock(this.game, 3000, 543));
        this.game.addEntity(new HammerBro(this.game, 3300, 543));
        this.game.addEntity(new Powerup(this.game, 400, 500));
        this.game.addEntity(new Mushroom(this.game, 300, 500, 0));

        this.game.addEntity(new Tile(this.game, 3400,704,3,0)); 
        for (var i =0 ; i< 30; i ++){
            this.game.addEntity(new Tile(this.game, 3400+i*32,736,3,0)); 
        }

        for(var i = 0 ; i < 3; i++){
            for(var j = 0 ; j < 30; j++){
                this.game.addEntity(new Tile(this.game, 3464+i*32, 608-j*32,3,3));
            }    
        }
        for(var i = 0 ; i < 4; i++){
            for(var j = 0 ; j < 30; j++){
                this.game.addEntity(new Tile(this.game, 4360+i*32, 736-j*32,0,3));
            }    
        }

        for(var i = 0 ; i < 3; i++){
            this.game.addEntity(new Tile(this.game, 4328-i*32,640,3,2)); 
            
        }

        for(var i = 0 ; i < 3; i++){
            this.game.addEntity(new Tile(this.game, 4100-i*32,600,0,0));    
        }
        for(var i = 0 ; i < 10; i++){
            this.game.addEntity(new Tile(this.game, 3900-i*32,590-i*32,0,0));    
        }
 
        for(var i = 0 ; i < 5; i++){
            this.game.addEntity(new Tile(this.game, 3750+i*32,270,0,0));    
        }

        for(var i = 0 ; i < 14; i++){
            this.game.addEntity(new Tile(this.game, 3910+i*32,270-i*32,9,0));    
        }

        for(var i = 0 ; i < 14; i++){
            this.game.addEntity(new Tile(this.game, 4488+i*32,-178,9,0));    
        }

        this.game.addEntity(new HammerBro(this.game, 4900, -240));
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;

        let midpoint_width = PARAMS.CANVAS_WIDTH/2 - 21;  //486;
        let midpoint_height = PARAMS.CANVAS_HEIGHT/2 - 12;
      

        this.x = this.megaman.x - midpoint_width;
        if(this.megaman.y < midpoint_height){
        this.y = this.megaman.y - midpoint_height;
        } 
        else{
            this.y = 0;
        }
    };

    draw(ctx) {
        if (PARAMS.DEBUG) {
        }
    };
};
