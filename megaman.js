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
        this.MAX_GRAPPLE_SPEED = 1000;

        this.facing = 0;                    //0=left 1=right
        this.state =0;                      // 0 = normal 1 = poison
        this.action = 0;                    // 0= idle, 1 = walk/run 2 = jump 3 = sliding 4 = shooting 5=graphing 
        this.firingState = 0;               // 0 = not firing, 1 = shooting weapon, 2 = grappling
        this.healthPoint = this.FULL_HEALTH_POINT;
        this.poisonedTimer = 0;
        this.healthBar = new HealthMeter(this);
        this.landed = 0;

        this.angle = 0;                     //in radians: 0=[0, pi/8)U[15pi/8, 2pi), 1=[pi/8, 3pi/8), 2=[3pi/8, pi/2), 3=[pi/2, 5pi/8), 
        this.angleRads = 0;                 //4=[5pi/8, 7pi/8), 5=[7pi/8, 9pi/8), 6=[9pi/8, 3pi/2), 7=[3pi/2, 15pi/16)
        
        this.FIRE_OFFSET_X = 46;
        this.FIRE_OFFSET_Y = 46;
        this.firedWeapon = false;           //keeps track of if megaman can fire another pellet yet
        this.weaponTimer = false;
        this.weaponToggle = 0;              //0 = pellet, 1 = laser
        this.invulnTimer = 0; //increased when megaman is hit; if > 0, megaman is invulnerable
        this.rightClickReleased = true;

        this.velocity = {x: 0, y: 0};
        this.fallAcc = 562.5;
        this.grapplingHook = null;

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
        this.animations[0][1][2] = new Animator(this.spritesheet, 361, 664, 46, 46, 4, 0.1, 5, true, true);
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
 
      const STOP_FALL = 800;
      const WALK_FALL = 1100;
      const RUN_FALL = 1000;
      const MAX_FALL = 270; 

      const STOP_FALL_SPACE = 450;
        const RUN_FALL_SPACE = 562.5;
  
      if (this.weaponTimer > 0) {
          this.weaponTimer -= (this.weaponTimer <= this.game.clockTick ? this.weaponTimer : this.game.clockTick);
        }

      if (this.invulnTimer > 0) {
          this.invulnTimer -= (this.invulnTimer <= this.game.clockTick ? this.invulnTimer : this.game.clockTick);
        }

        if (this.grapplingHook && this.grapplingHook.pulling == 1) {
            this.landed = 0;
        }

      if (this.state == 1){
        this.poisonedTimer++;
        this.game.flipControl = true;
        if (this.poisonedTimer > 150) {
          this.state = 0;
          this.game.flipControl = false;
        }
        }

        if (this.grapplingHook && this.grapplingHook.removeFromWorld && this.firingState == 2) {
            this.firingState = 0;
        }


      //2 facing (0=left | 1=right) 0= idle, 1 = walk/run 2 = jump 3=sliding  
      //Ground moving to left and right
        if (!(this.firingState == 2 && this.grapplingHook.pulling == 1)) {
            if (this.action !== 2) {  //no jumping
                //stopped and starting
                if (Math.abs(this.velocity.x) < MIN_MOVING) {
                    this.velocity.x = 0;
                    this.action = 0;
                    if (this.game.right) {
                        this.velocity.x += MIN_MOVING;
                    }
                    if (this.game.left) {
                        this.velocity.x -= MIN_MOVING;
                    }
                }
                //moving to right
                else if (Math.abs(this.velocity.x) >= MIN_MOVING) {
                    if (this.facing === 1) {
                        if (this.game.right && !this.game.left) {
                            //when user click shft for sliding
                            if (this.game.shift) {
                                this.velocity.x += ACC_SLIDING * TICK;
                            } //when user just keep moving 
                            else this.velocity.x += ACC_MOVING * TICK;
                        } // when user click left button during moving to right 
                        else if (this.game.left && !this.game.right) {
                            this.velocity.x -= ACC_SLIDING * TICK;
                        } // when user doesn't put any key during run to right side 
                        else {
                            this.velocity.x -= DEC_MOVING * TICK;
                        }
                    }
                    // For left facing
                    if (this.facing === 0) {
                        if (this.game.left && !this.game.right) {
                            if (this.game.shift) {
                                this.velocity.x -= ACC_SLIDING * TICK;
                            } else
                                this.velocity.x -= ACC_MOVING * TICK;
                        } else if (this.game.right && !this.game.left) {
                            this.velocity.x += DEC_SLIDING * TICK;
                        } else {
                            this.velocity.x += DEC_MOVING * TICK;
                        }
                    }
                }

                this.velocity.y += this.fallAcc * TICK;

                //for jumping
                if (this.game.space) {
                    if (Math.abs(this.velocity.x) < 16) {
                        this.velocity.y = -240;
                        this.fallAcc = STOP_FALL;
                    } else if (Math.abs(this.velocity.x) < 40) {
                        this.velocity.y = -240;
                        this.fallAcc = WALK_FALL;
                    } else {
                        this.velocity.y = -300;
                        this.fallAcc = RUN_FALL;
                    }
                    this.action = 2;
                }
            } else {
                //vertical phycis
                if (this.velocity.y < 0 && this.game.space) {
                    if (this.fallacc === STOP_FALL) this.velocity.y -= (STOP_FALL - STOP_FALL_SPACE) * TICK;
                    if (this.fallacc === RUN_FALL) this.velocity.y -= (RUN_FALL - RUN_FALL_SPACE) * TICK;
                }
                this.velocity.y += this.fallAcc * TICK;

                //horizontal phycis
                if (this.game.right && !this.game.left) {
                    this.velocity.x += ACC_MOVING * TICK;
                } else if (this.game.left && !this.game.right) {
                    this.velocity.x -= ACC_MOVING * TICK;
                }
            }
            // setting maximum
            if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
            if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

            if (this.velocity.x >= MAX_SLIDING) this.velocity.x = MAX_SLIDING;
            if (this.velocity.x <= -MAX_SLIDING) this.velocity.x = -MAX_SLIDING;
            if (this.velocity.x >= MAX_MOVING && !this.game.shift) this.velocity.x = MAX_MOVING;
            if (this.velocity.x <= -MAX_MOVING && !this.game.shift) this.velocity.x = -MAX_MOVING;
        } else {
            if (this.game.shift) {
                this.firingState = 0;
                this.grapplingHook.removeFromWorld = true;
                this.grapplingHook.pulling = 0;
                this.grapplingHook.retracting = 0;
            } else {
                var megamanAngle = Math.atan2(this.grapplingHook.y - (this.y + this.FIRE_OFFSET_Y), this.grapplingHook.x - (this.x + this.FIRE_OFFSET_X));
                if (megamanAngle < 0) megamanAngle = Math.PI * 2 + megamanAngle;
                this.angleRads = megamanAngle;
                if ((this.angleRads >= 0 && this.angleRads < Math.PI / 8) || (this.angleRads >= 15 * Math.PI / 8)) this.angle = 0;
                else if (this.angleRads < Math.PI / 2) this.angle = 1;
                else if (this.angleRads < 7 * Math.PI / 8) this.angle = 2;
                else if (this.angleRads < 9 * Math.PI / 8) this.angle = 3;
                else if (this.angleRads < 11 * Math.PI / 8) this.angle = 4;
                else if (this.angleRads < 3 * Math.PI / 2) this.angle = 5;
                else if (this.angleRads < 13 * Math.PI / 8) this.angle = 6;
                else this.angle = 7;
                this.action = 2;
                this.velocity.x += (this.grapplingHook.SPEED * Math.cos(megamanAngle) * this.game.clockTick * PARAMS.SCALE);
                this.velocity.y += (this.grapplingHook.SPEED * Math.sin(megamanAngle) * this.game.clockTick * PARAMS.SCALE);
                var speed = distance(this.velocity.x, this.velocity.y, 0, 0);
                if (speed > this.MAX_GRAPPLE_SPEED) {
                    this.velocity.x *= MAX_SPEED / speed;
                    this.velocity.y *= MAX_SPEED / speed;
                }
            }
        }
       
      
      //update x and y
      this.x += this.velocity.x * TICK * PARAMS.SCALE;
      this.y += this.velocity.y * TICK * PARAMS.SCALE;
      this.updateBB();
      

        //collision for megaman
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) { // falling and landing on the block
                    if (entity instanceof Tile && (that.BB.bottom - that.velocity.y * that.game.clockTick * PARAMS.SCALE) <= entity.BB.top) { // was above last tick
                        that.y = entity.BB.top - 72.3;
                        that.velocity.y = 0;
                        if (that.action == 2) that.action = 0;
                        that.updateBB();
                        if (!that.grapplingHook || that.grapplingHook.pulling != 1) {
                            that.landed = 1;
                        }
                    }
                    //that.velocity.y === 0;
                }
            }
            //jumping and Hit bottome of tile
            if (that.velocity.y < 0) {
                if (entity instanceof Tile && (that.BB.top - that.velocity.y * that.game.clockTick * PARAMS.SCALE) >= entity.BB.bottom 
                    && that.BB.collide(entity.leftBB) && that.BB.collide(entity.rightBB)) { 
                    that.velocity.y = 0;
                    if (that.firingState == 2) {
                        that.grapplingHook.removeFromWorld = true;
                        that.firingState = 0;
                        that.grapplingHook.pulling = 0;
                        that.grapplingHook.retracting = 0;
                    }
                    
                }
            }
            //Hit left or right side of tile
            if (entity instanceof Tile
                && that.BB.collide(entity.topBB) && that.BB.collide(entity.bottomBB)) {
                console.log("side collision");
                if (that.BB.collide(entity.leftBB)) {
                    that.x = entity.BB.left - 71.8;
                    if (that.velocity.x > 0) that.velocity.x = 0;
                } else if (that.BB.collide(entity.rightBB)) {
                    that.x = entity.BB.right - 22;
                    if (that.velocity.x < 0) that.velocity.x = 0;
                }
                that.updateBB();
            }

            //collision with enemies
            if ((entity instanceof Wheelie || entity instanceof Bulldozer ||
                entity instanceof Gordo || entity instanceof HammerBro ||
                entity instanceof ArmorKnight || entity instanceof Carock || entity instanceof Met) && (that.BB.collide(entity.BB)) && !that.invulnTimer) {
                that.action = 2;
                that.velocity.y = -180;
                that.healthPoint -= 3; // Can have different damage depends on the enemy
                
                if (that.facing == 1) {
                    that.velocity.x = -160;
                  }
                if (that.facing == 0) {
                    that.velocity.x = +160;
                }
                that.invulnTimer = 1.5;
                //console.log(that.velocity.y);
            }that.updateBB();

        });


      //for clicking q button (weapon toggling)
      if (this.game.q == true) {
        if (this.qReleased) {
          this.weaponToggle = (this.weaponToggle == 0 ? this.weaponToggle = 1 : this.weaponToggle = 0);
        }
        this.qReleased = false;
      } else {
        this.qReleased = true;
      }

      //for mouse left clikcing and shooting
        if (this.game.click == true) {
            if (!(this.firingState == 2)) {
                this.firingState = 1;
                var mouseX = this.game.mouse.x;
                var mouseY = this.game.mouse.y;
                var vector = new Vector(mouseX - (this.x + this.FIRE_OFFSET_X - this.game.camera.x), mouseY - (this.y + this.FIRE_OFFSET_Y-this.game.camera.y));
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
                                this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, Math.PI / 5, this.velocity.x));
                            } else if (this.angleRads >= Math.PI / 2 && this.angleRads <= 4 * Math.PI / 5) {
                                var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, 4 * Math.PI / 5);
                                this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, 4 * Math.PI / 5, this.velocity.x));

                            } else {
                                var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, this.angleRads);
                                this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, this.angleRads, this.velocity.x));
                            }
                        } else if (this.facing == 1) {
                            if (this.angleRads >= Math.PI / 5 && this.angleRads < 11 * Math.PI / 12) {
                                var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, Math.PI / 5);
                                this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, Math.PI / 5, this.velocity.x));
                            } else if (this.angleRads >= 11 * Math.PI / 12 && this.angleRads <= 3 * Math.PI / 2) {
                                var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, 3 * Math.PI / 2);
                                this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, 3 * Math.PI / 2, this.velocity.x));

                            } else {
                                var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, this.angleRads);
                                this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, this.angleRads, this.velocity.x));
                            }
                        } else {
                            if (this.angleRads <= 4 * Math.PI / 5 && this.angleRads > Math.PI / 12) {
                                var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, 4 * Math.PI / 5);
                                this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, 4 * Math.PI / 5, this.velocity.x));
                            } else if ((this.angleRads <= Math.PI / 12 && this.angleRads >= 0) || (this.angleRads >= 3 * Math.PI / 2 && this.angleRads <= 2 * Math.PI)) {
                                var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, 3 * Math.PI / 2);
                                this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, 3 * Math.PI / 2, this.velocity.x));
                            } else {
                                var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, this.angleRads);
                                this.game.addEntity(new Pellet(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y, this.angleRads, this.velocity.x));
                            }
                        }
                        this.weaponTimer = 0.2;
                    }
                } else {
                    if (!this.weaponTimer) {
                        //this.game.addEntity(new Laser(this.game, this));
                        //if (this.action != 3) {
                        //    if (this.angleRads >= Math.PI / 5 && this.angleRads <= Math.PI / 2) {
                        //        var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, Math.PI / 5);
                        //        var laserOrigin = findEllipsePoint(40, 25, Math.PI / 5);
                        //        this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x,
                        //            this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, Math.PI / 5, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                        //    } else if (this.angleRads >= Math.PI / 2 && this.angleRads <= 4 * Math.PI / 5) {
                        //        var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, 4 * Math.PI / 5);
                        //        var laserOrigin = findEllipsePoint(40, 25, 4 * Math.PI / 5);
                        //        this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x,
                        //            this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, 4 * Math.PI / 5, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));

                        //    } else {
                        //        var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, this.angleRads);
                        //        var laserOrigin = findEllipsePoint(40, 25, this.angleRads);
                        //        this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x,
                        //            this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, this.angleRads, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                        //    }
                        //} else if (this.facing == 1) {
                        //    if (this.angleRads >= Math.PI / 5 && this.angleRads < 11 * Math.PI / 12) {
                        //        var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, Math.PI / 5);
                        //        var laserOrigin = findEllipsePoint(40, 25, Math.PI / 5);
                        //        this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x,
                        //            this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, Math.PI / 5, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                        //    } else if (this.angleRads >= 11 * Math.PI / 12 && this.angleRads <= 3 * Math.PI / 2) {
                        //        var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, 3 * Math.PI / 2);
                        //        var laserOrigin = findEllipsePoint(40, 25, 3 * Math.PI / 2);
                        //        this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x,
                        //            this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, 3 * Math.PI / 2, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));


                        //    } else {
                        //        var laserOrigin = findEllipsePoint(40, 25, this.angleRads);
                        //        var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, this.angleRads);
                        //        this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x,
                        //            this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, this.angleRads, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                        //    }
                        //} else {
                        //    if (this.angleRads <= 4 * Math.PI / 5 && this.angleRads > Math.PI / 12) {
                        //        var laserOrigin = findEllipsePoint(40, 25, 4 * Math.PI / 5);
                        //        var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, 4 * Math.PI / 5);
                        //        this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x,
                        //            this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, 4 * Math.PI / 5, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                        //    } else if ((this.angleRads <= Math.PI / 12 && this.angleRads >= 0) || (this.angleRads >= 3 * Math.PI / 2 && this.angleRads <= 2 * Math.PI)) {
                        //        var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, 3 * Math.PI / 2);
                        //        var laserOrigin = findEllipsePoint(40, 25, 3 * Math.PI / 2);
                        //        this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x,
                        //            this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, 3 * Math.PI / 2, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                        //    } else {
                        //        var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH / 2, 25 + this.LASER_HEIGHT / 2, this.angleRads);
                        //        var laserOrigin = findEllipsePoint(40, 25, this.angleRads);
                        //        this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2 + ellipsePoint.x,
                        //            this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y, this.angleRads, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                        //    }
                        //}
                        if (this.action != 3) {
                            if (this.angleRads >= Math.PI / 5 && this.angleRads <= Math.PI / 2) {
                                var laserOrigin = findEllipsePoint(40, 25, Math.PI / 5);
                                this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X,
                                    this.y + this.FIRE_OFFSET_Y, Math.PI / 5, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                            } else if (this.angleRads >= Math.PI / 2 && this.angleRads <= 4 * Math.PI / 5) {
                                var laserOrigin = findEllipsePoint(40, 25, 4 * Math.PI / 5);
                                this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X,
                                    this.y + this.FIRE_OFFSET_Y, 4 * Math.PI / 5, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                                //this.x = this.x + this.FIRE_OFFSET_X - this.laserLength / 2 + ellipsePoint.x;
                                //this.y = this.y + this.FIRE_OFFSET_Y - this.laserLength / 2 + ellipsePoint.y;
                                //this.laserOriginX = laserOrigin.x + this.x + this.FIRE_OFFSET_X;
                                //this.laserOriginY = laserOrigin.y + this.y + this.FIRE_OFFSET_Y;

                            } else {
                                var laserOrigin = findEllipsePoint(40, 25, this.angleRads);
                                this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X,
                                    this.y + this.FIRE_OFFSET_Y, this.angleRads, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                                //this.y + this.FIRE_OFFSET_Y - this.laserLength / 2 + ellipsePoint.y, this.angleRads, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                                //this.laserOriginX = laserOrigin.x + this.x + this.FIRE_OFFSET_X;
                                //this.laserOriginY = laserOrigin.y + this.y + this.FIRE_OFFSET_Y;
                            }
                        } else if (this.facing == 1) {
                            if (this.angleRads >= Math.PI / 5 && this.angleRads < 11 * Math.PI / 12) {
                                var laserOrigin = findEllipsePoint(40, 25, Math.PI / 5);
                                this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X,
                                    this.y + this.FIRE_OFFSET_Y, Math.PI / 5, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                            } else if (this.angleRads >= 11 * Math.PI / 12 && this.angleRads <= 3 * Math.PI / 2) {
                                var laserOrigin = findEllipsePoint(40, 25, 3 * Math.PI / 2);
                                this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X,
                                    this.y + this.FIRE_OFFSET_Y, 3 * Math.PI / 2, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                            } else {
                                var laserOrigin = findEllipsePoint(40, 25, this.angleRads);
                                this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X,
                                    this.y + this.FIRE_OFFSET_Y, this.angleRads, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                            }
                        } else {
                            if (this.angleRads <= 4 * Math.PI / 5 && this.angleRads > Math.PI / 12) {
                                var laserOrigin = findEllipsePoint(40, 25, 4 * Math.PI / 5);
                                //this.angle = 4 * Math.PI / 5;
                                this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X,
                                    this.y + this.FIRE_OFFSET_Y, 4 * Math.PI / 5, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                                //this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X - this.laserLength / 2 + ellipsePoint.x,
                                //    this.y + this.FIRE_OFFSET_Y - this.laserLength / 2 + ellipsePoint.y, 4 * Math.PI / 5, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                            } else if ((this.angleRads <= Math.PI / 12 && this.angleRads >= 0) || (this.angleRads >= 3 * Math.PI / 2 && this.angleRads <= 2 * Math.PI)) {
                                var laserOrigin = findEllipsePoint(40, 25, 3 * Math.PI / 2);
                                //this.angle = 3 * Math.PI / 2;
                                this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X,
                                    this.y + this.FIRE_OFFSET_Y, 3 * Math.PI / 2, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                            } else {
                                var laserOrigin = findEllipsePoint(40, 25 + 16, this.angleRads);
                                this.game.addEntity(new Laser(this.game, this.x + this.FIRE_OFFSET_X,
                                    this.y + this.FIRE_OFFSET_Y, this.angleRads, laserOrigin.x + this.x + this.FIRE_OFFSET_X, laserOrigin.y + this.y + this.FIRE_OFFSET_Y));
                            }
                        }
                        this.weaponTimer = 1;
                    }
                }
            }
      }
      
      //For mouse right click
        if (this.game.rightclick == true && this.rightClickReleased) {
            this.rightClickReleased = false;
            var mouseX = this.game.mouse.x;
            var mouseY = this.game.mouse.y;
            if (!(this.firingState == 2 || this.landed == 0)) {
                this.firingState = 2;

                var vector = new Vector(mouseX - (this.x + 46 - this.game.camera.x), mouseY - (this.y + 46- this.game.camera.y));
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
                if (this.action != 3) {
                    if (this.angleRads >= Math.PI / 5 && this.angleRads <= Math.PI / 2) {
                        var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, Math.PI / 5);
                        this.grapplingHook = new GrapplingHook(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y - 14, Math.PI / 5, this);
                        this.game.addEntity(this.grapplingHook);
                    } else if (this.angleRads >= Math.PI / 2 && this.angleRads <= 4 * Math.PI / 5) {
                        var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, 4 * Math.PI / 5);
                        this.grapplingHook = new GrapplingHook(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y - 14, 4 * Math.PI / 5, this);
                        this.game.addEntity(this.grapplingHook);

                    } else {
                        var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, this.angleRads);
                        this.grapplingHook = new GrapplingHook(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y - 14, this.angleRads, this);
                        this.game.addEntity(this.grapplingHook);
                    }
                } else if (this.facing == 1) {
                    if (this.angleRads >= Math.PI / 5 && this.angleRads < 11 * Math.PI / 12) {
                        var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, Math.PI / 5);
                        this.grapplingHook = new GrapplingHook(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y - 14, Math.PI / 5, this);
                        this.game.addEntity(this.grapplingHook);
                    } else if (this.angleRads >= 11 * Math.PI / 12 && this.angleRads <= 3 * Math.PI / 2) {
                        var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, 3 * Math.PI / 2);
                        this.game.addEntity(this.grapplingHook);

                    } else {
                        var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, this.angleRads);
                        this.grapplingHook = new GrapplingHook(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y - 14, this.angleRads, this);
                        this.game.addEntity(this.grapplingHook);
                    }
                } else {
                    if (this.angleRads <= 4 * Math.PI / 5 && this.angleRads > Math.PI / 12) {
                        var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, 4 * Math.PI / 5);
                        this.grapplingHook = new GrapplingHook(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y - 14, 4 * Math.PI / 5, this);
                        this.game.addEntity(this.grapplingHook);
                    } else if ((this.angleRads <= Math.PI / 12 && this.angleRads >= 0) || (this.angleRads >= 3 * Math.PI / 2 && this.angleRads <= 2 * Math.PI)) {
                        var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, 3 * Math.PI / 2);
                        this.grapplingHook = new GrapplingHook(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y - 14, 3 * Math.PI / 2, this);
                        this.game.addEntity(this.grapplingHook);
                    } else {
                        var ellipsePoint = findEllipsePoint(40 + this.PELLET_WIDTH / 2, 25 + this.PELLET_HEIGHT / 2, this.angleRads);
                        this.grapplingHook = new GrapplingHook(this.game, this.x + this.FIRE_OFFSET_X - this.PELLET_WIDTH / 2 + ellipsePoint.x, this.y + this.FIRE_OFFSET_Y - this.PELLET_HEIGHT / 2 + ellipsePoint.y - 14, this.angleRads, this);
                        this.game.addEntity(this.grapplingHook);
                    }
                }
            }
        }

        if (!this.game.rightclick) {
            this.rightClickReleased = true;
        }
      //firing state updates
      if (!this.game.click && !this.game.rightclick && !(this.firingState == 2)) {
          this.firingState = 0;
      }

      //action updates
        if (this.action !== 2) {
            if ((Math.abs(this.velocity.x) >= MIN_MOVING) && !this.game.shift) this.action = 1;
            else if ((Math.abs(this.velocity.x) >= MIN_MOVING) && this.game.shift) this.action = 3;
            else this.action = 0;
        }

      // direction updates
        if (this.velocity.x < 0) this.facing = 0;
        if (this.velocity.x > 0) this.facing = 1;

        //console.log(that.velocity.y);
    }

         
      draw(ctx) {
        if (this.firingState) this.firingAnims[this.facing][this.state][this.action][this.angle].drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 2);
        else this.animations[this.facing][this.state][this.action].drawFrame(this.game.clockTick, ctx, this.x- this.game.camera.x, this.y- this.game.camera.y, 2);
        if (PARAMS.DEBUG) {
            //ctx.beginPath();
            //ctx.ellipse(this.x + this.FIRE_OFFSET_X, this.y + this.FIRE_OFFSET_STANDING_Y, 40, 25, 0, 0, this.angleRads);
            //ctx.stroke();
            var ellipsePoint = findEllipsePoint(40 + this.LASER_WIDTH/2, 25 + this.LASER_HEIGHT/2, this.angleRads);
            ctx.beginPath();
            ctx.fillRect(this.x + this.FIRE_OFFSET_X - 2-this.game.camera.x, this.y + this.FIRE_OFFSET_Y - 2- this.game.camera.y, 4, 4);
            ctx.fillRect(this.x + this.FIRE_OFFSET_X - this.LASER_WIDTH / 2  + ellipsePoint.x - 1-this.game.camera.x, this.y + this.FIRE_OFFSET_Y - this.LASER_HEIGHT / 2 + ellipsePoint.y - 1- this.game.camera.y, 2, 2);
        }
        this.healthBar.draw(ctx);
      
    };


}
