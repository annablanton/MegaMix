class Megaman {
    constructor(game, x , y) {
      Object.assign(this, {game, x, y});
        this.game.Megaman =this;

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
        this.FIRE_OFFSET_X = 26;
        this.FIRE_OFFSET_Y = 20;

        this.velocity = {x: 0, y: 0};
        this.fallAcc = 562.5;

        this.animations = [];
        this.firingAnims = [];
        this.loadAnimation();
    };

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
        this.animations[0][0][0] = new Animator(this.spritesheet, 779, 14, 26, 26, 3, 0.1, 25, false, true);
        this.firingAnims[0][0][0][0] = new Animator(this.spritesheet, 934, 65, 33, 26, 3, 0.1, 18, true, true);
        this.firingAnims[0][0][0][1] = new Animator(this.spritesheet, 934, 269, 30, 26, 3, 0.1, 21, true, true); 
        this.firingAnims[0][0][0][2] = new Animator(this.spritesheet, 774, 269, 30, 26, 3, 0.1, 21, true, true); 
        this.firingAnims[0][0][0][3] = new Animator(this.spritesheet, 770, 65, 33, 26, 3, 0.1, 18, true, true);
        this.firingAnims[0][0][0][4] = new Animator(this.spritesheet, 774, 218, 30, 26, 3, 0.1, 21, true, true);
        this.firingAnims[0][0][0][5] = new Animator(this.spritesheet, 781, 165, 23, 28, 3, 0.1, 28, true, true);
        this.firingAnims[0][0][0][6] = new Animator(this.spritesheet, 934, 165, 23, 28, 3, 0.1, 28, true, true);
        this.firingAnims[0][0][0][7] = new Animator(this.spritesheet, 935, 218, 29, 26, 3, 0.1, 22, true, true);

        // original version with bigger frame box
        // this.animations[0][0][0] = new Animator(this.spritesheet, 769, 3, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[0][0][0][0] = new Animator(this.spritesheet, 922, 54, 46, 46, 3, 0.1, 5, true, true);
        // this.firingAnims[0][0][0][1] = new Animator(this.spritesheet, 922, 258, 46, 46, 3, 0.1, 5, true, true); 
        // this.firingAnims[0][0][0][2] = new Animator(this.spritesheet, 769, 258, 46, 46, 3, 0.1, 5, true, true); 
        // this.firingAnims[0][0][0][3] = new Animator(this.spritesheet, 769, 54, 46, 46, 3, 0.1, 5, true, true);
        // this.firingAnims[0][0][0][4] = new Animator(this.spritesheet, 769, 207, 46, 46, 3, 0.1, 5, true, true);
        // this.firingAnims[0][0][0][5] = new Animator(this.spritesheet, 769, 156, 46, 46, 3, 0.1, 5, true, true);
        // this.firingAnims[0][0][0][6] = new Animator(this.spritesheet, 922, 156, 46, 46, 3, 0.1, 5, true, true);
        // this.firingAnims[0][0][0][7] = new Animator(this.spritesheet, 922, 208, 46, 46, 3, 0.1, 5, true, true);


        this.animations[0][0][1] = new Animator(this.spritesheet, 570, 14, 30, 26, 4, 0.1, 21, true, true);
        this.firingAnims[0][0][1][0] = new Animator(this.spritesheet, 1086, 66, 33, 25, 4, 0.1, 18, true, true);
        this.firingAnims[0][0][1][1] = new Animator(this.spritesheet, 1086, 270, 30, 25, 4, 0.1, 21, true, true);
        this.firingAnims[0][0][1][2] = new Animator(this.spritesheet, 573, 269, 29, 25, 4, 0.1, 21, true, true);
        this.firingAnims[0][0][1][3] = new Animator(this.spritesheet, 566, 66, 32, 25, 4, 0.1, 20, true, true);
        this.firingAnims[0][0][1][4] = new Animator(this.spritesheet, 572, 219, 30, 25, 4, 0.1, 20, true, true);
        this.firingAnims[0][0][1][5] = new Animator(this.spritesheet, 573, 166, 28, 27, 4, 0.1, 22, true, true);
        this.firingAnims[0][0][1][6] = new Animator(this.spritesheet, 1086, 166, 28, 27, 4, 0.1, 22, true, true);
        this.firingAnims[0][0][1][7] = new Animator(this.spritesheet, 1087, 219, 33, 25, 4, 0.1, 18, true, true);

        // original version with bigger frame box
        // this.animations[0][0][1] = new Animator(this.spritesheet, 565, 3, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][1][0] = new Animator(this.spritesheet, 1075, 54, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][1][1] = new Animator(this.spritesheet, 1075, 258, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][1][2] = new Animator(this.spritesheet, 565, 258, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][1][3] = new Animator(this.spritesheet, 565, 54, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][1][4] = new Animator(this.spritesheet, 565, 207, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][1][5] = new Animator(this.spritesheet, 565, 156, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][1][6] = new Animator(this.spritesheet, 1075, 156, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][1][7] = new Animator(this.spritesheet, 1075, 207, 46, 46, 4, 0.1, 5, true, true);

        this.animations[0][0][2] = new Animator(this.spritesheet, 368, 9, 28, 33, 4, 0.1, 23, true, true);
        this.firingAnims[0][0][2][0] = new Animator(this.spritesheet, 1289, 61, 31, 32, 4, 0.1, 20, true, true);
        this.firingAnims[0][0][2][1] = new Animator(this.spritesheet, 1289, 265, 31, 32, 4, 0.1, 20, true, true);
        this.firingAnims[0][0][2][2] = new Animator(this.spritesheet, 367, 265, 31, 32, 4, 0.1, 20, true, true);
        this.firingAnims[0][0][2][3] = new Animator(this.spritesheet, 367, 61, 31, 32, 4, 0.1, 20, true, true);
        this.firingAnims[0][0][2][4] = new Animator(this.spritesheet, 367, 214, 31, 32, 4, 0.1, 20, true, true);
        this.firingAnims[0][0][2][5] = new Animator(this.spritesheet, 369, 161, 27, 33, 4, 0.1, 24, true, true);
        this.firingAnims[0][0][2][6] = new Animator(this.spritesheet, 1290, 161, 27, 33, 4, 0.1, 24, true, true);
        this.firingAnims[0][0][2][7] = new Animator(this.spritesheet, 1288, 213, 31, 32, 4, 0.1, 20, true, true);

        // original version with bigger frame box
        // this.animations[0][0][2] = new Animator(this.spritesheet, 361, 3, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][2][0] = new Animator(this.spritesheet, 1279, 54, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][2][1] = new Animator(this.spritesheet, 1279, 258, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][2][2] = new Animator(this.spritesheet, 361, 258, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][2][3] = new Animator(this.spritesheet, 361, 54, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][2][4] = new Animator(this.spritesheet, 361, 207, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][2][5] = new Animator(this.spritesheet, 361, 156, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][2][6] = new Animator(this.spritesheet, 1279, 156, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][0][2][7] = new Animator(this.spritesheet, 1279, 207, 46, 46, 4, 0.1, 5, true, true);

        this.animations[0][0][3] = new Animator(this.spritesheet, 263, 19, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[0][0][3][0] = new Animator(this.spritesheet, 263, 274, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[0][0][3][1] = new Animator(this.spritesheet, 263, 274, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[0][0][3][2] = new Animator(this.spritesheet, 263, 274, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[0][0][3][3] = new Animator(this.spritesheet, 263, 71, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[0][0][3][4] = new Animator(this.spritesheet, 263, 223, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[0][0][3][5] = new Animator(this.spritesheet, 263, 170, 31, 24, 2, 0.1, 20, true, true);
        this.firingAnims[0][0][3][6] = new Animator(this.spritesheet, 263, 170, 31, 24, 2, 0.1, 20, true, true);
        this.firingAnims[0][0][3][7] = new Animator(this.spritesheet, 263, 170, 31, 24, 2, 0.1, 20, true, true);

        // this.firingAnims[0][0][3][0] = new Animator(this.spritesheet, 259, 258, 46, 46, 2, 0.1, 5, true, true);
        // this.firingAnims[0][0][3][1] = new Animator(this.spritesheet, 259, 258, 46, 46, 2, 0.1, 5, true, true);
        // this.firingAnims[0][0][3][2] = new Animator(this.spritesheet, 259, 258, 46, 46, 2, 0.1, 5, true, true);
        // this.firingAnims[0][0][3][3] = new Animator(this.spritesheet, 259, 54, 46, 46, 2, 0.1, 5, true, true);
        // this.firingAnims[0][0][3][4] = new Animator(this.spritesheet, 259, 207, 46, 46, 2, 0.1, 5, true, true);
        // this.firingAnims[0][0][3][5] = new Animator(this.spritesheet, 259, 156, 46, 46, 2, 0.1, 5, true, true);
        // this.firingAnims[0][0][3][6] = new Animator(this.spritesheet, 259, 156, 46, 46, 2, 0.1, 5, true, true);
        // this.firingAnims[0][0][3][7] = new Animator(this.spritesheet, 259, 156, 46, 46, 2, 0.1, 5, true, true);

      //this.animations[0][0][4] = new Animator(this.spritesheet,565, 54, 46, 46, 3, 0.1, 5, true, true);
      //this.animations[0][0][5] = new Animator(this.spritesheet,565, 105, 46, 46, 3, 0.1, 5, false, true);

      // facing right = 1, normal =0  |  0= idle, 1 = walk/run, 2 = jump, 3 = sliding, 4 = shooting, 5=graphing  
        this.animations[1][0][0] = new Animator(this.spritesheet, 932, 14, 26, 26, 3, 0.1, 25, false, true);
        this.firingAnims[1][0][0][0] = new Animator(this.spritesheet, 934, 65, 33, 26, 3, 0.1, 18, true, true);
        this.firingAnims[1][0][0][1] = new Animator(this.spritesheet, 934, 269, 30, 26, 3, 0.1, 21, true, true); 
        this.firingAnims[1][0][0][2] = new Animator(this.spritesheet, 774, 269, 30, 26, 3, 0.1, 21, true, true); 
        this.firingAnims[1][0][0][3] = new Animator(this.spritesheet, 770, 65, 33, 26, 3, 0.1, 18, true, true);
        this.firingAnims[1][0][0][4] = new Animator(this.spritesheet, 774, 218, 30, 26, 3, 0.1, 21, true, true);
        this.firingAnims[1][0][0][5] = new Animator(this.spritesheet, 781, 165, 23, 28, 3, 0.1, 28, true, true);
        this.firingAnims[1][0][0][6] = new Animator(this.spritesheet, 934, 165, 23, 28, 3, 0.1, 28, true, true);
        this.firingAnims[1][0][0][7] = new Animator(this.spritesheet, 935, 218, 29, 26, 3, 0.1, 22, true, true);
        // original version with bigger frame box
        // this.firingAnims[1][0][0][0] = new Animator(this.spritesheet, 922, 54, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[1][0][0][1] = new Animator(this.spritesheet, 922, 258, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[1][0][0][2] = new Animator(this.spritesheet, 769, 258, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[1][0][0][3] = new Animator(this.spritesheet, 769, 54, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[1][0][0][4] = new Animator(this.spritesheet, 769, 207, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[1][0][0][5] = new Animator(this.spritesheet, 769, 156, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[1][0][0][6] = new Animator(this.spritesheet, 922, 156, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[1][0][0][7] = new Animator(this.spritesheet, 922, 208, 46, 46, 3, 0.1, 5, false, true);

        this.animations[1][0][1] = new Animator(this.spritesheet, 1087, 14, 28, 26, 4, 0.1, 23, false, true);
        this.firingAnims[1][0][1][0] = new Animator(this.spritesheet, 1086, 66, 33, 25, 4, 0.1, 18, true, true);
        this.firingAnims[1][0][1][1] = new Animator(this.spritesheet, 1086, 270, 30, 25, 4, 0.1, 21, true, true);
        this.firingAnims[1][0][1][2] = new Animator(this.spritesheet, 573, 269, 29, 25, 4, 0.1, 21, true, true);
        this.firingAnims[1][0][1][3] = new Animator(this.spritesheet, 566, 66, 32, 25, 4, 0.1, 20, true, true);
        this.firingAnims[1][0][1][4] = new Animator(this.spritesheet, 572, 219, 30, 25, 4, 0.1, 20, true, true);
        this.firingAnims[1][0][1][5] = new Animator(this.spritesheet, 573, 166, 28, 27, 4, 0.1, 22, true, true);
        this.firingAnims[1][0][1][6] = new Animator(this.spritesheet, 1086, 166, 28, 27, 4, 0.1, 22, true, true);
        this.firingAnims[1][0][1][7] = new Animator(this.spritesheet, 1087, 219, 33, 25, 4, 0.1, 18, true, true);
        // original version with bigger frame box
        // this.animations[1][0][1] = new Animator(this.spritesheet, 1075, 3, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][1][0] = new Animator(this.spritesheet, 1075, 54, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][1][1] = new Animator(this.spritesheet, 1075, 258, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][1][2] = new Animator(this.spritesheet, 565, 258, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][1][3] = new Animator(this.spritesheet, 565, 54, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][1][4] = new Animator(this.spritesheet, 565, 207, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][1][5] = new Animator(this.spritesheet, 565, 156, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][1][6] = new Animator(this.spritesheet, 1075, 156, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][1][7] = new Animator(this.spritesheet, 1075, 207, 46, 46, 4, 0.1, 5, false, true);

        this.animations[1][0][2] = new Animator(this.spritesheet, 1289, 9, 28, 33, 4, 0.1, 23, false, true);
        this.firingAnims[1][0][2][0] = new Animator(this.spritesheet, 1289, 61, 31, 32, 4, 0.1, 20, true, true);
        this.firingAnims[1][0][2][1] = new Animator(this.spritesheet, 1289, 265, 31, 32, 4, 0.1, 20, true, true);
        this.firingAnims[1][0][2][2] = new Animator(this.spritesheet, 367, 265, 31, 32, 4, 0.1, 20, true, true);
        this.firingAnims[1][0][2][3] = new Animator(this.spritesheet, 367, 61, 31, 32, 4, 0.1, 20, true, true);
        this.firingAnims[1][0][2][4] = new Animator(this.spritesheet, 367, 214, 31, 32, 4, 0.1, 20, true, true);
        this.firingAnims[1][0][2][5] = new Animator(this.spritesheet, 369, 161, 27, 33, 4, 0.1, 24, true, true);
        this.firingAnims[1][0][2][6] = new Animator(this.spritesheet, 1290, 161, 27, 33, 4, 0.1, 24, true, true);
        this.firingAnims[1][0][2][7] = new Animator(this.spritesheet, 1288, 213, 31, 32, 4, 0.1, 20, true, true);
        // original version with bigger frame box
        // this.animations[1][0][2] = new Animator(this.spritesheet, 1279, 3, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][2][0] = new Animator(this.spritesheet, 1279, 54, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][2][1] = new Animator(this.spritesheet, 1279, 258, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][2][2] = new Animator(this.spritesheet, 361, 258, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][2][3] = new Animator(this.spritesheet, 361, 54, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][2][4] = new Animator(this.spritesheet, 361, 207, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][2][5] = new Animator(this.spritesheet, 361, 156, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][2][6] = new Animator(this.spritesheet, 1279, 156, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][0][2][7] = new Animator(this.spritesheet, 1279, 207, 46, 46, 4, 0.1, 5, false, true);


        this.animations[1][0][3] = new Animator(this.spritesheet, 1494, 19, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[1][0][3][0] = new Animator(this.spritesheet, 1494, 71, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[1][0][3][1] = new Animator(this.spritesheet, 1494, 274, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[1][0][3][2] = new Animator(this.spritesheet, 1494, 274, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[1][0][3][3] = new Animator(this.spritesheet, 1494, 274, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[1][0][3][4] = new Animator(this.spritesheet, 1494, 274, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[1][0][3][5] = new Animator(this.spritesheet, 1494, 171, 31, 23, 2, 0.1, 20, true, true);
        this.firingAnims[1][0][3][6] = new Animator(this.spritesheet, 1494, 171, 31, 23, 2, 0.1, 20, true, true);
        this.firingAnims[1][0][3][7] = new Animator(this.spritesheet, 1494, 223, 31, 22, 2, 0.1, 20, true, true);
        // original version with bigger frame box
        // this.animations[1][0][3] = new Animator(this.spritesheet, 1483, 3, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][0][3][0] = new Animator(this.spritesheet, 1483, 54, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][0][3][1] = new Animator(this.spritesheet, 1483, 258, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][0][3][2] = new Animator(this.spritesheet, 1483, 258, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][0][3][3] = new Animator(this.spritesheet, 1483, 258, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][0][3][4] = new Animator(this.spritesheet, 1483, 258, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][0][3][5] = new Animator(this.spritesheet, 1483, 156, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][0][3][6] = new Animator(this.spritesheet, 1483, 156, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][0][3][7] = new Animator(this.spritesheet, 1483, 207, 46, 46, 2, 0.1, 5, false, true);

       
      //this.animations[1][0][4] = new Animator(this.spritesheet,1075, 54, 46, 46, 3, 0.1, 5, false, true);
      //this.animations[1][0][5] = new Animator(this.spritesheet,1075, 105, 46, 46, 3, 0.1, 5, false, true);

      // facing left = 0, poison =1  |  0= idle, 1 = walk/run 2 = jump 3 = sliding 4 = shooting 5=graphing 
        this.animations[0][1][0] = new Animator(this.spritesheet, 779, 675, 26, 26, 3, 0.1, 25, false, true);
        this.firingAnims[0][1][0][0] = new Animator(this.spritesheet, 934, 726, 33, 26, 3, 0.1, 18, true, true);
        this.firingAnims[0][1][0][1] = new Animator(this.spritesheet, 934, 930, 30, 26, 3, 0.1, 21, true, true); 
        this.firingAnims[0][1][0][2] = new Animator(this.spritesheet, 774, 930, 30, 26, 3, 0.1, 21, true, true); 
        this.firingAnims[0][1][0][3] = new Animator(this.spritesheet, 770, 726, 33, 26, 3, 0.1, 18, true, true);
        this.firingAnims[0][1][0][4] = new Animator(this.spritesheet, 774, 879, 30, 26, 3, 0.1, 21, true, true);
        this.firingAnims[0][1][0][5] = new Animator(this.spritesheet, 781, 826, 23, 28, 3, 0.1, 28, true, true);
        this.firingAnims[0][1][0][6] = new Animator(this.spritesheet, 934, 826, 23, 28, 3, 0.1, 28, true, true);
        this.firingAnims[0][1][0][7] = new Animator(this.spritesheet, 935, 879, 29, 26, 3, 0.1, 22, true, true);

        this.animations[0][1][1] = new Animator(this.spritesheet, 570, 675, 30, 26, 4, 0.1, 21, true, true);
        this.firingAnims[0][1][1][0] = new Animator(this.spritesheet, 1086, 727, 33, 25, 4, 0.1, 18, true, true);
        this.firingAnims[0][1][1][1] = new Animator(this.spritesheet, 1086, 931, 30, 25, 4, 0.1, 21, true, true);
        this.firingAnims[0][1][1][2] = new Animator(this.spritesheet, 573, 930, 29, 25, 4, 0.1, 21, true, true);
        this.firingAnims[0][1][1][3] = new Animator(this.spritesheet, 566, 727, 32, 25, 4, 0.1, 20, true, true);
        this.firingAnims[0][1][1][4] = new Animator(this.spritesheet, 572, 880, 30, 25, 4, 0.1, 20, true, true);
        this.firingAnims[0][1][1][5] = new Animator(this.spritesheet, 573, 827, 28, 27, 4, 0.1, 22, true, true);
        this.firingAnims[0][1][1][6] = new Animator(this.spritesheet, 1086, 827, 28, 27, 4, 0.1, 22, true, true);
        this.firingAnims[0][1][1][7] = new Animator(this.spritesheet, 1087, 880, 33, 25, 4, 0.1, 18, true, true);

        this.animations[0][1][2] = new Animator(this.spritesheet, 368, 670, 28, 33, 4, 0.1, 23, true, true);
        this.firingAnims[0][1][2][0] = new Animator(this.spritesheet, 1289, 722, 31, 32, 4, 0.1, 20, true, true);
        this.firingAnims[0][1][2][1] = new Animator(this.spritesheet, 1289, 926, 31, 32, 4, 0.1, 20, true, true);
        this.firingAnims[0][1][2][2] = new Animator(this.spritesheet, 367, 926, 31, 32, 4, 0.1, 20, true, true);
        this.firingAnims[0][1][2][3] = new Animator(this.spritesheet, 367, 722, 31, 32, 4, 0.1, 20, true, true);
        this.firingAnims[0][1][2][4] = new Animator(this.spritesheet, 367, 875, 31, 32, 4, 0.1, 20, true, true);
        this.firingAnims[0][1][2][5] = new Animator(this.spritesheet, 369, 822, 27, 33, 4, 0.1, 24, true, true);
        this.firingAnims[0][1][2][6] = new Animator(this.spritesheet, 1290, 822, 27, 33, 4, 0.1, 24, true, true);
        this.firingAnims[0][1][2][7] = new Animator(this.spritesheet, 1288, 874, 31, 32, 4, 0.1, 20, true, true);
        
        this.animations[0][1][3] = new Animator(this.spritesheet, 263, 680, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[0][1][3][0] = new Animator(this.spritesheet, 263, 935, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[0][1][3][1] = new Animator(this.spritesheet, 263, 935, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[0][1][3][2] = new Animator(this.spritesheet, 263, 935, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[0][1][3][3] = new Animator(this.spritesheet, 263, 71+661, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[0][1][3][4] = new Animator(this.spritesheet, 263, 223+661, 31, 22, 2, 0.1, 20, true, true);
        this.firingAnims[0][1][3][5] = new Animator(this.spritesheet, 263, 170+661, 31, 24, 2, 0.1, 20, true, true);
        this.firingAnims[0][1][3][6] = new Animator(this.spritesheet, 263, 170+661, 31, 24, 2, 0.1, 20, true, true);
        this.firingAnims[0][1][3][7] = new Animator(this.spritesheet, 263, 170+661, 31, 24, 2, 0.1, 20, true, true);
        // original version with bigger frame box
        // this.animations[0][1][0] = new Animator(this.spritesheet, 769, 664, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[0][1][0][0] = new Animator(this.spritesheet, 922, 54 + 661, 46, 46, 3, 0.1, 5, true, true);
        // this.firingAnims[0][1][0][1] = new Animator(this.spritesheet, 922, 258 + 661, 46, 46, 3, 0.1, 5, true, true);
        // this.firingAnims[0][1][0][2] = new Animator(this.spritesheet, 769, 258 + 661, 46, 46, 3, 0.1, 5, true, true);
        // this.firingAnims[0][1][0][3] = new Animator(this.spritesheet, 769, 54 + 661, 46, 46, 3, 0.1, 5, true, true);
        // this.firingAnims[0][1][0][4] = new Animator(this.spritesheet, 769, 207 + 661, 46, 46, 3, 0.1, 5, true, true);
        // this.firingAnims[0][1][0][5] = new Animator(this.spritesheet, 769, 156 + 661, 46, 46, 3, 0.1, 5, true, true);
        // this.firingAnims[0][1][0][6] = new Animator(this.spritesheet, 922, 156 + 661, 46, 46, 3, 0.1, 5, true, true);
        // this.firingAnims[0][1][0][7] = new Animator(this.spritesheet, 922, 208 + 661, 46, 46, 3, 0.1, 5, true, true);

        // this.animations[0][1][1] = new Animator(this.spritesheet, 565, 664, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][1][0] = new Animator(this.spritesheet, 1075, 54 + 661, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][1][1] = new Animator(this.spritesheet, 1075, 258 + 661, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][1][2] = new Animator(this.spritesheet, 565, 258 + 661, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][1][3] = new Animator(this.spritesheet, 565, 54 + 661, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][1][4] = new Animator(this.spritesheet, 565, 207 + 661, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][1][5] = new Animator(this.spritesheet, 565, 156 + 661, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][1][6] = new Animator(this.spritesheet, 1075, 156 + 661, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][1][7] = new Animator(this.spritesheet, 1075, 207 + 661, 46, 46, 4, 0.1, 5, true, true);

        // this.animations[0][1][2] = new Animator(this.spritesheet, 361, 664, 461, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][2][0] = new Animator(this.spritesheet, 1279, 54 + 661, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][2][1] = new Animator(this.spritesheet, 1279, 258 + 661, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][2][2] = new Animator(this.spritesheet, 361, 258 + 661, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][2][3] = new Animator(this.spritesheet, 361, 54 + 661, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][2][4] = new Animator(this.spritesheet, 361, 207 + 661, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][2][5] = new Animator(this.spritesheet, 361, 156 + 661, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][2][6] = new Animator(this.spritesheet, 1279, 156 + 661, 46, 46, 4, 0.1, 5, true, true);
        // this.firingAnims[0][1][2][7] = new Animator(this.spritesheet, 1279, 207 + 661, 46, 46, 4, 0.1, 5, true, true);

        // this.animations[0][1][3] = new Animator(this.spritesheet, 259, 664, 46, 46, 2, 0.1, 5, true, true);
        // this.firingAnims[0][1][3][0] = new Animator(this.spritesheet, 259, 258 + 661, 46, 46, 2, 0.1, 5, true, true);
        // this.firingAnims[0][1][3][1] = new Animator(this.spritesheet, 259, 258 + 661, 46, 46, 2, 0.1, 5, true, true);
        // this.firingAnims[0][1][3][2] = new Animator(this.spritesheet, 259, 258 + 661, 46, 46, 2, 0.1, 5, true, true);
        // this.firingAnims[0][1][3][3] = new Animator(this.spritesheet, 259, 54 + 661, 46, 46, 2, 0.1, 5, true, true);
        // this.firingAnims[0][1][3][4] = new Animator(this.spritesheet, 259, 207 + 661, 46, 46, 2, 0.1, 5, true, true);
        // this.firingAnims[0][1][3][5] = new Animator(this.spritesheet, 259, 156 + 661, 46, 46, 2, 0.1, 5, true, true);
        // this.firingAnims[0][1][3][6] = new Animator(this.spritesheet, 259, 156 + 661, 46, 46, 2, 0.1, 5, true, true);
        // this.firingAnims[0][1][3][7] = new Animator(this.spritesheet, 259, 156 + 661, 46, 46, 2, 0.1, 5, true, true);

      //this.animations[0][1][4] = new Animator(this.spritesheet,565, 715, 46, 46, 3, 0.1, 5, true, true);
      //this.animations[0][1][5] = new Animator(this.spritesheet,565, 766, 46, 46, 3, 0.1, 5, false, true);

      // facing right = 1, poison =1  |  0= idle, 1 = walk/run, 2 = jump, 3 = sliding, 4 = shooting, 5=graphing 
      this.animations[1][1][0] = new Animator(this.spritesheet, 932, 675, 26, 26, 3, 0.1, 25, false, true);
      this.firingAnims[1][1][0][0] = new Animator(this.spritesheet, 934, 65+661, 33, 26, 3, 0.1, 18, true, true);
      this.firingAnims[1][1][0][1] = new Animator(this.spritesheet, 934, 269+661, 30, 26, 3, 0.1, 21, true, true); 
      this.firingAnims[1][1][0][2] = new Animator(this.spritesheet, 774, 269+661, 30, 26, 3, 0.1, 21, true, true); 
      this.firingAnims[1][1][0][3] = new Animator(this.spritesheet, 770, 65+661, 33, 26, 3, 0.1, 18, true, true);
      this.firingAnims[1][1][0][4] = new Animator(this.spritesheet, 774, 218+661, 30, 26, 3, 0.1, 21, true, true);
      this.firingAnims[1][1][0][5] = new Animator(this.spritesheet, 781, 165+661, 23, 28, 3, 0.1, 28, true, true);
      this.firingAnims[1][1][0][6] = new Animator(this.spritesheet, 934, 165+661, 23, 28, 3, 0.1, 28, true, true);
      this.firingAnims[1][1][0][7] = new Animator(this.spritesheet, 935, 218+661, 29, 26, 3, 0.1, 22, true, true);

      this.animations[1][1][1] = new Animator(this.spritesheet, 1087, 14+661, 28, 26, 4, 0.1, 23, false, true);
      this.firingAnims[1][1][1][0] = new Animator(this.spritesheet, 1086, 66+661, 33, 25, 4, 0.1, 18, true, true);
      this.firingAnims[1][1][1][1] = new Animator(this.spritesheet, 1086, 270+661, 30, 25, 4, 0.1, 21, true, true);
      this.firingAnims[1][1][1][2] = new Animator(this.spritesheet, 573, 269+661, 29, 25, 4, 0.1, 21, true, true);
      this.firingAnims[1][1][1][3] = new Animator(this.spritesheet, 566, 66+661, 32, 25, 4, 0.1, 20, true, true);
      this.firingAnims[1][1][1][4] = new Animator(this.spritesheet, 572, 219+661, 30, 25, 4, 0.1, 20, true, true);
      this.firingAnims[1][1][1][5] = new Animator(this.spritesheet, 573, 166+661, 28, 27, 4, 0.1, 22, true, true);
      this.firingAnims[1][1][1][6] = new Animator(this.spritesheet, 1086, 166+661, 28, 27, 4, 0.1, 22, true, true);
      this.firingAnims[1][1][1][7] = new Animator(this.spritesheet, 1087, 219+661, 33, 25, 4, 0.1, 18, true, true);

      this.animations[1][1][2] = new Animator(this.spritesheet, 1289, 9+661, 28, 33, 4, 0.1, 23, false, true);
      this.firingAnims[1][1][2][0] = new Animator(this.spritesheet, 1289, 61+661, 31, 32, 4, 0.1, 20, true, true);
      this.firingAnims[1][1][2][1] = new Animator(this.spritesheet, 1289, 265+661, 31, 32, 4, 0.1, 20, true, true);
      this.firingAnims[1][1][2][2] = new Animator(this.spritesheet, 367, 265+661, 31, 32, 4, 0.1, 20, true, true);
      this.firingAnims[1][1][2][3] = new Animator(this.spritesheet, 367, 61+661, 31, 32, 4, 0.1, 20, true, true);
      this.firingAnims[1][1][2][4] = new Animator(this.spritesheet, 367, 214+661, 31, 32, 4, 0.1, 20, true, true);
      this.firingAnims[1][1][2][5] = new Animator(this.spritesheet, 369, 161+661, 27, 33, 4, 0.1, 24, true, true);
      this.firingAnims[1][1][2][6] = new Animator(this.spritesheet, 1290, 161+661, 27, 33, 4, 0.1, 24, true, true);
      this.firingAnims[1][1][2][7] = new Animator(this.spritesheet, 1288, 213+661, 31, 32, 4, 0.1, 20, true, true);

      this.animations[1][1][3] = new Animator(this.spritesheet, 1494, 19+661, 31, 22, 2, 0.1, 20, true, true);
      this.firingAnims[1][1][3][0] = new Animator(this.spritesheet, 1494, 71+661, 31, 22, 2, 0.1, 20, true, true);
      this.firingAnims[1][1][3][1] = new Animator(this.spritesheet, 1494, 274+661, 31, 22, 2, 0.1, 20, true, true);
      this.firingAnims[1][1][3][2] = new Animator(this.spritesheet, 1494, 274+661, 31, 22, 2, 0.1, 20, true, true);
      this.firingAnims[1][1][3][3] = new Animator(this.spritesheet, 1494, 274+661, 31, 22, 2, 0.1, 20, true, true);
      this.firingAnims[1][1][3][4] = new Animator(this.spritesheet, 1494, 274+661, 31, 22, 2, 0.1, 20, true, true);
      this.firingAnims[1][1][3][5] = new Animator(this.spritesheet, 1494, 171+661, 31, 23, 2, 0.1, 20, true, true);
      this.firingAnims[1][1][3][6] = new Animator(this.spritesheet, 1494, 171+661, 31, 23, 2, 0.1, 20, true, true);
      this.firingAnims[1][1][3][7] = new Animator(this.spritesheet, 1494, 223+661, 31, 22, 2, 0.1, 20, true, true);


        // original version with bigger frame box
        // this.animations[1][1][0] = new Animator(this.spritesheet, 922, 664, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[1][1][0][0] = new Animator(this.spritesheet, 922, 54 + 661, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[1][1][0][1] = new Animator(this.spritesheet, 922, 258 + 661, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[1][1][0][2] = new Animator(this.spritesheet, 769, 258 + 661, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[1][1][0][3] = new Animator(this.spritesheet, 769, 54 + 661, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[1][1][0][4] = new Animator(this.spritesheet, 769, 207 + 661, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[1][1][0][5] = new Animator(this.spritesheet, 769, 156 + 661, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[1][1][0][6] = new Animator(this.spritesheet, 922, 156 + 661, 46, 46, 3, 0.1, 5, false, true);
        // this.firingAnims[1][1][0][7] = new Animator(this.spritesheet, 922, 208 + 661, 46, 46, 3, 0.1, 5, false, true);

        // this.animations[1][1][1] = new Animator(this.spritesheet, 1075, 664, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][1][0] = new Animator(this.spritesheet, 1075, 54 + 661, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][1][1] = new Animator(this.spritesheet, 1075, 258 + 661, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][1][2] = new Animator(this.spritesheet, 565, 258 + 661, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][1][3] = new Animator(this.spritesheet, 565, 54 + 661, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][1][4] = new Animator(this.spritesheet, 565, 207 + 661, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][1][5] = new Animator(this.spritesheet, 565, 156 + 661, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][1][6] = new Animator(this.spritesheet, 1075, 156 + 661, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][1][7] = new Animator(this.spritesheet, 1075, 207 + 661, 46, 46, 4, 0.1, 5, false, true);

        // this.animations[1][1][2] = new Animator(this.spritesheet, 1279, 664, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][2][0] = new Animator(this.spritesheet, 1279, 54 + 661, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][2][1] = new Animator(this.spritesheet, 1279, 258 + 661, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][2][2] = new Animator(this.spritesheet, 361, 258 + 661, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][2][3] = new Animator(this.spritesheet, 361, 54 + 661, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][2][4] = new Animator(this.spritesheet, 361, 207 + 661, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][2][5] = new Animator(this.spritesheet, 361, 156 + 661, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][2][6] = new Animator(this.spritesheet, 1279, 156 + 661, 46, 46, 4, 0.1, 5, false, true);
        // this.firingAnims[1][1][2][7] = new Animator(this.spritesheet, 1279, 207 + 661, 46, 46, 4, 0.1, 5, false, true);

        // this.animations[1][1][3] = new Animator(this.spritesheet, 1483, 664, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][1][3][0] = new Animator(this.spritesheet, 1483, 54 + 661, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][1][3][1] = new Animator(this.spritesheet, 1483, 258 + 661, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][1][3][2] = new Animator(this.spritesheet, 1483, 258 + 661, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][1][3][3] = new Animator(this.spritesheet, 1483, 258 + 661, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][1][3][4] = new Animator(this.spritesheet, 1483, 258 + 661, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][1][3][5] = new Animator(this.spritesheet, 1483, 156 + 661, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][1][3][6] = new Animator(this.spritesheet, 1483, 156 + 661, 46, 46, 2, 0.1, 5, false, true);
        // this.firingAnims[1][1][3][7] = new Animator(this.spritesheet, 1483, 207 + 661, 46, 46, 2, 0.1, 5, false, true);


      //this.animations[1][1][4] = new Animator(this.spritesheet,1075, 715, 46, 46, 3, 0.1, 5, false, true);
      //this.animations[1][1][5] = new Animator(this.spritesheet,1075, 766, 46, 46, 3, 0.1, 5, false, true);

    };

    update() {
      const TICK = this.game.clockTick;

      const MIN_MOVING = 20;        //Values will be changed
      const ACC_MOVING = 1;
      const DEC_MOVING = 400;
      const ACC_SLIDING = 1;
      const DEC_SLIDING = 210;

      const MAX_SLIDING = 400;
      const MAX_MOVING = 200;


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
        
        //for updating action
        if (this.action !== 2) {
          if ((Math.abs(this.velocity.x) >= MIN_MOVING)&& !this.game.shift) this.action = 1;
          else if ((Math.abs(this.velocity.x) >= MIN_MOVING)&& this.game.shift) this.action=3;
          else this.action = 0;
        } 

        // update direction
       if (this.velocity.x < 0) this.facing = 0;
       if (this.velocity.x > 0) this.facing = 1;

       // setting maximum
        if (this.velocity.x >= MAX_SLIDING) this.velocity.x = MAX_SLIDING;
        if (this.velocity.x <= -MAX_SLIDING) this.velocity.x = -MAX_SLIDING;
        if (this.velocity.x >= MAX_MOVING && !this.game.shift) this.velocity.x = MAX_MOVING;
        if (this.velocity.x <= -MAX_MOVING && !this.game.shift) this.velocity.x = -MAX_MOVING;

        //update x and y
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;

      if(this.game.up){
        this.action=0;
        this.y -=5;
      }
      if(this.game.down){
        this.action=0;
        this.y +=10;
      }
      if(this.game.q==true){
        if(this.state==0){
          this.state=1;
        } else if(this.state==1){
          this.state=0;
        }
        this.game.q=false;
      }

      if(this.game.space ==true){
        if(this.action ==0){
          this.action=2;
        } else{this.action=0;}
        this.game.space =false;
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
          
      }
    }
  
    draw(ctx) {
        if (this.firingState) this.firingAnims[this.facing][this.state][this.action][this.angle].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        else this.animations[this.facing][this.state][this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        if (PARAMS.DEBUG) {
            //ctx.beginPath();
            //ctx.ellipse(this.x + this.FIRE_OFFSET_X, this.y + this.FIRE_OFFSET_Y, 40, 25, 0, 0, this.angleRads);
            //ctx.stroke();
            var ellipsePoint = findEllipsePoint(this.FIRE_OFFSET_X, this.FIRE_OFFSET_Y, this.angleRads);

            ctx.beginPath();
            ctx.fillRect(this.x + this.FIRE_OFFSET_X + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y + ellipsePoint.y, 10, 10);
        }
      
    };


}
