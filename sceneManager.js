class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.title = true; 
        this.stopmusic = false;

        ////this.megaman = new Megaman(game, 6000, 500);
        ////this.megaman = new Megaman(game, 100, 200);
        //this.megaman = new Megaman(game, 2600, -3900)
        game.addEntity(new HealthMeter(game, 975, 25));
        
        ////this.loadLevelOne(this.title);
        //this.loadLevelTwo();   
        //// this.loadTutorialLevel(); 
        //game.addEntity(this.megaman);
        game.addEntity(this);
    };

    clearEntities() {
        this.game.entities = [this];
    };


    loadLevelOne() {
        this.levelTitle = "Level 1";
        //this.title = title;
        // ASSET_MANAGER.pauseBackgroundMusic();
        // ASSET_MANAGER.playAsset("./sounds/background.mp3");
        this.x = 0;
        //background setting
        
        this.game.addEntity(new Background(this.game, -2818,-312));
        this.game.addEntity(new Background(this.game, -897,-312));
        this.game.addEntity(new Background(this.game, 1024,-312));
        this.game.addEntity(new Background(this.game, 2945,-312));
        this.game.addEntity(new Background(this.game, 4866,-312));
        this.game.addEntity(new Background(this.game, 6787,-312));
        this.game.addEntity(new Background(this.game, 8708,-312));
        this.game.addEntity(new Background(this.game, 10629,-312));

       
        this.game.addEntity(new Mushroom(this.game, 230,300,1))
        this.game.addEntity(new Powerup(this.game, -170,400))


        
        for (var i =0 ; i< 4; i ++){
            for(var j=0; j<4; j++){
            this.game.addEntity(new Tile(this.game, -254+i*32,512+j*32,9+i,6+j)); 
            }
        }
        for (var i =0 ; i< 4; i ++){
            for(var j=0; j<4; j++){
            this.game.addEntity(new Tile(this.game, -126+i*32,640+j*32,9+i,6+j)); 
            }
        }
        for (var i =0 ; i< 4; i ++){
            for(var j=0; j<4; j++){
            this.game.addEntity(new Tile(this.game, -126+i*32,512+j*32,9+i,6+j)); 
            }
        }
        for (var i =0 ; i< 4; i ++){
            for(var j=0; j<4; j++){
            this.game.addEntity(new Tile(this.game, -126+i*32,384+j*32,9+i,6+j)); 
            }
        }
        for (var i =0 ; i< 4; i ++){
            for(var j=0; j<4; j++){
            this.game.addEntity(new Tile(this.game, -126+i*32,256+j*32,9+i,6+j)); 
            }
        }

        //first land
        for (var i =0 ; i< 50; i ++){
            this.game.addEntity(new Tile(this.game, 0+i*32,736,2,2)); 
        }
        for (var i =0 ; i< 50; i ++){
            this.game.addEntity(new Tile(this.game, 0+i*32,704,2,1)); 
        }
        for (var i =0 ; i< 50; i ++){
            this.game.addEntity(new Tile(this.game, 0+i*32,672,1,0)); 
        }
        this.game.addEntity(new ArmorKnight(this.game, 1000, 200));
        this.game.addEntity(new ArmorKnight(this.game, 1150, 200));
        this.game.addEntity(new ArmorKnight(this.game, 1250, 200));
        // this.game.addEntity(new ArmorKnight(this.game, 1000, 200));
        // this.game.addEntity(new Wheelie(this.game, 400, 600));
        // this.game.addEntity(new ArmorKnight(this.game, 1000, 200));
        // this.game.addEntity(new Bulldozer(this.game, 1000, 200));
        // this.game.addEntity(new Met(this.game, 400, 16));
        // this.game.addEntity(new HammerBro(this.game, 500, 672));
        // this.game.addEntity(new Carock(this.game, 400, 64));




        for (var i = 0; i< 2; i++){
            this.game.addEntity(new Tile(this.game, 600+i*32,400,3,2)); 
        }

        this.game.addEntity(new Gordo(this.game, 632, 500, 0, -1));


        for (var i = 0; i< 2; i++){
            this.game.addEntity(new Tile(this.game, 200+i*32,400,3,2)); 
        }
        this.game.addEntity(new Gordo(this.game, 400, 400, 1, 0));

        this.game.addEntity(new Gordo(this.game, 232, 500, 0, 1));
        for (var i = 0; i< 5; i++){
            this.game.addEntity(new Tile(this.game, 1000+i*32,570,3,2)); 

        }
        this.game.addEntity(new Mushroom(this.game, 1100,300,1))
        this.game.addEntity(new Tile(this.game, 1600,640,0,0)); 
        this.game.addEntity(new Tile(this.game, 1768,640,0,0)); 

        
        //second land
        for (var i =0 ; i< 47; i ++){
            this.game.addEntity(new Tile(this.game, 1800+i*32,736,1,3)); 
        }
        for (var i =0 ; i< 38; i ++){
            this.game.addEntity(new Tile(this.game, 1800+i*32,704,1,0)); 
        }
        for (var i =0 ; i< 27; i ++){
            this.game.addEntity(new Tile(this.game, 1800+i*32,672,3,0)); 
        }

        this.game.addEntity(new Gordo(this.game, 1700, 450, 1, 0));
        this.game.addEntity(new Gordo(this.game, 1800, 450, -1, 0));
        this.game.addEntity(new ArmorKnight(this.game, 1000, 600));

        this.game.addEntity(new Bulldozer(this.game, 2000, 543));

        this.game.addEntity(new HammerBro(this.game, 500, 350));
        this.game.addEntity(new Mushroom(this.game, 400, 500,1));
        // this.game.addEntity(new Mushroom(this.game, 300, 500, 0));
        // this.game.addEntity(new HammerBroHammer(this.game, 450, 500, 0));
        this.game.addEntity(new Met(this.game, 2500, 543, 0));
        this.game.addEntity(new Carock(this.game, 2600, 543, this.megaman));
        this.game.addEntity(new HammerBro(this.game, 4500, -300));


        this.game.addEntity(new Wheelie(this.game, 4800, -200));


        this.game.addEntity(new Tile(this.game, 3240,704, 3,2)); 
        this.game.addEntity(new Tile(this.game, 3496,704, 3,2)); 

        this.game.addEntity(new Met(this.game, 3600, 0, 0));
        this.game.addEntity(new Met(this.game, 3700, 150, 1));
        this.game.addEntity(new Met(this.game, 3900, 350, 1));
        this.game.addEntity(new Met(this.game, 4000, 350, 0));
        this.game.addEntity(new Met(this.game, 4200, 350, 0));
        this.game.addEntity(new Met(this.game, 3600, 400, 1));
        this.game.addEntity(new Met(this.game, 3800, 500, 1));
        this.game.addEntity(new Met(this.game, 3800, 630, 0));
        this.game.addEntity(new Met(this.game, 3900, 630, 0));
        this.game.addEntity(new Met(this.game, 4100, 630, 0));



        for (var i =0 ; i< 30; i ++){
            this.game.addEntity(new Tile(this.game, 3400+i*32,736,3,0)); 
        }

        //left tower
        for(var i = 0 ; i < 3; i++){
            for(var j = 0 ; j < 15; j++){
                this.game.addEntity(new Tile(this.game, 3464+i*32, 608-j*32,3,3));
            }    
        }
        //right tower
        for(var i = 0 ; i < 4; i++){
            for(var j = 0 ; j < 18; j++){
                this.game.addEntity(new Tile(this.game, 4360+i*32, 736-j*32,0,3));
            }    
        }

        //second floor
        for(var i = 0 ; i < 19; i++){
            for(var j=0; j<2 ;j++){
                this.game.addEntity(new Tile(this.game, 3560+i*32,608-j*32,0,0));    

            }
        }
        this.game.addEntity(new Tile(this.game, 4168,640,0,0)); 

        //third floor
        for(var i = 0 ; i < 19; i++){
            for(var j=0; j<2 ;j++){
                this.game.addEntity(new Tile(this.game, 4328-i*32,480-j*32,0,0));    
            }
        }
        this.game.addEntity(new Tile(this.game, 3720, 480 ,0,0));   
        // this.game.addEntity(new Tile(this.game, 4072, 510 ,0,0));  

        //Fourth floor
        for(var i = 0 ; i < 19; i++){
            for(var j=0; j<2 ;j++){
                this.game.addEntity(new Tile(this.game, 3560+i*32, 352-j*32,3,2));    

            }
        }
        this.game.addEntity(new Tile(this.game, 4168,352,3,2)); 
        //fourth stairs 
        for(var i =0; i<4; i++){
            for(var j=0; j<4-i; j++){
                this.game.addEntity(new Tile(this.game, 3560+i*32, 288-j*32,3,2));    
            }
        }
        //fourth ceiling
        for(var i = 0 ; i < 15; i++){
            for(var j=0; j<2 ;j++){
                this.game.addEntity(new Tile(this.game, 4328-i*32,224-j*32,3,2));    
            }
        }
        //wall on fourth ceiling
        for(var i = 0 ; i < 15; i++){        
        this.game.addEntity(new Tile(this.game, 3880, 160-i*32,3,2));}
        // stepping stones
        for(var i = 0 ; i < 5; i++){
            this.game.addEntity(new Tile(this.game, 3432-i*96, 160,3,2));
        }
        this.game.addEntity(new Gordo(this.game, 3432, -40, -1, 0));
        this.game.addEntity(new Gordo(this.game, 3400, 0, 1, 0));
        this.game.addEntity(new Gordo(this.game, 3380, 60, -1, 0));
        this.game.addEntity(new Gordo(this.game, 3300, 25, 1, 0));
        this.game.addEntity(new Gordo(this.game, 3000, 45, -1, 0));

        this.game.addEntity(new HammerBro(this.game, 5500, -900));
        this.game.addEntity(new HammerBro(this.game, 5000, -900));
        //next stairs 
        for(var i =0; i<4; i++){
            for(var j=0; j<4-i; j++){
                this.game.addEntity(new Tile(this.game, 2824+i*32, 160-j*32,3,2));    
            }
        }

        //next stairs 
        for(var i =0; i<4; i++){
            for(var j=0; j<4-i; j++){
                this.game.addEntity(new Tile(this.game, 3048-i*32, 0-j*32,3,2));    
            }
        }
        for(var i=0; i<20; i++){
            this.game.addEntity(new Tile(this.game, 3080+i*32, -128,3,2));    

        }

        for(var i =0; i<4; i++){
            for(var j=0; j<3-i; j++){
                this.game.addEntity(new Tile(this.game, 3688-i*32, -224-j*32 ,3,2));    
            }
        }
        for(var i =0; i<5; i++){        
        this.game.addEntity(new Tile(this.game, 3718+i*32, -288 ,3,2));}    
        
        for(var i =0; i<50; i++){        
            this.game.addEntity(new Tile(this.game, 4480+i*32, 736 ,3,2));
        }    
        
        // Boss session preparation
        this.game.addEntity(new Tile(this.game, 4900,288,11,0))
        this.game.addEntity(new Tile(this.game, 4932,256,11,0))
        this.game.addEntity(new Tile(this.game, 4964,224,11,0))
        this.game.addEntity(new Tile(this.game, 5000,160,11,0))
        this.game.addEntity(new Tile(this.game, 5352,160,11,0))
        for(var i = 0; i < 12; i++) {
            this.game.addEntity(new Tile(this.game, 5000+i*32, 192,12 + i%4,0))
        }
        for(var i = 0; i<4; i++){
            this.game.addEntity(new Mushroom(this.game, 5032+i*64, 100, 0));
        }

        for(var i = 0; i<16; i++){
            this.game.addEntity(new Tile(this.game, 5352, 704- i*32, 11, 0))
        }
        this.game.addEntity(new Wheelie(this.game, 5310,-100))

        // Bosses
        var barba = new Barba(this.game, this.megaman, [6272, 6528, 6784, 7040, 7296], [600, 300]);
        this.game.addEntity(barba);
        //var bb = new BigBoo(this.game, 6900, 200, this.megaman);
        //this.game.addEntity(bb);
        this.game.addEntity(new Tile(this.game, 5600,704,11,0))
        this.game.addEntity(new Tile(this.game, 5600,672,11,0))
        this.game.addEntity(new Bulldozer(this.game, 5800, 600))
        this.game.addEntity(new Tile(this.game, 6000,704,11,0))
        this.game.addEntity(new Tile(this.game, 6000,672,11,0))

        for(var i=0; i<6; i++){
            this.game.addEntity(new Tile(this.game, 6112+i*256,736, 12,0))
            this.game.addEntity(new Tile(this.game, 6144+i*256,736, 13,0))
            this.game.addEntity(new Tile(this.game, 6176 + i * 256, 736, 14, 0))
            this.game.addEntity(new Tile(this.game, 6208 + i * 256, 736, 14, 0))
            this.game.addEntity(new Tile(this.game, 6240 + i * 256, 736, 15, 0))
        }
        for(var i=0; i<6; i++){
            this.game.addEntity(new Tile(this.game, 6144 + i * 256, 480, 12, 1, true))
            this.game.addEntity(new Tile(this.game, 6176 + i * 256, 480, 13, 1, true))
            this.game.addEntity(new Tile(this.game, 6208 + i * 256, 480, 15, 1, true))
        }

        for(var i=0; i<5; i++){
            this.game.addEntity(new Tile(this.game, 6272 + i * 256, 224, 12, 0, true))
            this.game.addEntity(new Tile(this.game, 6304 + i * 256, 224, 14, 0, true))
            this.game.addEntity(new Tile(this.game, 6336 + i * 256, 224, 15, 0, true))
        }

        for (var i = 0; i < 7; i++) {
            this.game.addEntity(new Tile(this.game, 6240 + 5 * 256, 576 - 4 * i * 32, 16, 3));
            this.game.addEntity(new Tile(this.game, 6240 + 5 * 256, 544 - 4 * i * 32, 16, 2));
            this.game.addEntity(new Tile(this.game, 6240 + 5 * 256, 512 - 4 * i * 32, 16, 1));
            this.game.addEntity(new Tile(this.game, 6240 + 5 * 256, 480 - 4 * i * 32, 16, 0));
        }

        for (var i = 0; i < 7; i++) {
            this.game.addEntity(new Tile(this.game, 6112, 576 - 4 * i * 32, 16, 3));
            this.game.addEntity(new Tile(this.game, 6112, 544 - 4 * i * 32, 16, 2));
            this.game.addEntity(new Tile(this.game, 6112, 512 - 4 * i * 32, 16, 1));
            this.game.addEntity(new Tile(this.game, 6112, 480 - 4 * i * 32, 16, 0));
        }

        for (var i = 0; i < 10; i++) {
            this.game.addEntity(new Tile(this.game, 6144 + 4 * i * 32, -288, 12, 5));
            this.game.addEntity(new Tile(this.game, 6176 + 4 * i * 32, -288, 13, 5));
            this.game.addEntity(new Tile(this.game, 6208 + 4 * i * 32, -288, 14, 5));
            this.game.addEntity(new Tile(this.game, 6240 + 4 * i * 32, -288, 15, 5));
        }

        this.game.addEntity(new Tile(this.game, 7424, -288, 12, 5));
        this.game.addEntity(new Tile(this.game, 7456, -288, 13, 5));
        this.game.addEntity(new Tile(this.game, 7488, -288, 15, 5));

        this.game.addEntity(new BossTrigger(this.game, 6208, -256, 32 * 39, 32 * 31, barba, [{ x: 6112, y: 608, length: 4 }, {x: 7520, y: 608, length: 4}]));
        //this.game.addEntity(new BossTrigger(this.game, 6208, -256, 32 * 39, 32 * 31, bb, [{ x: 6112, y: 608 }, { x: 7520, y: 608 }]));


        for (var i = 0; i < 40; i++) {
            this.game.addEntity(new Tile(this.game, 7552 + i * 32, 736, 3, 2));
        }

        this.game.addEntity(new Tower(this.game, 7936, 428.5));

        this.game.addEntity(this.megaman);
        this.game.addEntity(this);


    };
    loadLevelTwo(){
        this.levelTitle = "Level 2";
        this.x = 0;

        //left wall at the beginning area
        for (var i =0 ; i< 24; i ++){
            this.game.addEntity(new Tile(this.game, -32,736-i*32,12,5)); 
            this.game.addNonCollidableEntity(new Tile(this.game, -64,736-i*32,13,5)); 
            this.game.addNonCollidableEntity(new Tile(this.game, -96,736-i*32,14,5)); 
            this.game.addNonCollidableEntity(new Tile(this.game, -128,736-i*32,15,5)); 
            // this.game.addEntity(new Tile(this.game, -160,736-i*32,12,5)); 
            // this.game.addEntity(new Tile(this.game, -192,736-i*32,13,5)); 
            // this.game.addEntity(new Tile(this.game, -224,736-i*32,14,5)); 
            // this.game.addEntity(new Tile(this.game, -256,736-i*32,15,5)); 
            // this.game.addEntity(new Tile(this.game, -288,736-i*32,12,5)); 
            // this.game.addEntity(new Tile(this.game, -320,736-i*32,13,5)); 
            // this.game.addEntity(new Tile(this.game, -352,736-i*32,14,5)); 
            // this.game.addEntity(new Tile(this.game, -384,736-i*32,15,5)); 
        }

        //background
        this.game.addNonCollidableEntity(new Background2(this.game, 0,0));
        this.game.addNonCollidableEntity(new Background2(this.game, 0,195));
        this.game.addNonCollidableEntity(new Background2(this.game, 0,390));
        this.game.addNonCollidableEntity(new Background2(this.game, 0,585));
        this.game.addNonCollidableEntity(new Background2(this.game, 626,0));
        this.game.addNonCollidableEntity(new Background2(this.game, 626,195));
        this.game.addNonCollidableEntity(new Background2(this.game, 626,390));
        this.game.addNonCollidableEntity(new Background2(this.game, 626,585));
        this.game.addNonCollidableEntity(new Background2(this.game, 1252,0));
        this.game.addNonCollidableEntity(new Background2(this.game, 1252,195));
        this.game.addNonCollidableEntity(new Background2(this.game, 1252,390));
        this.game.addNonCollidableEntity(new Background2(this.game, 1252,585));
        this.game.addNonCollidableEntity(new Background2(this.game, 1878,0));
        this.game.addNonCollidableEntity(new Background2(this.game, 1878,195));
        this.game.addNonCollidableEntity(new Background2(this.game, 1878,390));
        this.game.addNonCollidableEntity(new Background2(this.game, 1878,585));
        for(var i=0; i<22; i++){
            this.game.addNonCollidableEntity(new Background2(this.game, 1252,-195-i*195));
            this.game.addNonCollidableEntity(new Background2(this.game, 1878,-195-i*195));
        }

        
        // this.game.addEntity(new Background2(this.game, 626,780));
        //first bottom
        for (var i =0 ; i< 19; i ++){
            this.game.addEntity(new Tile(this.game, 0+i*32*4,736,12,5)); 
            this.game.addEntity(new Tile(this.game, 32+i*32*4,736,13,5)); 
            this.game.addEntity(new Tile(this.game, 64+i*32*4,736,14,5)); 
            this.game.addEntity(new Tile(this.game, 96+i*32*4,736,15,5)); 
        }
        this.game.addEntity(new Tile(this.game, 2432,736,12,5)); 
        this.game.addEntity(new Tile(this.game, 2464,736,15,5)); 
 


        //first ceiling
//        for (var i =0 ; i< 11; i ++){
//            this.game.addNonCollidableEntity(new Tile(this.game, 0+i*32*4,0,12,5)); 
//            this.game.addNonCollidableEntity(new Tile(this.game, 32+i*32*4,0,13,5)); 
//            this.game.addNonCollidableEntity(new Tile(this.game, 64+i*32*4,0,14,5)); 
//            this.game.addNonCollidableEntity(new Tile(this.game, 96+i*32*4,0,15,5)); 
//            this.game.addEntity(new Tile(this.game, 0+i*32*4,32,12,5)); 
//            this.game.addEntity(new Tile(this.game, 32+i*32*4,32,13,5)); 
//            this.game.addEntity(new Tile(this.game, 64+i*32*4,32,14,5)); 
//            this.game.addEntity(new Tile(this.game, 96+i*32*4,32,15,5)); 
        for (var i =0 ; i< 10; i ++){
            this.game.addEntity(new Tile(this.game, 0+i*32*4,0,12,5)); 
            this.game.addEntity(new Tile(this.game, 32+i*32*4,0,13,5)); 
            this.game.addEntity(new Tile(this.game, 64+i*32*4,0,14,5)); 
            this.game.addEntity(new Tile(this.game, 96+i*32*4,0,15,5)); 
            // this.game.addEntity(new Tile(this.game, 0+i*32*4,32,12,5)); 
            // this.game.addEntity(new Tile(this.game, 32+i*32*4,32,13,5)); 
            // this.game.addEntity(new Tile(this.game, 64+i*32*4,32,14,5)); 
            // this.game.addEntity(new Tile(this.game, 96+i*32*4,32,15,5)); 
        }
        //last tile 1504

        //right tower

//        for (var j = 0; j < 35; j++) {
//            this.game.addEntity(new Tile(this.game, 2304, 608 - j * 128, 16, 0));
//            this.game.addEntity(new Tile(this.game, 2304, 640 - j * 128, 16, 1));
//            this.game.addEntity(new Tile(this.game, 2304, 672 - j * 128, 16, 2));
//            this.game.addEntity(new Tile(this.game, 2304, 704 - j * 128, 16, 3));
//            this.game.addEntity(new Tile(this.game, 2304, 736 - j * 128, 16, 4));   
//        }

//        for (var i = 0; i < 14; i++) {
//            this.game.addEntity(new Tile(this.game, 2336 + i * 32, -3744, 16, 0));
//            this.game.addEntity(new Tile(this.game, 2336 + i * 32, -3744, 16, 1));
//            this.game.addEntity(new Tile(this.game, 2336 + i * 32, -3744, 16, 2));
//            this.game.addEntity(new Tile(this.game, 2336 + i * 32, -3744, 16, 3));
//            this.game.addEntity(new Tile(this.game, 2336 + i * 32, -3744, 16, 4));   
//        }
//        for (var i =0 ; i< 13; i ++){
//            for(var j = 0; j<35; j++){
//                this.game.addNonCollidableEntity(new Tile(this.game, 2336+i*32,608-j*128,16,0)); 
//                this.game.addNonCollidableEntity(new Tile(this.game, 2336+i*32,640-j*128,16,1)); 
//                this.game.addNonCollidableEntity(new Tile(this.game, 2336+i*32,672-j*128,16,2));
//                this.game.addNonCollidableEntity(new Tile(this.game, 2336+i*32,704-j*128,16,3));
//                this.game.addNonCollidableEntity(new Tile(this.game, 2336+i*32,736-j*128,16,4));   
//            }
//        }
//        //left tower

//        for (var j = 0; j < 33; j++) {
//            this.game.addEntity(new Tile(this.game, 1376, -160 - j * 128, 16, 0));
//            this.game.addEntity(new Tile(this.game, 1376, -128 - j * 128, 16, 1));
//            this.game.addEntity(new Tile(this.game, 1376 , -96 - j * 128, 16, 2));
//            this.game.addEntity(new Tile(this.game, 1376, -64 - j * 128, 16, 3));
//            this.game.addEntity(new Tile(this.game, 1376, -32 - j * 128, 16, 4)); 
//        }
//        for (var i =0 ; i< 13; i ++){
//            for(var j = 0; j<33; j++){
//                this.game.addNonCollidableEntity(new Tile(this.game, 960+i*32,-160-j*128,16,0)); 
//                this.game.addNonCollidableEntity(new Tile(this.game, 960+i*32,-128-j*128,16,1));                 
//                this.game.addNonCollidableEntity(new Tile(this.game, 960+i*32,-96-j*128,16,2)); 
//                this.game.addNonCollidableEntity(new Tile(this.game, 960+i*32,-64-j*128,16,3)); 
//                this.game.addNonCollidableEntity(new Tile(this.game, 960+i*32,-32-j*128,16,4)); 
        for (var i =0 ; i< 1; i ++){
            for(var j = 0; j<35; j++){
                this.game.addEntity(new Tile(this.game, 2496+i*32,608-j*128,16,0)); 
                this.game.addEntity(new Tile(this.game, 2496+i*32,640-j*128,16,1)); 
                this.game.addEntity(new Tile(this.game, 2496+i*32,672-j*128,16,2));
                this.game.addEntity(new Tile(this.game, 2496+i*32,704-j*128,16,3));
                this.game.addEntity(new Tile(this.game, 2496+i*32,736-j*128,16,4));   
            }
        }
        //left tower
        for (var i =0 ; i< 1; i ++){
            for(var j = 0; j<33; j++){
                this.game.addEntity(new Tile(this.game, 928+320+i*32,-160-j*128,16,0)); 
                this.game.addEntity(new Tile(this.game, 928+320+i*32,-128-j*128,16,1));                 
                this.game.addEntity(new Tile(this.game, 928+320+i*32,-96-j*128,16,2)); 
                this.game.addEntity(new Tile(this.game, 928+320+i*32,-64-j*128,16,3)); 
                this.game.addEntity(new Tile(this.game, 928+320+i*32,-32-j*128,16,4)); 
            }
        }
        //1504-2272   // 1280-2464
        //stair1-1
        for(var i =0; i<2; i++){
            this.game.addEntity(new Tile(this.game, 1504+i*128,576,16,6)); 
            this.game.addEntity(new Tile(this.game, 1536+i*128,576,17,6)); 
            this.game.addEntity(new Tile(this.game, 1568+i*128,576,18,6)); 
            this.game.addEntity(new Tile(this.game, 1600+i*128,576,19,6)); 
        }
        //stair 1-2
        for(var i =0; i<2; i++){
            this.game.addEntity(new Tile(this.game, 2016+i*128,576,16,6)); 
            this.game.addEntity(new Tile(this.game, 2048+i*128,576,17,6)); 
            this.game.addEntity(new Tile(this.game, 2080+i*128,576,18,6)); 
            this.game.addEntity(new Tile(this.game, 2112+i*128,576,19,6)); 
        }

        //stair2
        for(var i =0; i<2; i++){
            this.game.addEntity(new Tile(this.game, 1760+i*128,384,16,6)); 
            this.game.addEntity(new Tile(this.game, 1792+i*128,384,17,6)); 
            this.game.addEntity(new Tile(this.game, 1824+i*128,384,18,6)); 
            this.game.addEntity(new Tile(this.game, 1856+i*128,384,19,6)); 
        }

        //stair3-1
        for(var i =0; i<2; i++){
            this.game.addEntity(new Tile(this.game, 2016+i*128,192,16,6)); 
            this.game.addEntity(new Tile(this.game, 2048+i*128,192,17,6)); 
            this.game.addEntity(new Tile(this.game, 2080+i*128,192,18,6)); 
            this.game.addEntity(new Tile(this.game, 2112+i*128,192,19,6)); 
        }
        //stair3-2
        for(var i =0; i<2; i++){
            this.game.addEntity(new Tile(this.game, 1504+i*128,192,16,6)); 
            this.game.addEntity(new Tile(this.game, 1536+i*128,192,17,6)); 
            this.game.addEntity(new Tile(this.game, 1568+i*128,192,18,6)); 
            this.game.addEntity(new Tile(this.game, 1600+i*128,192,19,6)); 
        }
        //stair4 //add power
        for(var i =0; i<2; i++){
            this.game.addEntity(new Tile(this.game, 1280+i*128,32,16,6)); 
            this.game.addEntity(new Tile(this.game, 1312+i*128,32,17,6)); 
            this.game.addEntity(new Tile(this.game, 1344+i*128,32,18,6)); 
            this.game.addEntity(new Tile(this.game, 1376+i*128,32,19,6)); 
        }
        //add power up
        this.game.addEntity(new Mushroom(this.game, 1312, -100,0))
        this.game.addEntity(new Mushroom(this.game, 1366, -100,1))
        this.game.addEntity(new Mushroom(this.game, 1428, -100,0))
        this.game.addEntity(new Powerup(this.game, 2464,-160))
        this.game.addEntity(new Tile(this.game, 2464,-64,19,6)); 
        
        //1280-2048
       //odd floors over the stairs
        for(var i =0; i<6; i++){
            for(var j=0; j<4; j++){
                this.game.addEntity(new Tile(this.game, 1280+i*128,-96-j*512,16,6)); 
                this.game.addEntity(new Tile(this.game, 1312+i*128,-96-j*512,17,6)); 
                this.game.addEntity(new Tile(this.game, 1344+i*128,-96-j*512,18,6)); 
                this.game.addEntity(new Tile(this.game, 1376+i*128,-96-j*512,19,6)); 
                this.game.addEntity(new Tile(this.game, 2048,-128-j*512,19,6)); 
                this.game.addEntity(new Tile(this.game, 2048,-160-j*512,19,6));     
                // this.game.addEntity(new Tile(this.game, 1408+i*128,-96-j*512,16,6)); 
                // this.game.addEntity(new Tile(this.game, 1440+i*128,-96-j*512,17,6)); 
                // this.game.addEntity(new Tile(this.game, 1472+i*128,-96-j*512,18,6)); 
                // this.game.addEntity(new Tile(this.game, 1504+i*128,-96-j*512,19,6)); 
                // this.game.addEntity(new Tile(this.game, 2048,-128-j*512,19,6)); 
                // this.game.addEntity(new Tile(this.game, 2048,-160-j*512,19,6));     
            }
        }
        //1824-2464
        //even floors over the stairs
        for(var i =0; i<5; i++){
            for(var j=0; j<4; j++){
                // this.game.addEntity(new Tile(this.game, 2272-i*128,-352-j*512,16,6)); 
                // this.game.addEntity(new Tile(this.game, 2240-i*128,-352-j*512,17,6)); 
                // this.game.addEntity(new Tile(this.game, 2208-i*128,-352-j*512,18,6)); 
                // this.game.addEntity(new Tile(this.game, 2176-i*128,-352-j*512,19,6)); 
                // this.game.addEntity(new Tile(this.game, 1632,-384-j*512,19,6)); 
                // this.game.addEntity(new Tile(this.game, 1632,-416-j*512,19,6));     
                this.game.addEntity(new Tile(this.game, 2464-i*128,-352-j*512,16,6)); 
                this.game.addEntity(new Tile(this.game, 2432-i*128,-352-j*512,17,6)); 
                this.game.addEntity(new Tile(this.game, 2400-i*128,-352-j*512,18,6)); 
                this.game.addEntity(new Tile(this.game, 2368-i*128,-352-j*512,19,6)); 
                this.game.addEntity(new Tile(this.game, 1824,-384-j*512,19,6)); 
                this.game.addEntity(new Tile(this.game, 1824,-416-j*512,19,6));     


            }
        }

        for(var i =0; i<2; i++){
            for(var j=0; j<3; j++){
                this.game.addEntity(new Tile(this.game, 2272,-2272-j*512,16,6));     
                this.game.addEntity(new Tile(this.game, 2240-i*128,-2240-j*512,16,6));     
                this.game.addEntity(new Tile(this.game, 2208-i*128,-2240-j*512,17,6));     
                this.game.addEntity(new Tile(this.game, 2176-i*128,-2240-j*512,18,6));     
                this.game.addEntity(new Tile(this.game, 2144-i*128,-2240-j*512,19,6));
                this.game.addEntity(new Tile(this.game, 1984,-2272-j*512,16,6));          
            }
        }

        for(var i =0; i<2; i++){
            for(var j=0; j<3; j++){
            this.game.addEntity(new Tile(this.game, 1504,-2528-j*512,16,6));     
            this.game.addEntity(new Tile(this.game, 1536+i*128,-2496-j*512,16,6));     
            this.game.addEntity(new Tile(this.game, 1568+i*128,-2496-j*512,17,6));     
            this.game.addEntity(new Tile(this.game, 1600+i*128,-2496-j*512,18,6));     
            this.game.addEntity(new Tile(this.game, 1632+i*128,-2496-j*512,19,6));
            this.game.addEntity(new Tile(this.game, 1792,-2528-j*512,16,6));          
            }
        }      
        //last steps before boss stage
        this.game.addEntity(new Tile(this.game, 1920,-3670,16,6));          
        this.game.addEntity(new Tile(this.game, 1952,-3670,16,6));       
        this.game.addEntity(new Tile(this.game, 1984,-3670,16,6));

        this.game.addEntity(new Tile(this.game, 2112,-3670,16,6));          
        this.game.addEntity(new Tile(this.game, 2144,-3670,16,6));  
        this.game.addEntity(new Tile(this.game, 2176,-3670,16,6));

        this.game.addEntity(new Tile(this.game, 2304,-3670,16,6));          
        this.game.addEntity(new Tile(this.game, 2336,-3670,16,6));  
        this.game.addEntity(new Tile(this.game, 2368,-3670,16,6));

        //last ceiling
        for (var i =0 ; i< 22; i ++){
            this.game.addEntity(new Tile(this.game, 1248+i*32*4,-4290,12,5)); 
            this.game.addEntity(new Tile(this.game, 1280+i*32*4,-4290,13,5)); 
            this.game.addEntity(new Tile(this.game, 1312+i*32*4,-4290,14,5)); 
            this.game.addEntity(new Tile(this.game, 1344+i*32*4,-4290,15,5)); 
            // this.game.addEntity(new Tile(this.game, 1408+i*32*4,-4268,12,5)); 
            // this.game.addEntity(new Tile(this.game, 1440+i*32*4,-4268,13,5)); 
            // this.game.addEntity(new Tile(this.game, 1472+i*32*4,-4268,14,5)); 
            // this.game.addEntity(new Tile(this.game, 1504+i*32*4, -4268,15,5)); 
        }

        //2720 //-4960
        for(var i=0; i<7; i++){
            this.game.addEntity(new Tile(this.game, 2528+i*32, -3744,12,1));
        }
        //boss stairs
        for(var i=0; i<5; i++){
                this.game.addEntity(new Tile(this.game, 2752+i*64, -3744+i*64,19,1));
                this.game.addEntity(new Tile(this.game, 2752+i*64, -3712+i*64,19,3));  
                this.game.addEntity(new Tile(this.game, 2784+i*64, -3712+i*64,19,1));
                this.game.addEntity(new Tile(this.game, 2784+i*64, -3680+i*64,19,3));  
        }
        //boss floor
        for(var i=0; i<30; i++){
            this.game.addEntity(new Tile(this.game, 3072+i*32, -3424,19,1));  
            this.game.addEntity(new Tile(this.game, 3072+i*32, -3392,19,3));      
        }
        //boss wall
        for(var i=0; i<9;i++){
            this.game.addEntity(new Tile(this.game, 4032+i*32, -3456-i*96,19,1));
            this.game.addEntity(new Tile(this.game, 4032+i*32, -3424-i*96,19,2));
            this.game.addEntity(new Tile(this.game, 4032+i*32, -3392-i*96,19,3));
        }

        var bb = new BigBoo(this.game, 3800, -3800, this.megaman);
        this.game.addEntity(bb);

        this.game.addEntity(new BossTrigger(this.game, 3136, -4236, 896, 800, bb, [{ x: 3042, y: -4236, length: 24 }, { x: 4096, y: -4268, length: 1 }, { x: 4128, y: -4268, length: 1 },
            { x: 4160, y: -4268, length: 1 }, { x: 4192, y: -4268, length: 1 }, { x: 4224, y: -4268, length: 1 }, { x: 4256, y: -4268, length: 1 }, { x: 4288, y: -4268, length: 1 }]));

        for(var i=0; i<4;i++){
            this.game.addEntity(new Tile(this.game, 3072+i*256, -4064,17,0));
            this.game.addEntity(new Tile(this.game, 3104+i*256, -4064,17,0));
            this.game.addEntity(new Tile(this.game, 3136+i*256, -4064,17,0));
        }  
        for(var i=0; i<4;i++){
            this.game.addEntity(new Tile(this.game, 3200+i*256, -3808,17,0));
            this.game.addEntity(new Tile(this.game, 3232+i*256, -3808,17,0));
            this.game.addEntity(new Tile(this.game, 3264+i*256, -3808,17,0));
        } 

        //adding Enemies
        
        this.game.addEntity(new ArmorKnight(this.game, 700, 600));
        this.game.addEntity(new ArmorKnight(this.game, 1100, 600));
        this.game.addEntity(new ArmorKnight(this.game, 1500, 600));
        this.game.addEntity(new Wheelie(this.game, 2000, 600));
        this.game.addEntity(new Gordo(this.game, 500, 450, 0, -1));
        this.game.addEntity(new Gordo(this.game, 500, 300, 0, 1));
        this.game.addEntity(new Gordo(this.game, 750, 220, 0, -1));
        this.game.addEntity(new Gordo(this.game, 750, 320, 0, 1));
        this.game.addEntity(new Gordo(this.game, 1000, 500, 0, -1));
        this.game.addEntity(new Gordo(this.game, 1000, 550, 0, 1));
        this.game.addEntity(new Gordo(this.game, 1200, 500, 0, -1));
        this.game.addEntity(new Gordo(this.game, 1200, 550, 0, 1));
        this.game.addEntity(new Gordo(this.game, 1800, 500, 0, -1));
        this.game.addEntity(new Gordo(this.game, 1900, 550, 0, 1));

        //1280-2048
        //1824-2464
        this.game.addEntity(new Met(this.game, 1650, 64,0));
        this.game.addEntity(new Met(this.game, 2100, 64,0));
        this.game.addEntity(new Met(this.game, 1650, 400,0));
        this.game.addEntity(new Met(this.game, 2100, 400,0));
        this.game.addEntity(new Met(this.game, 1350, -275, 0));
        this.game.addEntity(new Met(this.game, 1500, -275, 0));
        this.game.addEntity(new Met(this.game, 1650, -275, 0));
        this.game.addEntity(new Met(this.game, 1800, -275, 0));
        this.game.addEntity(new Carock(this.game, 1900, -275, this.megaman));

        
        this.game.addEntity(new HammerBro(this.game, 1900, -500));
        this.game.addEntity(new HammerBro(this.game, 2050, -500));
        this.game.addEntity(new HammerBro(this.game, 2200, -500));
        this.game.addEntity(new HammerBro(this.game, 2350, -500));
        this.game.addEntity(new Carock(this.game, 2450, -500, this.megaman));


        this.game.addEntity(new Bulldozer(this.game, 1350, -775));
        this.game.addEntity(new Bulldozer(this.game, 1800, -775));
        this.game.addEntity(new Carock(this.game, 1950, -775, this.megaman));
       
        this.game.addEntity(new Wheelie(this.game, 2200, -1050));
        this.game.addEntity(new Wheelie(this.game, 2450, -1050));

        this.game.addEntity(new Met(this.game, 1350, -1325, 0));
        this.game.addEntity(new Bulldozer(this.game, 1650, -1325));
        this.game.addEntity(new Met(this.game, 1800, -1325, 0));

        this.game.addEntity(new Carock(this.game, 2000, -1650, this.megaman));
        this.game.addEntity(new Carock(this.game, 2400, -1650, this.megaman));

        // this.game.addEntity(new ArmorKnight(this.game, 1350, -1900));
        // this.game.addEntity(new ArmorKnight(this.game, 1900, -1900)); 
        for(var i=0; i<4; i++){
            this.game.addEntity(new Gordo(this.game, 1450, -1900-i*300, 0, 1));
            this.game.addEntity(new Gordo(this.game, 1450, -2200-i*300, 0, -1));
            this.game.addEntity(new Gordo(this.game, 2400, -2200-i*300, 0, 1));
            this.game.addEntity(new Gordo(this.game, 2400, -2400-i*300, 0, -1));
        }
        //2208 | -2800 -512-512
        //1600|2496-512-512-512

        this.game.addEntity(new Met(this.game, 2208, -2300, 0));
        this.game.addEntity(new Met(this.game, 2208, -3000, 0));
        this.game.addEntity(new Met(this.game, 2208, -3312, 0));
        this.game.addEntity(new Met(this.game, 1600, -3040, 0));
        this.game.addEntity(new Met(this.game, 1600, -3552, 0));
        this.game.addEntity(new Met(this.game, 1600, -4064, 0));
        this.game.addEntity(new Mushroom(this.game, 2100, -2300,0))
        this.game.addEntity(new Mushroom(this.game, 1700, -3300,0))
        this.game.addEntity(new Mushroom(this.game, 2100, -3900,0))
        this.game.addEntity(new Mushroom(this.game, 2600, -4350,0))
        this.game.addEntity(new Mushroom(this.game, 3200, -4350, 0))
        this.game.addEntity(this.megaman);
        this.game.addEntity(this);

    };

    loadTutorialLevel() {
        this.levelTitle = "Tutorial";
        this.game.addEntity(new Background(this.game, -2818,-312));
        this.game.addEntity(new Background(this.game, -897,-312));
        this.game.addEntity(new Background(this.game, 1024,-312));
        this.game.addEntity(new Background(this.game, 2945,-312));
        this.game.addEntity(new Background(this.game, 4866,-312));
        this.game.addEntity(new Background(this.game, 6787,-312));
        this.game.addEntity(new Background(this.game, 8708,-312));
        this.game.addEntity(new Background(this.game, 10629,-312));
        this.tutorial = true;
        // Floor
        for (var i =0 ; i< 12; i ++){
            this.game.addEntity(new Tile(this.game, 0+i*32*4,736,9,1)); 
            this.game.addEntity(new Tile(this.game, 32+i*32*4,736,10,1)); 
            this.game.addEntity(new Tile(this.game, 64+i*32*4,736,9,1)); 
            this.game.addEntity(new Tile(this.game, 96+i*32*4,736,10,1)); 
            this.game.addEntity(new Tile(this.game, 0+i*32*4,704,9,0));  
            this.game.addEntity(new Tile(this.game, 32+i*32*4,704,10,0)); 
            this.game.addEntity(new Tile(this.game, 64+i*32*4,704,9,0));   
            this.game.addEntity(new Tile(this.game, 96+i*32*4,704,10,0)); 
        }

        for (var i =14 ; i< 45; i ++){
            this.game.addEntity(new Tile(this.game, 0+i*32*4,736,9,1)); 
            this.game.addEntity(new Tile(this.game, 32+i*32*4,736,10,1)); 
            this.game.addEntity(new Tile(this.game, 64+i*32*4,736,9,1)); 
            this.game.addEntity(new Tile(this.game, 96+i*32*4,736,10,1)); 
            this.game.addEntity(new Tile(this.game, 0+i*32*4,704,9,0));  
            this.game.addEntity(new Tile(this.game, 32+i*32*4,704,10,0)); 
            this.game.addEntity(new Tile(this.game, 64+i*32*4,704,9,0));   
            this.game.addEntity(new Tile(this.game, 96+i*32*4,704,10,0)); 
        }

        // Jump obstacle
        for (var i = 0; i < 2; i++) {
            this.game.addEntity(new Tile(this.game, 20 * 32 + i * 32, 672, 6 + i, 2))
            this.game.addEntity(new Tile(this.game, 20 * 32 + i * 32, 640, 6 + i, 1))
            this.game.addEntity(new Tile(this.game, 20 * 32 + i * 32, 608, 6 + i, 0))
        }

        // Grapping hook obstacle
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 11; j++) {
                this.game.addEntity(new Tile(this.game, 125 * 32 + i * 32, 672 - j * 32, 6 + i, 2 + j%2))
                this.game.addEntity(new Tile(this.game, 125 * 32 + i * 32, 640 - j * 32, 6 + i, 1 + j%2))
            } 
            this.game.addEntity(new Tile(this.game, 125 * 32 + i * 32, 288, 6 + i, 0))
        }

        this.game.addEntity(new Wheelie(this.game, 80 * 32, 640));
        this.game.addEntity(this.megaman);
        this.game.addEntity(this);


    }

    updateAudio(){
        var mute=document.getElementById("mute").checked;
        var volume=document.getElementById("volume").value;
        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    }

    update() {
        
        PARAMS.DEBUG = document.getElementById("debug").checked;

        this.updateAudio();
        
        let midpoint_width = PARAMS.CANVAS_WIDTH/2 - 21;  //486;
        let midpoint_height = PARAMS.CANVAS_HEIGHT/2 - 12;
      
        if(this.title && this.game.space) {
            this.title = false;
            console.log("level start");
            //this.megaman = new Megaman(this.game, 6000, 500);
            this.megaman = new Megaman(this.game, 100, 200);
            //this.megaman = new Megaman(this.game, 2600, -3900);
            this.loadLevelOne();
            //this.loadLevelTwo();
            // this.loadTutorialLevel();
        }

        if (!this.title) {
            this.x = this.megaman.x - midpoint_width;
            if (this.megaman.y < midpoint_height) {
                this.y = this.megaman.y - midpoint_height;
            }
            else {
                this.y = 0;
            }
        }
    };

    draw(ctx) {
        if(this.tutorial) {
            ctx.fillStyle = "Black";
            ctx.font = 20 + 'px "Press Start 2P"';
            ctx.fillText("Press WASD to move", -this.game.camera.x, 300 - this.game.camera.y);

            ctx.fillText("Press space to jump", -this.game.camera.x + 500, 500 - this.game.camera.y);
            ctx.fillText("↓", -this.game.camera.x + 660, 600 - this.game.camera.y);

            ctx.fillText("Sliding can increase the speed", -this.game.camera.x + 1150, 400 - this.game.camera.y);
            ctx.fillText("which make you jump further!!", -this.game.camera.x + 1150, 450 - this.game.camera.y);
            
            ctx.fillText("Use the cursor to aim,", -this.game.camera.x + 2050, 480 - this.game.camera.y);
            ctx.fillText("left click to shoot pellets", -this.game.camera.x + 2050, 530 - this.game.camera.y);
            ctx.fillText("Press Q to switch weapon mode", -this.game.camera.x + 2050, 580 - this.game.camera.y);

            ctx.fillText("Use the cursor to aim,", -this.game.camera.x + 2950, 280 - this.game.camera.y);
            ctx.fillText("right click to shoot graplling hook", -this.game.camera.x + 2950, 330 - this.game.camera.y);
            ctx.fillText("Press shift to unhook", -this.game.camera.x + 2950, 380 - this.game.camera.y);

            ctx.fillText("Stand here", -this.game.camera.x + 3550, 590 - this.game.camera.y);
            ctx.fillText("↓", -this.game.camera.x + 3650, 650 - this.game.camera.y);

            ctx.fillText("Aim here and", -this.game.camera.x + 3850, 180 - this.game.camera.y);
            ctx.fillText("RIGHT click", -this.game.camera.x + 3850, 230 - this.game.camera.y);
            ctx.fillText("↓", -this.game.camera.x + 3980, 280 - this.game.camera.y);

            ctx.font = 30 + 'px "Press Start 2P"';
            ctx.fillText("You got it!", -this.game.camera.x + 4450,450 - this.game.camera.y);

        }

        if (this.title) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/intropage.png"),0,0);
            ctx.fillStyle = "White";
            ctx.font = 20 + 'px "Press Start 2P"';
            ctx.fillText("PRESS SPACE TO START", 600, 700)
        } 
        // ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/intropage.png"),0,0);
        ctx.fillStyle = "White";
        ctx.font = 20 + 'px "Press Start 2P"';
        ctx.fillText("Megaman", 1.5 * 32, 1 * 32);
        if (!this.title) ctx.fillText(this.levelTitle, 15 * 32, 1 * 32);
        ctx.fillText("TIME", 25 * 32, 1 * 32);
        
        
        

        if (PARAMS.DEBUG) {
            ctx.font = 18 + 'px "Press Start 2P"';
            ctx.strokeStyle = "White";
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.game.left ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(6 * 32 - 2, 1.5 * 32- 2, 0.5 * 32 + 2, 0.5 * 32 + 2);
            ctx.fillText("L", 6 * 32, 2 * 32);
            ctx.strokeStyle = this.game.down ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(6.5 * 32, 2 * 32, 0.5 * 32 + 2, 0.5 * 32 + 2);
            ctx.fillText("D", 6.5 * 32 + 2, 2.5 * 32 + 2);
            ctx.strokeStyle = this.game.up ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(6.5 * 32, 1 * 32 - 4, 0.5 * 32 + 2, 0.5 * 32 + 2);
            ctx.fillText("U", 6.5 * 32 + 2, 1.5 * 32 - 2);
            ctx.strokeStyle = this.game.right ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(7 * 32 + 2, 1.5 * 32 - 2, 0.5 * 32 + 2, 0.5 * 32 + 2);
            ctx.fillText("R", 7 * 32 + 4, 2 * 32);

            ctx.strokeStyle = this.game.space ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Jump", 10 * 32 + 4, 2 * 32);

            ctx.strokeStyle = this.game.click ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Shooting", 15 * 32 + 4, 2 * 32);

            ctx.strokeStyle = this.game.rightclick ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("grappling", 20 * 32 + 4, 2 * 32);

            ctx.strokeStyle = this.game.shift ? "White" : "Grey";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("sliding", 24 * 32 + 4, 2 * 32);
        }
    };
};
