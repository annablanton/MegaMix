class Megaman {
    constructor(game, x , y) {
      Object.assign(this, {game, x, y});
        this.game.Megaman = this;
        this.MEGAMAN_HEIGHT= 48;   //24*2
        this.MEGAMAN_WIDTH = 42;   //21*2
        this.PELLET_WIDTH = 16;
        this.PELLET_HEIGHT = 12;
        this.LASER_WIDTH = 1024;
        this.LASER_HEIGHT = 1024;

        // this.game = game
        // this.x = x;
        // this.y = y;

        this.facing = 0; //0=left 1=right
        this.state =0; // 0 = normal 1 = poison
        this.action = 0; // 0= idle, 1 = walk/run 2 = jump 3 = sliding 4 = shooting 5=graphing 
        this.firingState = 0; // 0 = not firing, 1 = shooting weapon, 2 = grappling
        this.angle = 0; //in radians: 0=[0, pi/8)U[15pi/8, 2pi), 1=[pi/8, 3pi/8), 2=[3pi/8, pi/2), 3=[pi/2, 5pi/8), 4=[5pi/8, 7pi/8), 5=[7pi/8, 9pi/8), 6=[9pi/8, 3pi/2), 7=[3pi/2, 15pi/16)
        this.angleRads = 0;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megaman.png");
        this.FIRE_OFFSET_X = 46;
        this.FIRE_OFFSET_Y = 46;
        this.firedWeapon = false; //keeps track of if megaman can fire another pellet yet
        this.weaponTimer = false;
        this.weaponToggle = 0; //0 = pellet, 1 = laser

        this.velocity = {x: 0, y: 0};
        this.fallAcc = 562.5;

        this.animations = [];
        this.firingAnims = [];
        this.loadAnimation();
    };

    updateBB() {
      this.lastBB=this.BB;
      this.BB = new BoundingBox(this.x+26 , this.y+24, this.MEGAMAN_WIDTH , this.MEGAMAN_HEIGHT)
            //this.x+13*2, this.y+12*2, 
    }

    loadAnimation() {

      for(var i=0; i<2; i++){
          this.animations.push([]); //2 facing (0=left | 1=right) 
          this.firingAnims.push([]);
        for(var j=0; j<2; j++){
            this.animations[i].push([]); //2 condition (0=normal | 1 = poison)
            this.firingAnims[i].push([]);
          for(var k=0; k<8; k++){
            this.firingAnims[i][j].push([]); //8 shooting angles (in radians: [0, pi/8)U[15pi/8, 2pi), [pi/8, pi/4), [pi/4, 7pi/8), [7pi/8, 9pi/8), [9pi/8, 11pi/8), [11pi/8, 3pi/2), [3pi/2, 13pi/8), [13pi/8, 15pi/8))
          }
        }
      }
      //pritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop
      // facing left = 0, normal =0  |  0= idle, 1 = walk/run 2 = jump 3 = sliding
        //this.animations[0][0][0] = new Animator(this.spritesheet, 779, 14, 26, 26, 3, 0.1, 25, false, true);
        //this.firingAnims[0][0][0][0] = new Animator(this.spritesheet, 934, 65, 33, 26, 3, 0.1, 18, true, true);
        //this.firingAnims[0][0][0][1] = new Animator(this.spritesheet, 934, 269, 30, 26, 3, 0.1, 21, true, true); 
        //this.firingAnims[0][0][0][2] = new Animator(this.spritesheet, 774, 269, 30, 26, 3, 0.1, 21, true, true); 
        //this.firingAnims[0][0][0][3] = new Animator(this.spritesheet, 770, 65, 33, 26, 3, 0.1, 18, true, true);
        //this.firingAnims[0][0][0][4] = new Animator(this.spritesheet, 774, 218, 30, 26, 3, 0.1, 21, true, true);
        //this.firingAnims[0][0][0][5] = new Animator(this.spritesheet, 781, 165, 23, 28, 3, 0.1, 28, true, true);
        //this.firingAnims[0][0][0][6] = new Animator(this.spritesheet, 934, 165, 23, 28, 3, 0.1, 28, true, true);
        //this.firingAnims[0][0][0][7] = new Animator(this.spritesheet, 935, 218, 29, 26, 3, 0.1, 22, true, true);

        // original version with bigger frame box
         this.animations[0][0][0] = new Animator(this.spritesheet, 769, 3, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[0][0][0][0] = new Animator(this.spritesheet, 922, 54, 46, 46, 3, 0.1, 5, true, true);
         this.firingAnims[0][0][0][1] = new Animator(this.spritesheet, 922, 258, 46, 46, 3, 0.1, 5, true, true); 
         this.firingAnims[0][0][0][2] = new Animator(this.spritesheet, 769, 258, 46, 46, 3, 0.1, 5, true, true); 
         this.firingAnims[0][0][0][3] = new Animator(this.spritesheet, 769, 54, 46, 46, 3, 0.1, 5, true, true);
         this.firingAnims[0][0][0][4] = new Animator(this.spritesheet, 769, 207, 46, 46, 3, 0.1, 5, true, true);
         this.firingAnims[0][0][0][5] = new Animator(this.spritesheet, 769, 156, 46, 46, 3, 0.1, 5, true, true);
         this.firingAnims[0][0][0][6] = new Animator(this.spritesheet, 922, 156, 46, 46, 3, 0.1, 5, true, true);
         this.firingAnims[0][0][0][7] = new Animator(this.spritesheet, 922, 207, 46, 46, 3, 0.1, 5, true, true);


        //this.animations[0][0][1] = new Animator(this.spritesheet, 570, 14, 30, 26, 4, 0.1, 21, true, true);
        //this.firingAnims[0][0][1][0] = new Animator(this.spritesheet, 1086, 66, 33, 25, 4, 0.1, 18, true, true);
        //this.firingAnims[0][0][1][1] = new Animator(this.spritesheet, 1086, 270, 30, 25, 4, 0.1, 21, true, true);
        //this.firingAnims[0][0][1][2] = new Animator(this.spritesheet, 573, 269, 29, 25, 4, 0.1, 21, true, true);
        //this.firingAnims[0][0][1][3] = new Animator(this.spritesheet, 566, 66, 32, 25, 4, 0.1, 20, true, true);
        //this.firingAnims[0][0][1][4] = new Animator(this.spritesheet, 572, 219, 30, 25, 4, 0.1, 20, true, true);
        //this.firingAnims[0][0][1][5] = new Animator(this.spritesheet, 573, 166, 28, 27, 4, 0.1, 22, true, true);
        //this.firingAnims[0][0][1][6] = new Animator(this.spritesheet, 1086, 166, 28, 27, 4, 0.1, 22, true, true);
        //this.firingAnims[0][0][1][7] = new Animator(this.spritesheet, 1087, 219, 33, 25, 4, 0.1, 18, true, true);

        // original version with bigger frame box
         this.animations[0][0][1] = new Animator(this.spritesheet, 565, 3, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][1][0] = new Animator(this.spritesheet, 1075, 54, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][1][1] = new Animator(this.spritesheet, 1075, 258, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][1][2] = new Animator(this.spritesheet, 565, 258, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][1][3] = new Animator(this.spritesheet, 565, 54, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][1][4] = new Animator(this.spritesheet, 565, 207, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][1][5] = new Animator(this.spritesheet, 565, 156, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][1][6] = new Animator(this.spritesheet, 1075, 156, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][1][7] = new Animator(this.spritesheet, 1075, 207, 46, 46, 4, 0.1, 5, true, true);

        //this.animations[0][0][2] = new Animator(this.spritesheet, 368, 9, 28, 33, 4, 0.1, 23, true, true);
        //this.firingAnims[0][0][2][0] = new Animator(this.spritesheet, 1289, 61, 31, 32, 4, 0.1, 20, true, true);
        //this.firingAnims[0][0][2][1] = new Animator(this.spritesheet, 1289, 265, 31, 32, 4, 0.1, 20, true, true);
        //this.firingAnims[0][0][2][2] = new Animator(this.spritesheet, 367, 265, 31, 32, 4, 0.1, 20, true, true);
        //this.firingAnims[0][0][2][3] = new Animator(this.spritesheet, 367, 61, 31, 32, 4, 0.1, 20, true, true);
        //this.firingAnims[0][0][2][4] = new Animator(this.spritesheet, 367, 214, 31, 32, 4, 0.1, 20, true, true);
        //this.firingAnims[0][0][2][5] = new Animator(this.spritesheet, 369, 161, 27, 33, 4, 0.1, 24, true, true);
        //this.firingAnims[0][0][2][6] = new Animator(this.spritesheet, 1290, 161, 27, 33, 4, 0.1, 24, true, true);
        //this.firingAnims[0][0][2][7] = new Animator(this.spritesheet, 1288, 213, 31, 32, 4, 0.1, 20, true, true);

        // original version with bigger frame box
         this.animations[0][0][2] = new Animator(this.spritesheet, 361, 3, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][2][0] = new Animator(this.spritesheet, 1279, 54, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][2][1] = new Animator(this.spritesheet, 1279, 258, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][2][2] = new Animator(this.spritesheet, 361, 258, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][2][3] = new Animator(this.spritesheet, 361, 54, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][2][4] = new Animator(this.spritesheet, 361, 207, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][2][5] = new Animator(this.spritesheet, 361, 156, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][2][6] = new Animator(this.spritesheet, 1279, 156, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][0][2][7] = new Animator(this.spritesheet, 1279, 207, 46, 46, 4, 0.1, 5, true, true);

        //this.animations[0][0][3] = new Animator(this.spritesheet, 263, 19, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[0][0][3][0] = new Animator(this.spritesheet, 263, 274, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[0][0][3][1] = new Animator(this.spritesheet, 263, 274, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[0][0][3][2] = new Animator(this.spritesheet, 263, 274, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[0][0][3][3] = new Animator(this.spritesheet, 263, 71, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[0][0][3][4] = new Animator(this.spritesheet, 263, 223, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[0][0][3][5] = new Animator(this.spritesheet, 263, 170, 31, 24, 2, 0.1, 20, true, true);
        //this.firingAnims[0][0][3][6] = new Animator(this.spritesheet, 263, 170, 31, 24, 2, 0.1, 20, true, true);
        //this.firingAnims[0][0][3][7] = new Animator(this.spritesheet, 263, 170, 31, 24, 2, 0.1, 20, true, true);

        this.animations[0][0][3] = new Animator(this.spritesheet, 259, 3, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][0][3][0] = new Animator(this.spritesheet, 259, 156, 46, 46, 2, 0.1, 5, true, true);
         this.firingAnims[0][0][3][1] = new Animator(this.spritesheet, 259, 258, 46, 46, 2, 0.1, 5, true, true);
         this.firingAnims[0][0][3][2] = new Animator(this.spritesheet, 259, 258, 46, 46, 2, 0.1, 5, true, true);
         this.firingAnims[0][0][3][3] = new Animator(this.spritesheet, 259, 54, 46, 46, 2, 0.1, 5, true, true);
         this.firingAnims[0][0][3][4] = new Animator(this.spritesheet, 259, 207, 46, 46, 2, 0.1, 5, true, true);
         this.firingAnims[0][0][3][5] = new Animator(this.spritesheet, 259, 156, 46, 46, 2, 0.1, 5, true, true);
         this.firingAnims[0][0][3][6] = new Animator(this.spritesheet, 259, 156, 46, 46, 2, 0.1, 5, true, true);
         this.firingAnims[0][0][3][7] = new Animator(this.spritesheet, 259, 156, 46, 46, 2, 0.1, 5, true, true);

      //this.animations[0][0][4] = new Animator(this.spritesheet,565, 54, 46, 46, 3, 0.1, 5, true, true);
      //this.animations[0][0][5] = new Animator(this.spritesheet,565, 105, 46, 46, 3, 0.1, 5, false, true);

      // facing right = 1, normal =0  |  0= idle, 1 = walk/run, 2 = jump, 3 = sliding, 4 = shooting, 5=graphing  
        //this.animations[1][0][0] = new Animator(this.spritesheet, 932, 14, 26, 26, 3, 0.1, 25, false, true);
        //this.firingAnims[1][0][0][0] = new Animator(this.spritesheet, 934, 65, 33, 26, 3, 0.1, 18, true, true);
        //this.firingAnims[1][0][0][1] = new Animator(this.spritesheet, 934, 269, 30, 26, 3, 0.1, 21, true, true); 
        //this.firingAnims[1][0][0][2] = new Animator(this.spritesheet, 774, 269, 30, 26, 3, 0.1, 21, true, true); 
        //this.firingAnims[1][0][0][3] = new Animator(this.spritesheet, 770, 65, 33, 26, 3, 0.1, 18, true, true);
        //this.firingAnims[1][0][0][4] = new Animator(this.spritesheet, 774, 218, 30, 26, 3, 0.1, 21, true, true);
        //this.firingAnims[1][0][0][5] = new Animator(this.spritesheet, 781, 165, 23, 28, 3, 0.1, 28, true, true);
        //this.firingAnims[1][0][0][6] = new Animator(this.spritesheet, 934, 165, 23, 28, 3, 0.1, 28, true, true);
        //this.firingAnims[1][0][0][7] = new Animator(this.spritesheet, 935, 218, 29, 26, 3, 0.1, 22, true, true);
        // original version with bigger frame box
        this.animations[1][0][0] = new Animator(this.spritesheet, 922, 3, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][0][0][0] = new Animator(this.spritesheet, 922, 54, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][0][0][1] = new Animator(this.spritesheet, 922, 258, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][0][0][2] = new Animator(this.spritesheet, 769, 258, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][0][0][3] = new Animator(this.spritesheet, 769, 54, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][0][0][4] = new Animator(this.spritesheet, 769, 207, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][0][0][5] = new Animator(this.spritesheet, 769, 156, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][0][0][6] = new Animator(this.spritesheet, 922, 156, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][0][0][7] = new Animator(this.spritesheet, 922, 208, 46, 46, 3, 0.1, 5, false, true);

        //this.animations[1][0][1] = new Animator(this.spritesheet, 1087, 14, 28, 26, 4, 0.1, 23, false, true);
        //this.firingAnims[1][0][1][0] = new Animator(this.spritesheet, 1086, 66, 33, 25, 4, 0.1, 18, true, true);
        //this.firingAnims[1][0][1][1] = new Animator(this.spritesheet, 1086, 270, 30, 25, 4, 0.1, 21, true, true);
        //this.firingAnims[1][0][1][2] = new Animator(this.spritesheet, 573, 269, 29, 25, 4, 0.1, 21, true, true);
        //this.firingAnims[1][0][1][3] = new Animator(this.spritesheet, 566, 66, 32, 25, 4, 0.1, 20, true, true);
        //this.firingAnims[1][0][1][4] = new Animator(this.spritesheet, 572, 219, 30, 25, 4, 0.1, 20, true, true);
        //this.firingAnims[1][0][1][5] = new Animator(this.spritesheet, 573, 166, 28, 27, 4, 0.1, 22, true, true);
        //this.firingAnims[1][0][1][6] = new Animator(this.spritesheet, 1086, 166, 28, 27, 4, 0.1, 22, true, true);
        //this.firingAnims[1][0][1][7] = new Animator(this.spritesheet, 1087, 219, 33, 25, 4, 0.1, 18, true, true);
        // original version with bigger frame box
         this.animations[1][0][1] = new Animator(this.spritesheet, 1075, 3, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][1][0] = new Animator(this.spritesheet, 1075, 54, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][1][1] = new Animator(this.spritesheet, 1075, 258, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][1][2] = new Animator(this.spritesheet, 565, 258, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][1][3] = new Animator(this.spritesheet, 565, 54, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][1][4] = new Animator(this.spritesheet, 565, 207, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][1][5] = new Animator(this.spritesheet, 565, 156, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][1][6] = new Animator(this.spritesheet, 1075, 156, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][1][7] = new Animator(this.spritesheet, 1075, 207, 46, 46, 4, 0.1, 5, false, true);

        //this.animations[1][0][2] = new Animator(this.spritesheet, 1289, 9, 28, 33, 4, 0.1, 23, false, true);
        //this.firingAnims[1][0][2][0] = new Animator(this.spritesheet, 1289, 61, 31, 32, 4, 0.1, 20, true, true);
        //this.firingAnims[1][0][2][1] = new Animator(this.spritesheet, 1289, 265, 31, 32, 4, 0.1, 20, true, true);
        //this.firingAnims[1][0][2][2] = new Animator(this.spritesheet, 367, 265, 31, 32, 4, 0.1, 20, true, true);
        //this.firingAnims[1][0][2][3] = new Animator(this.spritesheet, 367, 61, 31, 32, 4, 0.1, 20, true, true);
        //this.firingAnims[1][0][2][4] = new Animator(this.spritesheet, 367, 214, 31, 32, 4, 0.1, 20, true, true);
        //this.firingAnims[1][0][2][5] = new Animator(this.spritesheet, 369, 161, 27, 33, 4, 0.1, 24, true, true);
        //this.firingAnims[1][0][2][6] = new Animator(this.spritesheet, 1290, 161, 27, 33, 4, 0.1, 24, true, true);
        //this.firingAnims[1][0][2][7] = new Animator(this.spritesheet, 1288, 213, 31, 32, 4, 0.1, 20, true, true);
        // original version with bigger frame box
         this.animations[1][0][2] = new Animator(this.spritesheet, 1279, 3, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][2][0] = new Animator(this.spritesheet, 1279, 54, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][2][1] = new Animator(this.spritesheet, 1279, 258, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][2][2] = new Animator(this.spritesheet, 361, 258, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][2][3] = new Animator(this.spritesheet, 361, 54, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][2][4] = new Animator(this.spritesheet, 361, 207, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][2][5] = new Animator(this.spritesheet, 361, 156, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][2][6] = new Animator(this.spritesheet, 1279, 156, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][0][2][7] = new Animator(this.spritesheet, 1279, 207, 46, 46, 4, 0.1, 5, false, true);


        //this.animations[1][0][3] = new Animator(this.spritesheet, 1494, 19, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[1][0][3][0] = new Animator(this.spritesheet, 1494, 71, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[1][0][3][1] = new Animator(this.spritesheet, 1494, 274, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[1][0][3][2] = new Animator(this.spritesheet, 1494, 274, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[1][0][3][3] = new Animator(this.spritesheet, 1494, 274, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[1][0][3][4] = new Animator(this.spritesheet, 1494, 274, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[1][0][3][5] = new Animator(this.spritesheet, 1494, 171, 31, 23, 2, 0.1, 20, true, true);
        //this.firingAnims[1][0][3][6] = new Animator(this.spritesheet, 1494, 171, 31, 23, 2, 0.1, 20, true, true);
        //this.firingAnims[1][0][3][7] = new Animator(this.spritesheet, 1494, 223, 31, 22, 2, 0.1, 20, true, true);
        // original version with bigger frame box
         this.animations[1][0][3] = new Animator(this.spritesheet, 1483, 3, 46, 46, 2, 0.1, 5, false, true);
         this.firingAnims[1][0][3][0] = new Animator(this.spritesheet, 1483, 54, 46, 46, 2, 0.1, 5, false, true);
         this.firingAnims[1][0][3][1] = new Animator(this.spritesheet, 1483, 258, 46, 46, 2, 0.1, 5, false, true);
         this.firingAnims[1][0][3][2] = new Animator(this.spritesheet, 1483, 258, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][0][3][3] = new Animator(this.spritesheet, 1483, 156, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][0][3][4] = new Animator(this.spritesheet, 1483, 156, 46, 46, 2, 0.1, 5, false, true);
         this.firingAnims[1][0][3][5] = new Animator(this.spritesheet, 1483, 156, 46, 46, 2, 0.1, 5, false, true);
         this.firingAnims[1][0][3][6] = new Animator(this.spritesheet, 1483, 156, 46, 46, 2, 0.1, 5, false, true);
         this.firingAnims[1][0][3][7] = new Animator(this.spritesheet, 1483, 207, 46, 46, 2, 0.1, 5, false, true);

       
      //this.animations[1][0][4] = new Animator(this.spritesheet,1075, 54, 46, 46, 3, 0.1, 5, false, true);
      //this.animations[1][0][5] = new Animator(this.spritesheet,1075, 105, 46, 46, 3, 0.1, 5, false, true);

      // facing left = 0, poison =1  |  0= idle, 1 = walk/run 2 = jump 3 = sliding 4 = shooting 5=graphing 
        //this.animations[0][1][0] = new Animator(this.spritesheet, 779, 675, 26, 26, 3, 0.1, 25, false, true);
        //this.firingAnims[0][1][0][0] = new Animator(this.spritesheet, 934, 726, 33, 26, 3, 0.1, 18, true, true);
        //this.firingAnims[0][1][0][1] = new Animator(this.spritesheet, 934, 930, 30, 26, 3, 0.1, 21, true, true); 
        //this.firingAnims[0][1][0][2] = new Animator(this.spritesheet, 774, 930, 30, 26, 3, 0.1, 21, true, true); 
        //this.firingAnims[0][1][0][3] = new Animator(this.spritesheet, 770, 726, 33, 26, 3, 0.1, 18, true, true);
        //this.firingAnims[0][1][0][4] = new Animator(this.spritesheet, 774, 879, 30, 26, 3, 0.1, 21, true, true);
        //this.firingAnims[0][1][0][5] = new Animator(this.spritesheet, 781, 826, 23, 28, 3, 0.1, 28, true, true);
        //this.firingAnims[0][1][0][6] = new Animator(this.spritesheet, 934, 826, 23, 28, 3, 0.1, 28, true, true);
        //this.firingAnims[0][1][0][7] = new Animator(this.spritesheet, 935, 879, 29, 26, 3, 0.1, 22, true, true);

        //this.animations[0][1][1] = new Animator(this.spritesheet, 570, 675, 30, 26, 4, 0.1, 21, true, true);
        //this.firingAnims[0][1][1][0] = new Animator(this.spritesheet, 1086, 727, 33, 25, 4, 0.1, 18, true, true);
        //this.firingAnims[0][1][1][1] = new Animator(this.spritesheet, 1086, 931, 30, 25, 4, 0.1, 21, true, true);
        //this.firingAnims[0][1][1][2] = new Animator(this.spritesheet, 573, 930, 29, 25, 4, 0.1, 21, true, true);
        //this.firingAnims[0][1][1][3] = new Animator(this.spritesheet, 566, 727, 32, 25, 4, 0.1, 20, true, true);
        //this.firingAnims[0][1][1][4] = new Animator(this.spritesheet, 572, 880, 30, 25, 4, 0.1, 20, true, true);
        //this.firingAnims[0][1][1][5] = new Animator(this.spritesheet, 573, 827, 28, 27, 4, 0.1, 22, true, true);
        //this.firingAnims[0][1][1][6] = new Animator(this.spritesheet, 1086, 827, 28, 27, 4, 0.1, 22, true, true);
        //this.firingAnims[0][1][1][7] = new Animator(this.spritesheet, 1087, 880, 33, 25, 4, 0.1, 18, true, true);

        //this.animations[0][1][2] = new Animator(this.spritesheet, 368, 670, 28, 33, 4, 0.1, 23, true, true);
        //this.firingAnims[0][1][2][0] = new Animator(this.spritesheet, 1289, 722, 31, 32, 4, 0.1, 20, true, true);
        //this.firingAnims[0][1][2][1] = new Animator(this.spritesheet, 1289, 926, 31, 32, 4, 0.1, 20, true, true);
        //this.firingAnims[0][1][2][2] = new Animator(this.spritesheet, 367, 926, 31, 32, 4, 0.1, 20, true, true);
        //this.firingAnims[0][1][2][3] = new Animator(this.spritesheet, 367, 722, 31, 32, 4, 0.1, 20, true, true);
        //this.firingAnims[0][1][2][4] = new Animator(this.spritesheet, 367, 875, 31, 32, 4, 0.1, 20, true, true);
        //this.firingAnims[0][1][2][5] = new Animator(this.spritesheet, 369, 822, 27, 33, 4, 0.1, 24, true, true);
        //this.firingAnims[0][1][2][6] = new Animator(this.spritesheet, 1290, 822, 27, 33, 4, 0.1, 24, true, true);
        //this.firingAnims[0][1][2][7] = new Animator(this.spritesheet, 1288, 874, 31, 32, 4, 0.1, 20, true, true);
        
        //this.animations[0][1][3] = new Animator(this.spritesheet, 263, 680, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[0][1][3][0] = new Animator(this.spritesheet, 263, 935, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[0][1][3][1] = new Animator(this.spritesheet, 263, 935, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[0][1][3][2] = new Animator(this.spritesheet, 263, 935, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[0][1][3][3] = new Animator(this.spritesheet, 263, 71+661, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[0][1][3][4] = new Animator(this.spritesheet, 263, 223+661, 31, 22, 2, 0.1, 20, true, true);
        //this.firingAnims[0][1][3][5] = new Animator(this.spritesheet, 263, 170+661, 31, 24, 2, 0.1, 20, true, true);
        //this.firingAnims[0][1][3][6] = new Animator(this.spritesheet, 263, 170+661, 31, 24, 2, 0.1, 20, true, true);
        //this.firingAnims[0][1][3][7] = new Animator(this.spritesheet, 263, 170+661, 31, 24, 2, 0.1, 20, true, true);
        // original version with bigger frame box
         this.animations[0][1][0] = new Animator(this.spritesheet, 769, 664, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[0][1][0][0] = new Animator(this.spritesheet, 922, 54 + 661, 46, 46, 3, 0.1, 5, true, true);
         this.firingAnims[0][1][0][1] = new Animator(this.spritesheet, 922, 258 + 661, 46, 46, 3, 0.1, 5, true, true);
         this.firingAnims[0][1][0][2] = new Animator(this.spritesheet, 769, 258 + 661, 46, 46, 3, 0.1, 5, true, true);
         this.firingAnims[0][1][0][3] = new Animator(this.spritesheet, 769, 54 + 661, 46, 46, 3, 0.1, 5, true, true);
         this.firingAnims[0][1][0][4] = new Animator(this.spritesheet, 769, 207 + 661, 46, 46, 3, 0.1, 5, true, true);
         this.firingAnims[0][1][0][5] = new Animator(this.spritesheet, 769, 156 + 661, 46, 46, 3, 0.1, 5, true, true);
         this.firingAnims[0][1][0][6] = new Animator(this.spritesheet, 922, 156 + 661, 46, 46, 3, 0.1, 5, true, true);
         this.firingAnims[0][1][0][7] = new Animator(this.spritesheet, 922, 208 + 661, 46, 46, 3, 0.1, 5, true, true);

         this.animations[0][1][1] = new Animator(this.spritesheet, 565, 664, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][1][0] = new Animator(this.spritesheet, 1075, 54 + 661, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][1][1] = new Animator(this.spritesheet, 1075, 258 + 661, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][1][2] = new Animator(this.spritesheet, 565, 258 + 661, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][1][3] = new Animator(this.spritesheet, 565, 54 + 661, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][1][4] = new Animator(this.spritesheet, 565, 207 + 661, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][1][5] = new Animator(this.spritesheet, 565, 156 + 661, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][1][6] = new Animator(this.spritesheet, 1075, 156 + 661, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][1][7] = new Animator(this.spritesheet, 1075, 207 + 661, 46, 46, 4, 0.1, 5, true, true);

         this.animations[0][1][2] = new Animator(this.spritesheet, 361, 664, 461, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][2][0] = new Animator(this.spritesheet, 1279, 54 + 661, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][2][1] = new Animator(this.spritesheet, 1279, 258 + 661, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][2][2] = new Animator(this.spritesheet, 361, 258 + 661, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][2][3] = new Animator(this.spritesheet, 361, 54 + 661, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][2][4] = new Animator(this.spritesheet, 361, 207 + 661, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][2][5] = new Animator(this.spritesheet, 361, 156 + 661, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][2][6] = new Animator(this.spritesheet, 1279, 156 + 661, 46, 46, 4, 0.1, 5, true, true);
         this.firingAnims[0][1][2][7] = new Animator(this.spritesheet, 1279, 207 + 661, 46, 46, 4, 0.1, 5, true, true);

         this.animations[0][1][3] = new Animator(this.spritesheet, 259, 664, 46, 46, 2, 0.1, 5, true, true);
         this.firingAnims[0][1][3][0] = new Animator(this.spritesheet, 259, 258 + 661, 46, 46, 2, 0.1, 5, true, true);
         this.firingAnims[0][1][3][1] = new Animator(this.spritesheet, 259, 258 + 661, 46, 46, 2, 0.1, 5, true, true);
         this.firingAnims[0][1][3][2] = new Animator(this.spritesheet, 259, 258 + 661, 46, 46, 2, 0.1, 5, true, true);
         this.firingAnims[0][1][3][3] = new Animator(this.spritesheet, 259, 54 + 661, 46, 46, 2, 0.1, 5, true, true);
         this.firingAnims[0][1][3][4] = new Animator(this.spritesheet, 259, 207 + 661, 46, 46, 2, 0.1, 5, true, true);
         this.firingAnims[0][1][3][5] = new Animator(this.spritesheet, 259, 156 + 661, 46, 46, 2, 0.1, 5, true, true);
         this.firingAnims[0][1][3][6] = new Animator(this.spritesheet, 259, 156 + 661, 46, 46, 2, 0.1, 5, true, true);
         this.firingAnims[0][1][3][7] = new Animator(this.spritesheet, 259, 156 + 661, 46, 46, 2, 0.1, 5, true, true);

      //this.animations[0][1][4] = new Animator(this.spritesheet,565, 715, 46, 46, 3, 0.1, 5, true, true);
      //this.animations[0][1][5] = new Animator(this.spritesheet,565, 766, 46, 46, 3, 0.1, 5, false, true);

      // facing right = 1, poison =1  |  0= idle, 1 = walk/run, 2 = jump, 3 = sliding, 4 = shooting, 5=graphing 
      //this.animations[1][1][0] = new Animator(this.spritesheet, 932, 675, 26, 26, 3, 0.1, 25, false, true);
      //this.firingAnims[1][1][0][0] = new Animator(this.spritesheet, 934, 65+661, 33, 26, 3, 0.1, 18, true, true);
      //this.firingAnims[1][1][0][1] = new Animator(this.spritesheet, 934, 269+661, 30, 26, 3, 0.1, 21, true, true); 
      //this.firingAnims[1][1][0][2] = new Animator(this.spritesheet, 774, 269+661, 30, 26, 3, 0.1, 21, true, true); 
      //this.firingAnims[1][1][0][3] = new Animator(this.spritesheet, 770, 65+661, 33, 26, 3, 0.1, 18, true, true);
      //this.firingAnims[1][1][0][4] = new Animator(this.spritesheet, 774, 218+661, 30, 26, 3, 0.1, 21, true, true);
      //this.firingAnims[1][1][0][5] = new Animator(this.spritesheet, 781, 165+661, 23, 28, 3, 0.1, 28, true, true);
      //this.firingAnims[1][1][0][6] = new Animator(this.spritesheet, 934, 165+661, 23, 28, 3, 0.1, 28, true, true);
      //this.firingAnims[1][1][0][7] = new Animator(this.spritesheet, 935, 218+661, 29, 26, 3, 0.1, 22, true, true);

      //this.animations[1][1][1] = new Animator(this.spritesheet, 1087, 14+661, 28, 26, 4, 0.1, 23, false, true);
      //this.firingAnims[1][1][1][0] = new Animator(this.spritesheet, 1086, 66+661, 33, 25, 4, 0.1, 18, true, true);
      //this.firingAnims[1][1][1][1] = new Animator(this.spritesheet, 1086, 270+661, 30, 25, 4, 0.1, 21, true, true);
      //this.firingAnims[1][1][1][2] = new Animator(this.spritesheet, 573, 269+661, 29, 25, 4, 0.1, 21, true, true);
      //this.firingAnims[1][1][1][3] = new Animator(this.spritesheet, 566, 66+661, 32, 25, 4, 0.1, 20, true, true);
      //this.firingAnims[1][1][1][4] = new Animator(this.spritesheet, 572, 219+661, 30, 25, 4, 0.1, 20, true, true);
      //this.firingAnims[1][1][1][5] = new Animator(this.spritesheet, 573, 166+661, 28, 27, 4, 0.1, 22, true, true);
      //this.firingAnims[1][1][1][6] = new Animator(this.spritesheet, 1086, 166+661, 28, 27, 4, 0.1, 22, true, true);
      //this.firingAnims[1][1][1][7] = new Animator(this.spritesheet, 1087, 219+661, 33, 25, 4, 0.1, 18, true, true);

      //this.animations[1][1][2] = new Animator(this.spritesheet, 1289, 9+661, 28, 33, 4, 0.1, 23, false, true);
      //this.firingAnims[1][1][2][0] = new Animator(this.spritesheet, 1289, 61+661, 31, 32, 4, 0.1, 20, true, true);
      //this.firingAnims[1][1][2][1] = new Animator(this.spritesheet, 1289, 265+661, 31, 32, 4, 0.1, 20, true, true);
      //this.firingAnims[1][1][2][2] = new Animator(this.spritesheet, 367, 265+661, 31, 32, 4, 0.1, 20, true, true);
      //this.firingAnims[1][1][2][3] = new Animator(this.spritesheet, 367, 61+661, 31, 32, 4, 0.1, 20, true, true);
      //this.firingAnims[1][1][2][4] = new Animator(this.spritesheet, 367, 214+661, 31, 32, 4, 0.1, 20, true, true);
      //this.firingAnims[1][1][2][5] = new Animator(this.spritesheet, 369, 161+661, 27, 33, 4, 0.1, 24, true, true);
      //this.firingAnims[1][1][2][6] = new Animator(this.spritesheet, 1290, 161+661, 27, 33, 4, 0.1, 24, true, true);
      //this.firingAnims[1][1][2][7] = new Animator(this.spritesheet, 1288, 213+661, 31, 32, 4, 0.1, 20, true, true);

      //this.animations[1][1][3] = new Animator(this.spritesheet, 1494, 19+661, 31, 22, 2, 0.1, 20, true, true);
      //this.firingAnims[1][1][3][0] = new Animator(this.spritesheet, 1494, 71+661, 31, 22, 2, 0.1, 20, true, true);
      //this.firingAnims[1][1][3][1] = new Animator(this.spritesheet, 1494, 274+661, 31, 22, 2, 0.1, 20, true, true);
      //this.firingAnims[1][1][3][2] = new Animator(this.spritesheet, 1494, 274+661, 31, 22, 2, 0.1, 20, true, true);
      //this.firingAnims[1][1][3][3] = new Animator(this.spritesheet, 1494, 274+661, 31, 22, 2, 0.1, 20, true, true);
      //this.firingAnims[1][1][3][4] = new Animator(this.spritesheet, 1494, 274+661, 31, 22, 2, 0.1, 20, true, true);
      //this.firingAnims[1][1][3][5] = new Animator(this.spritesheet, 1494, 171+661, 31, 23, 2, 0.1, 20, true, true);
      //this.firingAnims[1][1][3][6] = new Animator(this.spritesheet, 1494, 171+661, 31, 23, 2, 0.1, 20, true, true);
      //this.firingAnims[1][1][3][7] = new Animator(this.spritesheet, 1494, 223+661, 31, 22, 2, 0.1, 20, true, true);


        // original version with bigger frame box
         this.animations[1][1][0] = new Animator(this.spritesheet, 922, 664, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][1][0][0] = new Animator(this.spritesheet, 922, 54 + 661, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][1][0][1] = new Animator(this.spritesheet, 922, 258 + 661, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][1][0][2] = new Animator(this.spritesheet, 769, 258 + 661, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][1][0][3] = new Animator(this.spritesheet, 769, 54 + 661, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][1][0][4] = new Animator(this.spritesheet, 769, 207 + 661, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][1][0][5] = new Animator(this.spritesheet, 769, 156 + 661, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][1][0][6] = new Animator(this.spritesheet, 922, 156 + 661, 46, 46, 3, 0.1, 5, false, true);
         this.firingAnims[1][1][0][7] = new Animator(this.spritesheet, 922, 208 + 661, 46, 46, 3, 0.1, 5, false, true);

         this.animations[1][1][1] = new Animator(this.spritesheet, 1075, 664, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][1][0] = new Animator(this.spritesheet, 1075, 54 + 661, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][1][1] = new Animator(this.spritesheet, 1075, 258 + 661, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][1][2] = new Animator(this.spritesheet, 565, 258 + 661, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][1][3] = new Animator(this.spritesheet, 565, 54 + 661, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][1][4] = new Animator(this.spritesheet, 565, 207 + 661, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][1][5] = new Animator(this.spritesheet, 565, 156 + 661, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][1][6] = new Animator(this.spritesheet, 1075, 156 + 661, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][1][7] = new Animator(this.spritesheet, 1075, 207 + 661, 46, 46, 4, 0.1, 5, false, true);

         this.animations[1][1][2] = new Animator(this.spritesheet, 1279, 664, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][2][0] = new Animator(this.spritesheet, 1279, 54 + 661, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][2][1] = new Animator(this.spritesheet, 1279, 258 + 661, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][2][2] = new Animator(this.spritesheet, 361, 258 + 661, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][2][3] = new Animator(this.spritesheet, 361, 54 + 661, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][2][4] = new Animator(this.spritesheet, 361, 207 + 661, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][2][5] = new Animator(this.spritesheet, 361, 156 + 661, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][2][6] = new Animator(this.spritesheet, 1279, 156 + 661, 46, 46, 4, 0.1, 5, false, true);
         this.firingAnims[1][1][2][7] = new Animator(this.spritesheet, 1279, 207 + 661, 46, 46, 4, 0.1, 5, false, true);

         this.animations[1][1][3] = new Animator(this.spritesheet, 1483, 664, 46, 46, 2, 0.1, 5, false, true);
         this.firingAnims[1][1][3][0] = new Animator(this.spritesheet, 1483, 54 + 661, 46, 46, 2, 0.1, 5, false, true);
         this.firingAnims[1][1][3][1] = new Animator(this.spritesheet, 1483, 258 + 661, 46, 46, 2, 0.1, 5, false, true);
         this.firingAnims[1][1][3][2] = new Animator(this.spritesheet, 1483, 258 + 661, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][1][3][3] = new Animator(this.spritesheet, 1483, 156 + 661, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][1][3][4] = new Animator(this.spritesheet, 1483, 156 + 661, 46, 46, 2, 0.1, 5, false, true);
         this.firingAnims[1][1][3][5] = new Animator(this.spritesheet, 1483, 156 + 661, 46, 46, 2, 0.1, 5, false, true);
         this.firingAnims[1][1][3][6] = new Animator(this.spritesheet, 1483, 156 + 661, 46, 46, 2, 0.1, 5, false, true);
         this.firingAnims[1][1][3][7] = new Animator(this.spritesheet, 1483, 207 + 661, 46, 46, 2, 0.1, 5, false, true);


      //this.animations[1][1][4] = new Animator(this.spritesheet,1075, 715, 46, 46, 3, 0.1, 5, false, true);
      //this.animations[1][1][5] = new Animator(this.spritesheet,1075, 766, 46, 46, 3, 0.1, 5, false, true);

    };

    update() {
      const TICK = this.game.clockTick;

      const MIN_MOVING = 4.45;        //Values will be changed
      const ACC_MOVING = 133;
      const DEC_MOVING = 183;
      const ACC_SLIDING = 200;
      const DEC_SLIDING = 365;
  
      const MAX_SLIDING = 153.75;
      const MAX_MOVING = 93;
  
      const STOP_FALL = 1575;
      const WALK_FALL = 1800;
      const RUN_FALL = 2025;
      const STOP_FALL_SPACE = 450;
      const RUN_FALL_SPACE = 562.5;
  
      const MAX_FALL = 270; 

        if (this.weaponTimer > 0) {
            this.weaponTimer -= (this.weaponTimer <= this.game.clockTick ? this.weaponTimer : this.game.clockTick);
        }


//2 facing (0=left | 1=right) 0= idle, 1 = walk/run 2 = jump 3=sliding  
    //Ground moving to left and right
    if(this.action !== 2){  //no jumping
      //stopped and starting
      if ( Math.abs(this.velocity.x)< MIN_MOVING){   
        this.velocity.x = 0;
        this.action = 0;
        if(this.game.right){
          // console.log("right clicking");
           this.velocity.x += MIN_MOVING;         
        }
        if(this.game.left){
          this.velocity.x -= MIN_MOVING;
        } 
      } 
      //moving to right
      else if (Math.abs(this.velocity.x) >= MIN_MOVING) {
          if(this.facing === 1){
            if(this.game.right && !this.game.left){
              //when user click shft for sliding
              if(this.game.shift){
                this.velocity.x += ACC_SLIDING * TICK;
              } //when user just keep moving 
              else this.velocity.x += ACC_MOVING * TICK;           
            } // when user click left button during moving to right 
            else if (this.game.left && !this.game.right) {
                this.velocity.x -= ACC_SLIDING * TICK;
            } // when user doesn't put any key during run to right side 
            else {
              this.velocity.x -= DEC_MOVING *TICK;
            }
          }
          // For left facing
          if (this.facing === 0) {
            if(this.game.left && !this.game.right){
              if(this.game.shift){
                this.velocity.x -= ACC_SLIDING *TICK;
              } else
              this.velocity.x -= ACC_MOVING *TICK;
            } else if (this.game.right && !this.game.left){
                this.velocity.x += DEC_SLIDING *TICK;
            } else {
              this.velocity.x += DEC_MOVING*TICK;
            }
          }
        }

       this.velocity.y += this.fallAcc * TICK;

      //for jumping
      if(this.game.space){
        if(Math.abs(this.velocity.x) < 16) {
          this.velocity.y = -240;
          this.fallAcc = STOP_FALL;
        } else if(Math.abs(this.velocity.x)< 40){
          this.velocity.y = -240;
          this.fallAcc = WALK_FALL;
        } else{
          this.velocity.y = -300;
          this.fallAcc = RUN_FALL;
        }
        this.action = 2;
      }
    } else{
      //vertical phycis
      if(this.velocity.y < 0 && this.game.space){
        if(this.fallacc === STOP_FALL) this.velocity.y -=(STOP_FALL-STOP_FALL_SPACE)*TICK;
        if(this.fallacc === RUN_FALL) this.velocity.y -= (RUN_FALL-RUN_FALL_SPACE)*TICK;
      }
      this.velocity.y += this.fallAcc *TICK;

      //horizontal phycis
      if(this.game.right && !this.game.left){
        this.velocity.x += ACC_MOVING * TICK;
      } else if (this.game.left && !this.game.right){
        this.velocity.x -= ACC_MOVING * TICK;
      }
    }     

     // setting maximum
     if(this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
     if(this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;
     
     if (this.velocity.x >= MAX_SLIDING) this.velocity.x = MAX_SLIDING;
     if (this.velocity.x <= -MAX_SLIDING) this.velocity.x = -MAX_SLIDING;
     if (this.velocity.x >= MAX_MOVING && !this.game.shift) this.velocity.x = MAX_MOVING;
     if (this.velocity.x <= -MAX_MOVING && !this.game.shift) this.velocity.x = -MAX_MOVING;
       

      //update x and y
      this.x += this.velocity.x * TICK * PARAMS.SCALE;
      this.y += this.velocity.y * TICK * PARAMS.SCALE;
      this.updateBB();

      
       var that = this;
        this.game.entities.forEach(function(entity){
            if(entity.BB && that.BB.collide(entity.BB)){
              if(that.velocity.y > 0 ){ //landing & jumping 
              if(entity instanceof Tile && that.BB.bottom-that.velocity.y*that.game.clockTick*PARAMS.SCALE <= entity.BB.top){
                that.y = entity.BB.top - 72;   //73  => this.MEGAMAN_HEIGHT= 48; +25
                that.velocity.y =0 ;
                if(that.action =2) that.action = 0;
                that.updateBB();
            }
          } 
           if((entity instanceof Bulldozer || entity instanceof Wheelie ||  
             entity instanceof Gordo  || entity instanceof HammerBro  || 
              entity instanceof ArmorKnight || entity instanceof Carock || entity instanceof Met)&&
              that.BB.bottom-that.velocity.y * that.game.clockTick * PARAMS.SCALE<= entity.BB.top){ 
              //dead or loose life points
              that.velocity.y= -400;              
              that.action = 2;
              if(that.facing=0){
                that.velocity.x = +40;  
              } else {
                that.velocity.x = -40                  //checking later
              }
              that.updateBB();    
            }

            if (that.velocity.y <0 ){   //jumping and hit celing (bottom of tiles)&& that.BB.collide(entity.BB.left) && that.BB.collide(entith.BB.right)
              if(entity instanceof Tile && (that.lastBB.top >= entity.BB.bottom) ){
                if(that.BB.collide(entity.BB.left)) {
                  that.y = entity.BB.bottom
                  that.velocity.y = 0
                  // that.x += (entity.BB.right-that.BB.left-5);
                } 
                else if (that.BB.collide(entity.BB.right)){
                    that.y = entity.BB.bottom;
                    that.velocity.y = 0;
                    // that.x +=(entity.BB.left-that.BB.right-5);
                } else {
                  that.y = entity.BB.bottom -5;
                  that.velocity.y = 0;
                }
              }
             that.updateBB(); 
            }
            // if (that.velocity.y <0 ){   //jumping and hig celing (bottom of tiles)
            //   if(entity instanceof Tile && that.lastBB.top >= entity.BB.bottom && that.BB.collide(entity.leftBB) && that.BB.collide(entity.rightBB)){
            //     that.y = entity.BB.bottom;
            //     that.velocity.y = 0;
            //   }
            //   that.updateBB();
            // }

            if(that.BB.right - that.velocity.x * that.game.clockTick * PARAMS.SCALE <= entity.BB.left){
              that.x += (entity.BB.left - that.BB.right);
              that.velocity.x = 0
            }

            if(that.BB.left - that.velocity.x * that.game.clockTick * PARAMS.SCALE >= entity.BB.right){
              that.x += (entity.BB.right - that.BB.left);
              that.velocity.x = 0
            }
        }
        })
       
    if(this.game.click == true){
      //if(this.action ==0){
      //this.action=4;
      //} else{this.action=0;}
        this.firingState = 1;
        var mouseX = this.game.mouse.x;
        var mouseY = this.game.mouse.y;


        var vector = new Vector(mouseX - (this.x + this.FIRE_OFFSET_X), mouseY - (this.y + this.FIRE_OFFSET_Y));
        vector.normalize();
        this.angleRads = getAngle(vector);
        console.log(this.angleRads);
        if ((this.angleRads >= 0 && this.angleRads < Math.PI / 8) || (this.angleRads >= 15 * Math.PI / 8)) this.angle = 0;
        else if (this.angleRads < Math.PI / 2) this.angle = 1;
        else if (this.angleRads < 7 * Math.PI / 8) this.angle = 2;
        else if (this.angleRads < 9 * Math.PI / 8) this.angle = 3;
        else if (this.angleRads < 11 * Math.PI / 8) this.angle = 4;
        else if (this.angleRads < 3 * Math.PI / 2) this.angle = 5;
        else if (this.angleRads < 13 * Math.PI / 8) this.angle = 6;
        else this.angle = 7;
      //this.game.click = false;
    }




          if (this.game.q == true) {
              //if(this.state==0){
              //  this.state=1;
              //} else if(this.state==1){
              //  this.state=0;
              //}
              if (this.qReleased) {
                  this.weaponToggle = (this.weaponToggle == 0 ? this.weaponToggle = 1 : this.weaponToggle = 0);
              }

              this.qReleased = false;
          } else {
              this.qReleased = true;
          }

      if(this.game.click == true){
        //if(this.action ==0){
        //this.action=4;
        //} else{this.action=0;}
          this.firingState = 1;
          var mouseX = this.game.mouse.x;
          var mouseY = this.game.mouse.y;

            var vector = new Vector(mouseX - (this.x + this.FIRE_OFFSET_X), mouseY - (this.y + this.FIRE_OFFSET_Y));
            vector.normalize();
            this.angleRads = getAngle(vector);
            //console.log(this.angleRads);
            if ((this.angleRads >= 0 && this.angleRads < Math.PI / 12) || (this.angleRads >= 23 * Math.PI / 12)) this.angle = 0;
            else if (this.angleRads < Math.PI / 2) this.angle = 1;
            else if (this.angleRads < 11 * Math.PI / 12) this.angle = 2;
            else if (this.angleRads < 13 * Math.PI / 12) this.angle = 3;
            else if (this.angleRads < 16 * Math.PI / 12) this.angle = 4;
            else if (this.angleRads < 3 * Math.PI / 2) this.angle = 5;
            else if (this.angleRads < 20 * Math.PI / 12) this.angle = 6;
            else this.angle = 7;
            if (!this.weaponToggle) {
                if (!this.weaponTimer) {
                    if (this.action != 3) {
                        if (this.angleRads >= Math.PI / 5 && this.angleRads <= Math.PI / 2) {
                            var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, Math.PI / 5);
                            this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, Math.PI / 5));
                        } else if (this.angleRads >= Math.PI / 2 && this.angleRads <= 4 * Math.PI / 5) {
                            var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, 4 * Math.PI / 5);
                            this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, 4 * Math.PI / 5));

                        } else {
                            var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, this.angleRads);
                            this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, this.angleRads));
                        }
                    } else if (this.facing == 1) {
                        if (this.angleRads >= Math.PI / 5 && this.angleRads < 11 * Math.PI / 12) {
                            var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, Math.PI / 5);
                            this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, Math.PI / 5));
                        } else if (this.angleRads >= 11 * Math.PI / 12 && this.angleRads <= 3 * Math.PI / 2) {
                            var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, 3 * Math.PI / 2);
                            this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, 3 * Math.PI / 2));

                        } else {
                            var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, this.angleRads);
                            this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, this.angleRads));
                        }
                    } else {
                        if (this.angleRads <= 4 * Math.PI / 5 && this.angleRads > Math.PI / 12) {
                            var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, 4 * Math.PI / 5);
                            this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, 4 * Math.PI / 5));
                        } else if ((this.angleRads <= Math.PI / 12 && this.angleRads >= 0) || (this.angleRads >= 3 * Math.PI / 2 && this.angleRads <= 2 * Math.PI)) {
                            var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, 3 * Math.PI / 2);
                            this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, 3 * Math.PI / 2));
                        } else {
                            var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, this.angleRads);
                            this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, this.angleRads));
                        }
                    }
                    this.weaponTimer = 0.2;
                }
            } else {
                if (!this.weaponTimer) {
                    if (this.action != 3) {
                        if (this.angleRads >= Math.PI / 5 && this.angleRads <= Math.PI / 2) {
                            var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, Math.PI / 5);
                            this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, Math.PI / 5));
                        } else if (this.angleRads >= Math.PI / 2 && this.angleRads <= 4 * Math.PI / 5) {
                            var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, 4 * Math.PI / 5);
                            this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, 4 * Math.PI / 5));

                        } else {
                            var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, this.angleRads);
                            this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, this.angleRads));
                        }
                    } else if (this.facing == 1) {
                        if (this.angleRads >= Math.PI / 5 && this.angleRads < 11 * Math.PI / 12) {
                            var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, Math.PI / 5);
                            this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, Math.PI / 5));
                        } else if (this.angleRads >= 11 * Math.PI / 12 && this.angleRads <= 3 * Math.PI / 2) {
                            var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, 3 * Math.PI / 2);
                            this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, 3 * Math.PI / 2));

                        } else {
                            var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, this.angleRads);
                            this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, this.angleRads));
                        }
                    } else {
                        if (this.angleRads <= 4 * Math.PI / 5 && this.angleRads > Math.PI / 12) {
                            var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, 4 * Math.PI / 5);
                            this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, 4 * Math.PI / 5));
                        } else if ((this.angleRads <= Math.PI / 12 && this.angleRads >= 0) || (this.angleRads >= 3 * Math.PI / 2 && this.angleRads <= 2 * Math.PI)) {
                            var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, 3 * Math.PI / 2);
                            this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, 3 * Math.PI / 2));
                        } else {
                            var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, this.angleRads);
                            this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, this.angleRads));
                        }
                    }
                    this.weaponTimer = 1;
                }
          }
        //this.game.click = false;
      }
          
      //if (this.game.rightclick == true) {
      //    //if(this.action ==0){
      //    //  this.action=5;
      //    //  } else { this.action = 0; }
      //    this.firingState = 2;
      //    var mouseX = this.game.mouse.x;
      //    var mouseY = this.game.mouse.y;

        if (this.game.rightclick == true) {
            //if(this.action ==0){
            //  this.action=5;
            //  } else { this.action = 0; }
            this.firingState = 2;
            var mouseX = this.game.mouse.x;
            var mouseY = this.game.mouse.y;

            var vector = new Vector(mouseX - (this.x + 46), mouseY - (this.y + 46));
            vector.normalize();
            this.angleRads = getAngle(vector);
            //console.log(this.angleRads);
            if ((this.angleRads >= 0 && this.angleRads < Math.PI / 8) || (this.angleRads >= 15 * Math.PI / 8)) this.angle = 0;
            else if (this.angleRads < Math.PI / 2) this.angle = 1;
            else if (this.angleRads < 7 * Math.PI / 8) this.angle = 2;
            else if (this.angleRads < 9 * Math.PI / 8) this.angle = 3;
            else if (this.angleRads < 11 * Math.PI / 8) this.angle = 4;
            else if (this.angleRads < 3 * Math.PI / 2) this.angle = 5;
            else if (this.angleRads < 13 * Math.PI / 8) this.angle = 6;
            else this.angle = 7;
            //this.game.rightclick = false;
        }

        if (!this.game.click && !this.game.rightclick) {
            this.firingState = 0;
        }
      //    var vector = new Vector(mouseX - (this.x + 46), mouseY - (this.y + 46));
      //    vector.normalize();
      //    var angleRads = getAngle(vector);
      //    // console.log(angleRads);
      //    if ((angleRads >= 0 && angleRads < Math.PI / 8) || (angleRads >= 15 * Math.PI / 8)) this.angle = 0;
      //    else if (angleRads < Math.PI / 2) this.angle = 1;
      //    else if (angleRads < 7 * Math.PI / 8) this.angle = 2;
      //    else if (angleRads < 9 * Math.PI / 8) this.angle = 3;
      //    else if (angleRads < 11 * Math.PI / 8) this.angle = 4;
      //    else if (angleRads < 3 * Math.PI / 2) this.angle = 5;
      //    else if (angleRads < 13 * Math.PI / 8) this.angle = 6;
      //    else this.angle = 7;
      //    //this.game.rightclick = false;
      //} 
          
      if (this.action !== 2) {
        if ((Math.abs(this.velocity.x) >= MIN_MOVING)&& !this.game.shift) this.action = 1;
        else if ((Math.abs(this.velocity.x) >= MIN_MOVING)&& this.game.shift) this.action=3;
        else this.action = 0;
        }        
        // update direction
         if (this.velocity.x < 0) this.facing = 0;
         if (this.velocity.x > 0) this.facing = 1;
      }
         
  
    draw(ctx) {
        if (this.firingState) this.firingAnims[this.facing][this.state][this.action][this.angle].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        else this.animations[this.facing][this.state][this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        if (PARAMS.DEBUG) {
            //ctx.beginPath();
            //ctx.ellipse(this.x + this.FIRE_OFFSET_X, this.y + this.FIRE_OFFSET_STANDING_Y, 40, 25, 0, 0, this.angleRads);
            //ctx.stroke();
            var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH/2, 25 + this.LASER_HEIGHT/2, this.angleRads);

            ctx.beginPath();
            ctx.fillRect(this.x + this.FIRE_OFFSET_X - 2, this.y + this.FIRE_OFFSET_Y - 2, 4, 4);
            ctx.fillRect(this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x - 1, this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y - 1, 2, 2);
        }
      
    };


}
