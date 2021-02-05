class Megaman {
    constructor(game, x , y) {
      Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megaman.png");  
        this.game.Megaman = this;

        this.MEGAMAN_HEIGHT= 48;   
        this.MEGAMAN_WIDTH = 42;   
        this.PELLET_WIDTH = 16;
        this.PELLET_HEIGHT = 12;
        this.LASER_WIDTH = 1024;
        this.LASER_HEIGHT = 1024;
        this.FULL_HEALTH_POINT = 28;

        this.facing = 0;                    //0=left 1=right
        this.state =0;                      // 0 = normal 1 = poison
        this.action = 0;                    // 0= idle, 1 = walk/run 2 = jump 3 = sliding 4 = shooting 5=graphing 
        this.firingState = 0;               // 0 = not firing, 1 = shooting weapon, 2 = grappling
        this.healthPoint = this.FULL_HEALTH_POINT;
        this.poisonedTimer = 0;
        this.healthBar = new HealthMeter(this);
        
        this.angle = 0;                     //in radians: 0=[0, pi/8)U[15pi/8, 2pi), 1=[pi/8, 3pi/8), 2=[3pi/8, pi/2), 3=[pi/2, 5pi/8), 
        this.angleRads = 0;                 //4=[5pi/8, 7pi/8), 5=[7pi/8, 9pi/8), 6=[9pi/8, 3pi/2), 7=[3pi/2, 15pi/16)
        
        this.FIRE_OFFSET_X = 46;
        this.FIRE_OFFSET_Y = 46;
        this.firedWeapon = false;           //keeps track of if megaman can fire another pellet yet
        this.weaponTimer = false;
        this.weaponToggle = 0;              //0 = pellet, 1 = laser

        this.velocity = {x: 0, y: 0};
        this.fallAcc = 562.5;

        this.animations = [];
        this.firingAnims = [];
        this.loadAnimation();
    };

    updateBB() {
      this.lastBB=this.BB;
      this.BB = new BoundingBox(this.x+26 , this.y+24, this.MEGAMAN_WIDTH , this.MEGAMAN_HEIGHT)
    }

    loadAnimation() {

      for(var i=0; i<2; i++){
          this.animations.push([]);         //2 facing (0=left | 1=right) 
          this.firingAnims.push([]);
        for(var j=0; j<2; j++){
            this.animations[i].push([]);    //2 condition (0=normal | 1 = poison)
            this.firingAnims[i].push([]);
          for(var k=0; k<8; k++){
            this.firingAnims[i][j].push([]); //8 shooting angles (in radians: [0, pi/8)U[15pi/8, 2pi), [pi/8, pi/4), [pi/4, 7pi/8), 
                                             //[7pi/8, 9pi/8), [9pi/8, 11pi/8), [11pi/8, 3pi/2), [3pi/2, 13pi/8), [13pi/8, 15pi/8))
          }
        }
      }
         //pritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop
         // facing left = 0, normal =0  |  0= idle, 1 = walk/run 2 = jump 3 = sliding
        this.animations[0][0][0] = new Animator(this.spritesheet, 769, 3, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[0][0][0][0] = new Animator(this.spritesheet, 922, 54, 46, 46, 3, 0.1, 5, true, true);
        this.firingAnims[0][0][0][1] = new Animator(this.spritesheet, 922, 258, 46, 46, 3, 0.1, 5, true, true); 
        this.firingAnims[0][0][0][2] = new Animator(this.spritesheet, 769, 258, 46, 46, 3, 0.1, 5, true, true); 
        this.firingAnims[0][0][0][3] = new Animator(this.spritesheet, 769, 54, 46, 46, 3, 0.1, 5, true, true);
        this.firingAnims[0][0][0][4] = new Animator(this.spritesheet, 769, 207, 46, 46, 3, 0.1, 5, true, true);
        this.firingAnims[0][0][0][5] = new Animator(this.spritesheet, 769, 156, 46, 46, 3, 0.1, 5, true, true);
        this.firingAnims[0][0][0][6] = new Animator(this.spritesheet, 922, 156, 46, 46, 3, 0.1, 5, true, true);
        this.firingAnims[0][0][0][7] = new Animator(this.spritesheet, 922, 207, 46, 46, 3, 0.1, 5, true, true);

        // facing left = 0, normal =0  |  0= idle, 1 = walk/run 2 = jump 3 = sliding
        this.animations[0][0][1] = new Animator(this.spritesheet, 565, 3, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][1][0] = new Animator(this.spritesheet, 1075, 54, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][1][1] = new Animator(this.spritesheet, 1075, 258, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][1][2] = new Animator(this.spritesheet, 565, 258, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][1][3] = new Animator(this.spritesheet, 565, 54, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][1][4] = new Animator(this.spritesheet, 565, 207, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][1][5] = new Animator(this.spritesheet, 565, 156, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][1][6] = new Animator(this.spritesheet, 1075, 156, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][1][7] = new Animator(this.spritesheet, 1075, 207, 46, 46, 4, 0.1, 5, true, true);

        // facing left = 0, normal =0  |  0= idle, 1 = walk/run 2 = jump 3 = sliding
        this.animations[0][0][2] = new Animator(this.spritesheet, 361, 3, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][2][0] = new Animator(this.spritesheet, 1279, 54, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][2][1] = new Animator(this.spritesheet, 1279, 258, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][2][2] = new Animator(this.spritesheet, 361, 258, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][2][3] = new Animator(this.spritesheet, 361, 54, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][2][4] = new Animator(this.spritesheet, 361, 207, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][2][5] = new Animator(this.spritesheet, 361, 156, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][2][6] = new Animator(this.spritesheet, 1279, 156, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][0][2][7] = new Animator(this.spritesheet, 1279, 207, 46, 46, 4, 0.1, 5, true, true);

         // facing left = 0, normal =0  |  0= idle, 1 = walk/run 2 = jump 3 = sliding
        this.animations[0][0][3] = new Animator(this.spritesheet, 259, 3, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][0][3][0] = new Animator(this.spritesheet, 259, 156, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][0][3][1] = new Animator(this.spritesheet, 259, 258, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][0][3][2] = new Animator(this.spritesheet, 259, 258, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][0][3][3] = new Animator(this.spritesheet, 259, 54, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][0][3][4] = new Animator(this.spritesheet, 259, 207, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][0][3][5] = new Animator(this.spritesheet, 259, 156, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][0][3][6] = new Animator(this.spritesheet, 259, 156, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][0][3][7] = new Animator(this.spritesheet, 259, 156, 46, 46, 2, 0.1, 5, true, true);

        // facing right = 1, normal =0  |  0= idle, 1 = walk/run, 2 = jump, 3 = sliding, 4 = shooting, 5=graphing  
        this.animations[1][0][0] = new Animator(this.spritesheet, 922, 3, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][0][0][0] = new Animator(this.spritesheet, 922, 54, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][0][0][1] = new Animator(this.spritesheet, 922, 258, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][0][0][2] = new Animator(this.spritesheet, 769, 258, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][0][0][3] = new Animator(this.spritesheet, 769, 54, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][0][0][4] = new Animator(this.spritesheet, 769, 207, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][0][0][5] = new Animator(this.spritesheet, 769, 156, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][0][0][6] = new Animator(this.spritesheet, 922, 156, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][0][0][7] = new Animator(this.spritesheet, 922, 208, 46, 46, 3, 0.1, 5, false, true);

        // facing right = 1, normal =0  |  0= idle, 1 = walk/run, 2 = jump, 3 = sliding, 4 = shooting, 5=graphing  
        this.animations[1][0][1] = new Animator(this.spritesheet, 1075, 3, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][1][0] = new Animator(this.spritesheet, 1075, 54, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][1][1] = new Animator(this.spritesheet, 1075, 258, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][1][2] = new Animator(this.spritesheet, 565, 258, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][1][3] = new Animator(this.spritesheet, 565, 54, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][1][4] = new Animator(this.spritesheet, 565, 207, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][1][5] = new Animator(this.spritesheet, 565, 156, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][1][6] = new Animator(this.spritesheet, 1075, 156, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][1][7] = new Animator(this.spritesheet, 1075, 207, 46, 46, 4, 0.1, 5, false, true);
        
        // facing right = 1, normal =0  |  0= idle, 1 = walk/run, 2 = jump, 3 = sliding, 4 = shooting, 5=graphing  
        this.animations[1][0][2] = new Animator(this.spritesheet, 1279, 3, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][2][0] = new Animator(this.spritesheet, 1279, 54, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][2][1] = new Animator(this.spritesheet, 1279, 258, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][2][2] = new Animator(this.spritesheet, 361, 258, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][2][3] = new Animator(this.spritesheet, 361, 54, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][2][4] = new Animator(this.spritesheet, 361, 207, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][2][5] = new Animator(this.spritesheet, 361, 156, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][2][6] = new Animator(this.spritesheet, 1279, 156, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][0][2][7] = new Animator(this.spritesheet, 1279, 207, 46, 46, 4, 0.1, 5, false, true);
        
        // facing right = 1, normal =0  |  0= idle, 1 = walk/run, 2 = jump, 3 = sliding, 4 = shooting, 5=graphing  
        this.animations[1][0][3] = new Animator(this.spritesheet, 1483, 3, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][0][3][0] = new Animator(this.spritesheet, 1483, 54, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][0][3][1] = new Animator(this.spritesheet, 1483, 258, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][0][3][2] = new Animator(this.spritesheet, 1483, 258, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][0][3][3] = new Animator(this.spritesheet, 1483, 156, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][0][3][4] = new Animator(this.spritesheet, 1483, 156, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][0][3][5] = new Animator(this.spritesheet, 1483, 156, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][0][3][6] = new Animator(this.spritesheet, 1483, 156, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][0][3][7] = new Animator(this.spritesheet, 1483, 207, 46, 46, 2, 0.1, 5, false, true);

     
         // facing left = 0, poison = 1  |  0= idle, 1 = walk/run 2 = jump 3 = sliding
        this.animations[0][1][0] = new Animator(this.spritesheet, 769, 664, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[0][1][0][0] = new Animator(this.spritesheet, 922, 54 + 661, 46, 46, 3, 0.1, 5, true, true);
        this.firingAnims[0][1][0][1] = new Animator(this.spritesheet, 922, 258 + 661, 46, 46, 3, 0.1, 5, true, true);
        this.firingAnims[0][1][0][2] = new Animator(this.spritesheet, 769, 258 + 661, 46, 46, 3, 0.1, 5, true, true);
        this.firingAnims[0][1][0][3] = new Animator(this.spritesheet, 769, 54 + 661, 46, 46, 3, 0.1, 5, true, true);
        this.firingAnims[0][1][0][4] = new Animator(this.spritesheet, 769, 207 + 661, 46, 46, 3, 0.1, 5, true, true);
        this.firingAnims[0][1][0][5] = new Animator(this.spritesheet, 769, 156 + 661, 46, 46, 3, 0.1, 5, true, true);
        this.firingAnims[0][1][0][6] = new Animator(this.spritesheet, 922, 156 + 661, 46, 46, 3, 0.1, 5, true, true);
        this.firingAnims[0][1][0][7] = new Animator(this.spritesheet, 922, 208 + 661, 46, 46, 3, 0.1, 5, true, true);
        // facing left = 0, poison = 1  |  0= idle, 1 = walk/run 2 = jump 3 = sliding
        this.animations[0][1][1] = new Animator(this.spritesheet, 565, 664, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][1][0] = new Animator(this.spritesheet, 1075, 54 + 661, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][1][1] = new Animator(this.spritesheet, 1075, 258 + 661, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][1][2] = new Animator(this.spritesheet, 565, 258 + 661, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][1][3] = new Animator(this.spritesheet, 565, 54 + 661, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][1][4] = new Animator(this.spritesheet, 565, 207 + 661, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][1][5] = new Animator(this.spritesheet, 565, 156 + 661, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][1][6] = new Animator(this.spritesheet, 1075, 156 + 661, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][1][7] = new Animator(this.spritesheet, 1075, 207 + 661, 46, 46, 4, 0.1, 5, true, true);
        // facing left = 0, poison = 1  |  0= idle, 1 = walk/run 2 = jump 3 = sliding
        this.animations[0][1][2] = new Animator(this.spritesheet, 361, 663, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][2][0] = new Animator(this.spritesheet, 1279, 54 + 661, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][2][1] = new Animator(this.spritesheet, 1279, 258 + 661, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][2][2] = new Animator(this.spritesheet, 361, 258 + 661, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][2][3] = new Animator(this.spritesheet, 361, 54 + 661, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][2][4] = new Animator(this.spritesheet, 361, 207 + 661, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][2][5] = new Animator(this.spritesheet, 361, 156 + 661, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][2][6] = new Animator(this.spritesheet, 1279, 156 + 661, 46, 46, 4, 0.1, 5, true, true);
        this.firingAnims[0][1][2][7] = new Animator(this.spritesheet, 1279, 207 + 661, 46, 46, 4, 0.1, 5, true, true);
        // facing left = 0, poison = 1  |  0= idle, 1 = walk/run 2 = jump 3 = sliding
        this.animations[0][1][3] = new Animator(this.spritesheet, 259, 664, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][1][3][0] = new Animator(this.spritesheet, 259, 258 + 661, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][1][3][1] = new Animator(this.spritesheet, 259, 258 + 661, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][1][3][2] = new Animator(this.spritesheet, 259, 258 + 661, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][1][3][3] = new Animator(this.spritesheet, 259, 54 + 661, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][1][3][4] = new Animator(this.spritesheet, 259, 207 + 661, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][1][3][5] = new Animator(this.spritesheet, 259, 156 + 661, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][1][3][6] = new Animator(this.spritesheet, 259, 156 + 661, 46, 46, 2, 0.1, 5, true, true);
        this.firingAnims[0][1][3][7] = new Animator(this.spritesheet, 259, 156 + 661, 46, 46, 2, 0.1, 5, true, true);

        // facing right = 1, poison = 1  |  0= idle, 1 = walk/run 2 = jump 3 = sliding
        this.animations[1][1][0] = new Animator(this.spritesheet, 922, 664, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][1][0][0] = new Animator(this.spritesheet, 922, 54 + 661, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][1][0][1] = new Animator(this.spritesheet, 922, 258 + 661, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][1][0][2] = new Animator(this.spritesheet, 769, 258 + 661, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][1][0][3] = new Animator(this.spritesheet, 769, 54 + 661, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][1][0][4] = new Animator(this.spritesheet, 769, 207 + 661, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][1][0][5] = new Animator(this.spritesheet, 769, 156 + 661, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][1][0][6] = new Animator(this.spritesheet, 922, 156 + 661, 46, 46, 3, 0.1, 5, false, true);
        this.firingAnims[1][1][0][7] = new Animator(this.spritesheet, 922, 208 + 661, 46, 46, 3, 0.1, 5, false, true);

        // facing right = 1, poison = 1  |  0= idle, 1 = walk/run 2 = jump 3 = sliding
        this.animations[1][1][1] = new Animator(this.spritesheet, 1075, 664, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][1][0] = new Animator(this.spritesheet, 1075, 54 + 661, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][1][1] = new Animator(this.spritesheet, 1075, 258 + 661, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][1][2] = new Animator(this.spritesheet, 565, 258 + 661, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][1][3] = new Animator(this.spritesheet, 565, 54 + 661, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][1][4] = new Animator(this.spritesheet, 565, 207 + 661, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][1][5] = new Animator(this.spritesheet, 565, 156 + 661, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][1][6] = new Animator(this.spritesheet, 1075, 156 + 661, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][1][7] = new Animator(this.spritesheet, 1075, 207 + 661, 46, 46, 4, 0.1, 5, false, true);

        // facing right = 1, poison = 1  |  0= idle, 1 = walk/run 2 = jump 3 = sliding
        this.animations[1][1][2] = new Animator(this.spritesheet, 1279, 664, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][2][0] = new Animator(this.spritesheet, 1279, 54 + 661, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][2][1] = new Animator(this.spritesheet, 1279, 258 + 661, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][2][2] = new Animator(this.spritesheet, 361, 258 + 661, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][2][3] = new Animator(this.spritesheet, 361, 54 + 661, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][2][4] = new Animator(this.spritesheet, 361, 207 + 661, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][2][5] = new Animator(this.spritesheet, 361, 156 + 661, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][2][6] = new Animator(this.spritesheet, 1279, 156 + 661, 46, 46, 4, 0.1, 5, false, true);
        this.firingAnims[1][1][2][7] = new Animator(this.spritesheet, 1279, 207 + 661, 46, 46, 4, 0.1, 5, false, true);

        // facing right = 1, poison = 1  |  0= idle, 1 = walk/run 2 = jump 3 = sliding
        this.animations[1][1][3] = new Animator(this.spritesheet, 1483, 664, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][1][3][0] = new Animator(this.spritesheet, 1483, 54 + 661, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][1][3][1] = new Animator(this.spritesheet, 1483, 258 + 661, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][1][3][2] = new Animator(this.spritesheet, 1483, 258 + 661, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][1][3][3] = new Animator(this.spritesheet, 1483, 156 + 661, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][1][3][4] = new Animator(this.spritesheet, 1483, 156 + 661, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][1][3][5] = new Animator(this.spritesheet, 1483, 156 + 661, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][1][3][6] = new Animator(this.spritesheet, 1483, 156 + 661, 46, 46, 2, 0.1, 5, false, true);
        this.firingAnims[1][1][3][7] = new Animator(this.spritesheet, 1483, 207 + 661, 46, 46, 2, 0.1, 5, false, true);
      };

    update() {
      const TICK = this.game.clockTick;
      const MIN_MOVING = 4.45;   
      const ACC_MOVING = 133;
      const DEC_MOVING = 183;
      const MAX_MOVING = 93;

      const ACC_SLIDING = 200;
      const DEC_SLIDING = 365;  
      const MAX_SLIDING = 153.75;
 
      const STOP_FALL = 1575;
      const WALK_FALL = 1800;
      const RUN_FALL = 2025;
      const MAX_FALL = 270; 

      const STOP_FALL_SPACE = 450;
      const RUN_FALL_SPACE = 562.5;
  
      if (this.weaponTimer > 0) {
          this.weaponTimer -= (this.weaponTimer <= this.game.clockTick ? this.weaponTimer : this.game.clockTick);
<<<<<<< Updated upstream
      }
=======
        }

      if (this.invulnTimer > 0) {
          this.invulnTimer -= (this.invulnTimer <= this.game.clockTick ? this.invulnTimer : this.game.clockTick);
      }

      if (this.state == 1){
          this.poisonedTimer++;
          if (this.poisonedTimer > 200) {
            this.state = 0;
          }
      }
      
>>>>>>> Stashed changes


      //2 facing (0=left | 1=right) 0= idle, 1 = walk/run 2 = jump 3=sliding  
      //Ground moving to left and right
      if(this.action !== 2){  //no jumping
       //stopped and starting
        if ( Math.abs(this.velocity.x)< MIN_MOVING){   
          this.velocity.x = 0;
          this.action = 0;
          if(this.game.right){
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
      } else {
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
          //collision for landing and jumping on the top of tiles
          if(entity.BB && that.BB.collide(entity.BB)){
            if(that.velocity.y > 0 ){ //landing & jumping 
            if(entity instanceof Tile && that.BB.bottom-that.velocity.y*that.game.clockTick*PARAMS.SCALE <= entity.BB.top){
              that.y = entity.BB.top - 73;   //73  => this.MEGAMAN_HEIGHT= 48; +25
              that.velocity.y =0 ;
              if(that.action =2) that.action = 0;
              that.updateBB();
            }
          } 
          //Collision for top of enemies
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
              that.velocity.x = -40              
            }
            that.updateBB();    
          }

<<<<<<< Updated upstream
          //Collision for jumping and hit the bottom of tiles 
          if (that.velocity.y <0 ){   
            if(entity instanceof Tile && (that.lastBB.top >= entity.BB.bottom) ){
              if(that.BB.collide(entity.BB.left)) {
                that.y = entity.BB.bottom
                that.velocity.y = 0
              } 
              else if (that.BB.collide(entity.BB.right)){
                that.y = entity.BB.bottom;
                that.velocity.y = 0;
              } else {
                that.y = entity.BB.bottom -5;
                that.velocity.y = 0;
              }
=======
            //collision with enemies
            if ((entity instanceof Wheelie || entity instanceof Bulldozer ||
                entity instanceof Gordo || entity instanceof HammerBro ||
                entity instanceof ArmorKnight || entity instanceof Carock || entity instanceof Met) && (that.BB.collide(entity.BB)) && !that.invulnTimer) {
                that.action = 2;
                that.velocity.y = -180;
                if (that.facing == 1) {
                    that.velocity.x = -160;
                }
                if (that.facing == 0) {
                    that.velocity.x = +160;
                }
                if (that.healthPoint > 0) {
                  that.healthPoint -= 3;
                } 
                that.invulnTimer = 1.5;
                //console.log(that.velocity.y);
                
>>>>>>> Stashed changes
            }
            that.updateBB(); 
          }

          //Collision for left side of tiles
          if(that.BB.right - that.velocity.x * that.game.clockTick * PARAMS.SCALE <= entity.BB.left){
            that.x += (entity.BB.left - that.BB.right);
            that.velocity.x = 0
          }

          //Collision for Right side of tiles
          if(that.BB.left - that.velocity.x * that.game.clockTick * PARAMS.SCALE >= entity.BB.right){
            that.x += (entity.BB.right - that.BB.left);
            that.velocity.x = 0
          }
      }
      })

      //for clicking q button
      if (this.game.q == true) {
        if (this.qReleased) {
          this.weaponToggle = (this.weaponToggle == 0 ? this.weaponToggle = 1 : this.weaponToggle = 0);
        }
        this.qReleased = false;
      } else {
        this.qReleased = true;
      }

      //for mouse left clikcing and shooting
      if(this.game.click == true){
          this.firingState = 1;
          var mouseX = this.game.mouse.x;
          var mouseY = this.game.mouse.y;
          var vector = new Vector(mouseX - (this.x + this.FIRE_OFFSET_X), mouseY - (this.y + this.FIRE_OFFSET_Y));
          vector.normalize();
          this.angleRads = getAngle(vector);
          // console.log(this.angleRads);
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
      }
      
      //For mouse right click
      if (this.game.rightclick == true) {
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
      }

      //firing state updates
      if (!this.game.click && !this.game.rightclick) {
          this.firingState = 0;
      }

      //action updates
      if (this.action !== 2) {
      if ((Math.abs(this.velocity.x) >= MIN_MOVING)&& !this.game.shift) this.action = 1;
      else if ((Math.abs(this.velocity.x) >= MIN_MOVING)&& this.game.shift) this.action=3;
      else this.action = 0;
      }        

      // direction updates
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
        this.healthBar.draw(ctx);
    };


}
