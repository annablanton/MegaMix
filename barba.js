class Barba {
    constructor(game, x, y) {
        this.facing = 0;
        this.centerX = x;
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/barba.png");
        this.animations = [];
        this.action = 0; // 0 = moving 1 = opening mouth 2 = attacking
        for (var i = 0; i < 2; i++) { //two directions
            this.animations.push([]);
        }
        this.turnTimer = this.game.timer.gameTime;
        this.animations[0].push(new Animator(this.spritesheet, 110, 50, 48, 17, 1, 0.5, 1, true, true));
        this.animations[0].push(new Animator(this.spritesheet, 12, 50, 48, 17, 3, 0.5, 1, true, true));
        this.animations[0].push(new Animator(this.spritesheet, 12, 50, 48, 17, 1, 0.5, 1, true, true))
        this.animations[1].push(new Animator(this.spritesheet, 249, 50, 48, 17, 1, 0.5, 1, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 249, 50, 48, 17, 3, 0.5, 1, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 347, 50, 48, 17, 1, 0.5, 1, false, true));
        this.child = new BarbaBody(this.game, this, 8, 8);
    }
    update() {
        if (this.game.timer.gameTime - this.turnTimer >= 5) {
            this.facing = (this.facing == 0 ? 1 : 0);
            this.turnTimer = this.game.timer.gameTime;
        }
        this.x = this.centerX + 10 * Math.sin(2 * this.game.timer.gameTime);
        this.child.update();
    }

    draw(ctx) {
        this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        this.child.draw(ctx);
    }
}

class BarbaBody {
    constructor(game, parent, numSections, numSectionsRemaining) {
        this.animations = [];
        this.sectionNum = numSections - numSectionsRemaining + 1;
        Object.assign(this, { game, parent });
        if (parent instanceof Barba) {
            this.centerX = this.parent.centerX + 16 * 2;
            this.x = this.centerX;
            this.y = this.parent.y + 17 * 2;
        } else {
            this.centerX = this.parent.centerX;
            this.x = this.centerX;
            this.y = this.parent.y + 16 * 2;
        }
        if (numSectionsRemaining >= 0) {
            this.child = new BarbaBody(this.game, this, numSections, numSectionsRemaining - 1);
        }
        this.facing = this.parent.facing;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/barba.png");
        this.animations.push(new Animator(this.spritesheet, 82, 72, 19, 16, 1, 0.5, 0, false, true));
        this.animations.push(new Animator(this.spritesheet, 282, 72, 19, 16, 1, 0.5, 0, false, true));
    }

    update() {
        this.facing = this.parent.facing;
        this.x = this.centerX + 10 * Math.sin(2 * this.game.timer.gameTime - this.sectionNum * Math.PI / 7);
        if (this.child) {
            this.child.update();
        }
    }

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        if (this.child) {
            this.child.draw(ctx);
        }
    }
}