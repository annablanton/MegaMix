class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.title = true;


        this.megaman = new Megaman(game, 100, 500);
        //this.megaman = new Megaman(game, 6340, 200);
        
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
        
        this.loadLevelOne(this.title);
        game.addEntity(this.megaman);
        game.addEntity(this);
        
    };

    clearEntities() {
        this.game.entities = [this];
    };

    // loadTitle(title){
    //     if (title) {

    //     }
    // }
    loadLevelOne(title) {
        this.title = title;
       
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
        this.game.addEntity(new Barba(this.game, 6528, 600));
        this.game.addEntity(new BigBoo(this.game, 5600, 600));
        this.game.addEntity(new Tile(this.game, 5600,704,11,0))
        this.game.addEntity(new Tile(this.game, 5600,672,11,0))
        this.game.addEntity(new Bulldozer(this.game, 5800, 600))
        this.game.addEntity(new Tile(this.game, 6000,704,11,0))
        this.game.addEntity(new Tile(this.game, 6000,672,11,0))

        for(var i=0; i<6; i++){
            this.game.addEntity(new Tile(this.game, 6112+i*256,736, 12,0))
            this.game.addEntity(new Tile(this.game, 6144+i*256,736, 13,0))
            this.game.addEntity(new Tile(this.game, 6176+i*256,736, 14,0))
            this.game.addEntity(new Tile(this.game, 6208+i*256,736, 14,0))
            this.game.addEntity(new Tile(this.game, 6240+i*256,736, 15,0))
        }
        for(var i=0; i<6; i++){
            this.game.addEntity(new Tile(this.game, 6144+i*256,480, 12,1))
            this.game.addEntity(new Tile(this.game, 6176+i*256,480, 13,1))
            this.game.addEntity(new Tile(this.game, 6208+i*256,480, 15,1))
        }

        for(var i=0; i<5; i++){
            this.game.addEntity(new Tile(this.game, 6272+i*256,224, 12,0))
            this.game.addEntity(new Tile(this.game, 6304+i*256,224, 14,0))
            this.game.addEntity(new Tile(this.game, 6336+i*256,224, 15,0))
        }

        for (var i = 0; i < 7; i++) {
            this.game.addEntity(new Tile(this.game, 6240 + 5 * 256, 544 - 4 * i * 32, 16, 3));
            this.game.addEntity(new Tile(this.game, 6240 + 5 * 256, 512 - 4 * i * 32, 16, 2));
            this.game.addEntity(new Tile(this.game, 6240 + 5 * 256, 480 - 4 * i * 32, 16, 1));
            this.game.addEntity(new Tile(this.game, 6240 + 5 * 256, 448 - 4 * i * 32, 16, 0));
        }

        for (var i = 0; i < 7; i++) {
            this.game.addEntity(new Tile(this.game, 6112, 544 - 4 * i * 32, 16, 3));
            this.game.addEntity(new Tile(this.game, 6112, 512 - 4 * i * 32, 16, 2));
            this.game.addEntity(new Tile(this.game, 6112, 480 - 4 * i * 32, 16, 1));
            this.game.addEntity(new Tile(this.game, 6112, 448 - 4 * i * 32, 16, 0));
        }

        for (var i = 0; i < 10; i++) {
            this.game.addEntity(new Tile(this.game, 6144 + 4 * i * 32, -320, 12, 5));
            this.game.addEntity(new Tile(this.game, 6176 + 4 * i * 32, -320, 13, 5));
            this.game.addEntity(new Tile(this.game, 6208 + 4 * i * 32, -320, 14, 5));
            this.game.addEntity(new Tile(this.game, 6240 + 4 * i * 32, -320, 15, 5));
        }

        this.game.addEntity(new Tile(this.game, 7424, -320, 12, 5));
        this.game.addEntity(new Tile(this.game, 7456, -320, 13, 5));
        this.game.addEntity(new Tile(this.game, 7488, -320, 15, 5));

        for (var i = 0; i < 40; i++) {
            this.game.addEntity(new Tile(this.game, 7552 + i * 32, 736, 3, 2));
        }

        this.game.addEntity(new Tower(this.game, 7936, 428.5));


    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;

        let midpoint_width = PARAMS.CANVAS_WIDTH/2 - 21;  //486;
        let midpoint_height = PARAMS.CANVAS_HEIGHT/2 - 12;
      
        if(this.title && this.game.space) {
            this.title = false;
        }
        this.x = this.megaman.x - midpoint_width;
        if(this.megaman.y < midpoint_height){
        this.y = this.megaman.y - midpoint_height;
        } 
        else{
            this.y = 0;
        }
    };

    draw(ctx) {

        if (this.title) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/intropage.png"),0,0);
            ctx.fillStyle = "White";
            ctx.font = "30px Verdana";
            ctx.fillText("PRESS SPACE TO START", 600, 700)
        }
        // ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/intropage.png"),0,0);
        ctx.fillStyle = "White";
        ctx.fillText("Megaman", 1.5 * 32, 1 * 32);
        ctx.fillText("Stage 1", 15 * 32, 1 * 32);
        ctx.fillText("TIME", 25 * 32, 1 * 32);
        if (PARAMS.DEBUG) {

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
