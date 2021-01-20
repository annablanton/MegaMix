class Megaman {
    constructor(game, x , y) {
        this.game = game
        this.x = x;
        this.y = y;
        this.facing = 0; //0=left 1=right
        this.state =0; // 0 = normal 1 = poison
        this.action = 0; // 0= idle, 1 = walk/run 2 = jump 3 = sliding 4 = shooting 5=graphing 
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megaman.png");

        this.animations=[];
        this.loadAnimation();
    };

    loadAnimation(){
      for(var i=0; i<2; i++){
        this.animations.push([]); //2 facing (0=left | 1=right)
        for(var j=0; j<2; j++){
          this.animations[i].push([]); //2 condition (0=normal | 1 = poison)
          for(var k=0; k<6; k++){
            this.animations[i][j].push([]); //6states (0= idle| 1 = walk/run|2 = jump |3 = sliding| 4 = shooting| 5=graphing ) 
          }
        }
      }
      //pritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop
      // facing left = 0, normal =0  |  0= idle, 1 = walk/run 2 = jump 3 = sliding 4 = shooting 5=graphing  
      this.animations[0][0][0] = new Animator(this.spritesheet,769, 3, 46, 46, 3, 0.1, 5, false, true);
      this.animations[0][0][1] = new Animator(this.spritesheet,565, 3, 46, 46, 4, 0.1, 5, true, true);
      this.animations[0][0][2] = new Animator(this.spritesheet,361, 3, 46, 46, 4, 0.1, 5, true, true);
      this.animations[0][0][3] = new Animator(this.spritesheet,259, 3, 46, 46, 2, 0.1, 5, true, true);
      this.animations[0][0][4] = new Animator(this.spritesheet,565, 54, 46, 46, 3, 0.1, 5, true, true);
      this.animations[0][0][5] = new Animator(this.spritesheet,565, 105, 46, 46, 3, 0.1, 5, false, true);

      // facing right = 1, normal =0  |  0= idle, 1 = walk/run, 2 = jump, 3 = sliding, 4 = shooting, 5=graphing  
      this.animations[1][0][0] = new Animator(this.spritesheet,922, 3, 46, 46, 3, 0.1, 5, false, true);
      this.animations[1][0][1] = new Animator(this.spritesheet,1075, 3, 46, 46, 4, 0.1, 5, false, true);
      this.animations[1][0][2] = new Animator(this.spritesheet,1279, 3, 46, 46, 4, 0.1, 5, false, true);
      this.animations[1][0][3] = new Animator(this.spritesheet,1483, 3, 46, 46, 2, 0.1, 5, false, true);
      this.animations[1][0][4] = new Animator(this.spritesheet,1075, 54, 46, 46, 3, 0.1, 5, false, true);
      this.animations[1][0][5] = new Animator(this.spritesheet,1075, 105, 46, 46, 3, 0.1, 5, false, true);

      // facing left = 0, poison =1  |  0= idle, 1 = walk/run 2 = jump 3 = sliding 4 = shooting 5=graphing  
      this.animations[0][1][0] = new Animator(this.spritesheet,769, 664, 46, 46, 3, 0.1, 5, false, true);
      this.animations[0][1][1] = new Animator(this.spritesheet,565, 664, 46, 46, 4, 0.1, 5, true, true);
      this.animations[0][1][2] = new Animator(this.spritesheet,361, 664, 46, 46, 4, 0.1, 5, true, true);
      this.animations[0][1][3] = new Animator(this.spritesheet,259, 664, 46, 46, 2, 0.1, 5, true, true);
      this.animations[0][1][4] = new Animator(this.spritesheet,565, 715, 46, 46, 3, 0.1, 5, true, true);
      this.animations[0][1][5] = new Animator(this.spritesheet,565, 766, 46, 46, 3, 0.1, 5, false, true);

      // facing right = 1, poison =1  |  0= idle, 1 = walk/run, 2 = jump, 3 = sliding, 4 = shooting, 5=graphing  
      this.animations[1][1][0] = new Animator(this.spritesheet,922, 664, 46, 46, 3, 0.1, 5, false, true);
      this.animations[1][1][1] = new Animator(this.spritesheet,1075, 664, 46, 46, 4, 0.1, 5, false, true);
      this.animations[1][1][2] = new Animator(this.spritesheet,1279, 664, 46, 46, 4, 0.1, 5, false, true);
      this.animations[1][1][3] = new Animator(this.spritesheet,1483, 664, 46, 46, 2, 0.1, 5, false, true);
      this.animations[1][1][4] = new Animator(this.spritesheet,1075, 715, 46, 46, 3, 0.1, 5, false, true);
      this.animations[1][1][5] = new Animator(this.spritesheet,1075, 766, 46, 46, 3, 0.1, 5, false, true);

    };

    update() {
      if(this.game.right){
        this.facing = 1; //0=left 1=right
        this.action =1;
        this.x +=10;
      }
      if(this.game.left){
          console.log("left true");
          this.facing=0;
          // this.action=1;
          this.action=1;
          this.x -=5;
      } 
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

      if(this.game.shift ==true){
        if(this.action ==0){
          this.action=3;
        } else{this.action=0;}
        this.game.shift =false;
      }

      if(this.game.click == true){
        if(this.action ==0){
          this.action=4;
        } else{this.action=0;}
        this.game.click = false;
      }

      if(this.game.contextmenu == true){
        if(this.action ==0){
          this.action=5;
        } else{this.action=0;}
        this.game.contextmenu=false;
      }

    }
  
    draw(ctx) {

      this.animations[this.facing][this.state][this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
      
    };


}
