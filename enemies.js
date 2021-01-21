class Met {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");

        this.animations = [];
        for (var i = 0; i < 2; i++) { //two directions
            this.animations.push([]);
        }
        //animations do not depend on state

        this.animations[0][0] = new Animator(this.spritesheet, 138, 36, 20, 19, 2, 0.09 * 3, 5, true, true); //walk
        this.animations[0][1] = new Animator(this.spritesheet, 116, 36, 20, 19, 1, 0.09 * 3, 5, false, true) //stationary/dead
        this.animations[0][2] = new Animator(this.spritesheet, 72, 36, 18, 19, 3, 0.09 * 3, 4, true, true) //hide
        this.animations[0][3] = new Animator(this.spritesheet, 72, 36, 20, 19, 1, 0.09 * 2, 4, false, true) //hidden
        this.animations[0][4] = new Animator(this.spritesheet, 72, 36, 18, 19, 3, 0.09 * 3, 4, false, true) //unhide

        this.animations[1][0] = new Animator(this.spritesheet, 188, 36, 20, 19, 2, 0.09 * 3, 5, false, true); //walk
        this.animations[1][1] = new Animator(this.spritesheet, 236, 36, 20, 19, 1, 0.09 * 3, 5, false, true) //stationary/dead
        this.animations[1][2] = new Animator(this.spritesheet, 236, 36, 18, 19, 3, 0.09 * 3, 4, false, true) //hide
        this.animations[1][3] = new Animator(this.spritesheet, 280, 36, 20, 19, 1, 0.09 * 2, 4, false, true) //hidden
        this.animations[1][4] = new Animator(this.spritesheet, 236, 36, 18, 19, 3, 0.09 * 3, 4, true, true) //unhide
    }
    update() {

    }

    draw(ctx) {
        this.animations[0][0].drawFrame(this.game.clockTick, ctx, 16, 16, 2);
        this.animations[0][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 5, 2);
        this.animations[0][2].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 10, 2);
        this.animations[0][3].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 15, 2);
        this.animations[0][4].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 20, 2);

        this.animations[1][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16, 2);
        this.animations[1][1].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 5, 2);
        this.animations[1][2].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 10, 2);
        this.animations[1][3].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 15, 2);
        this.animations[1][4].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 20, 2);
    }
}

class Carock {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");

        this.animations = [];
        for (var i = 0; i < 2; i++) { //two directions
            this.animations.push([]);
        }
        this.animations[0][0] = new Animator(this.spritesheet, 138, 197, 20, 47, 2, 0.09 * 3, 4, true, true); //walk
        this.animations[1][0] = new Animator(this.spritesheet, 188, 197, 20, 47, 2, 0.09 * 3, 4, false, true) //fire

        this.animations[0][1] = new Animator(this.spritesheet, 102, 197, 32, 47, 1, 0.09 * 3, 4, false, true);
        this.animations[1][1] = new Animator(this.spritesheet, 236, 197, 32, 47, 1, 0.09 * 3, 4, false, true);
    }
    update() {

    }

    draw(ctx) {
        this.animations[0][0].drawFrame(this.game.clockTick, ctx, 16, 16, 2);
        this.animations[1][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16, 2);

        this.animations[0][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 10, 2);
        this.animations[1][1].drawFrame(this.game.clockTick, ctx, 16+16*5, 16 + 16 * 10, 2);
    }
}

class Bulldozer {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");

        this.animations = [];
        for (var i = 0; i < 2; i++) { //two directions
            this.animations.push([]);
        }

        this.animations[0][0] = new Animator(this.spritesheet, 97, 126, 40, 64, 2, 0.09 * 3, 5, true, true); //slow roll
        this.animations[0][1] = new Animator(this.spritesheet, 97, 126, 40, 64, 2, 0.09, 5, true, true); //fast roll
        this.animations[0][2] = new Animator(this.spritesheet, 142, 126, 40, 64, 1, 0.09, 5, true, true); //stationary/dead
        this.animations[1][0] = new Animator(this.spritesheet, 188, 126, 40, 64, 2, 0.09 * 3, 5, false, true); //slow roll
        this.animations[1][1] = new Animator(this.spritesheet, 188, 126, 40, 64, 2, 0.09, 5, false, true); //fast roll
        this.animations[1][2] = new Animator(this.spritesheet, 188, 126, 40, 64, 1, 0.09, 5, false, true); //stationary/dead
    }
    update() {

    }

    draw(ctx) {
        console.log(this.animations[0][0][0]);
        this.animations[0][0].drawFrame(this.game.clockTick, ctx, 16, 16, 2);
        this.animations[0][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 10, 2);
        this.animations[0][2].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 20, 2);
        this.animations[1][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 7, 16, 2);
        this.animations[1][1].drawFrame(this.game.clockTick, ctx, 16 + 16 * 7, 16 + 16 * 10, 2);
        this.animations[1][2].drawFrame(this.game.clockTick, ctx, 16 + 16 * 7, 16 + 16 * 20, 2);
    }
}

class ArmorKnight {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");

        this.animations = [];
        for (var i = 0; i < 2; i++) { //two directions
            this.animations.push([]);
        }

        this.animations[0][0] = new Animator(this.spritesheet, 65, 65, 24, 32, 3, 0.09 * 3, 2, true, true); // walk
        this.animations[0][1] = new Animator(this.spritesheet, 143, 65, 39, 32, 1, 0.09 * 3, 0, false, true); //spear attack
        this.animations[1][0] = new Animator(this.spritesheet, 229, 65, 24, 32, 3, 0.09 * 3, 2, false, true); // walk
        this.animations[1][1] = new Animator(this.spritesheet, 188, 65, 39, 32, 1, 0.09 * 3, 0, false, true); //spear attack
    }
    update() {

    }

    draw(ctx) {
        this.animations[0][0].drawFrame(this.game.clockTick, ctx, 16, 16, 2);
        this.animations[0][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 5, 2);
        this.animations[1][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16, 2);
        this.animations[1][1].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 5, 2);
    }
}

class HammerBro {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");

        this.animations = [];
        for (var i = 0; i < 2; i++) {
            this.animations.push([]);
        }
        this.animations[0][0] = new Animator(this.spritesheet, 110, 5, 18, 24, 4, 0.09 * 3, 0, false, true); // attack left
        this.animations[0][1] = new Animator(this.spritesheet, 110, 5, 18, 24, 1, 0.09 * 3, 0, false, true); // idle left
        this.animations[1][0] = new Animator(this.spritesheet, 188, 5, 18, 24, 4, 0.09 * 3, 0, true, true); // attack right
        this.animations[1][1] = new Animator(this.spritesheet, 242, 5, 18, 24, 1, 0.09 * 3, 0, false, true); // idle right
    }
    update() {
        
    }

    draw(ctx) {
        this.animations[0][0].drawFrame(this.game.clockTick, ctx, 16, 16, 2);
        this.animations[0][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 5, 2);
        this.animations[1][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16, 2);
        this.animations[1][1].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 5, 2);
    }
}

class Gordo {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");

        this.animation = new Animator(this.spritesheet, 146, 255, 16, 16, 2, 0.09 * 3, 4, true, true);

    }
    update() {

    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, 16, 16, 3);
    }
}

class Wheelie {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/megamix_enemies.png");

        this.animations = [];
        for (var i = 0; i < 2; i++) { //two directions (left right)
            this.animations.push([]);
            this.animations[i].push([]);
            for (var j = 0; j < 3; j++) { //three states (idle, aggressive, dead)
                this.animations[i].push([]);
            }
        }

        this.loadAnimations();

    }
    update() {

    }

    draw(ctx) {
        this.animations[0][0][0].drawFrame(this.game.clockTick, ctx, 16, 16, 3);
        this.animations[1][0][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16, 3);

        this.animations[0][0][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 5, 3);
        this.animations[1][0][1].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 5, 3);

        this.animations[0][1][0].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 10, 3);
        this.animations[1][1][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 10, 3);
        this.animations[0][1][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 15, 3);
        this.animations[1][1][1].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 15, 3);

        this.animations[0][2][0].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 20, 3);
        this.animations[1][2][0].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 20, 3);
        this.animations[0][2][1].drawFrame(this.game.clockTick, ctx, 16, 16 + 16 * 25, 3);
        this.animations[1][2][1].drawFrame(this.game.clockTick, ctx, 16 + 16 * 5, 16 + 16 * 25, 3);

    }

    loadAnimations() {
        this.animations[0][0][0] = new Animator(this.spritesheet, 127, 102, 16, 16, 2, 0.09 * 2, 4, true, true);
        this.animations[1][0][0] = new Animator(this.spritesheet, 207, 102, 16, 16, 2, 0.09 * 2, 4, false, true);
        this.animations[0][0][1] = new Animator(this.spritesheet, 167, 102, 16, 16, 1, 0.09 * 2, 4, false, true);
        this.animations[1][0][1] = new Animator(this.spritesheet, 188, 102, 16, 16, 1, 0.09 * 2, 4, false, true);

        this.animations[0][1][0] = new Animator(this.spritesheet, 127, 102, 16, 16, 2, 0.09, 4, true, true);
        this.animations[1][1][0] = new Animator(this.spritesheet, 207, 102, 16, 16, 2, 0.09, 4, false, true);
        this.animations[0][1][1] = new Animator(this.spritesheet, 167, 102, 16, 16, 1, 0.09, 4, false, true);
        this.animations[1][1][1] = new Animator(this.spritesheet, 188, 102, 16, 16, 1, 0.09, 4, false, true);

        this.animations[0][2][0] = new Animator(this.spritesheet, 107, 102, 16, 16, 1, 0.09, 4, false, true);
        this.animations[1][2][0] = new Animator(this.spritesheet, 247, 102, 16, 16, 1, 0.09, 4, false, true);
        this.animations[0][2][1] = new Animator(this.spritesheet, 107, 102, 16, 16, 1, 0.09, 4, false, true);
        this.animations[1][2][1] = new Animator(this.spritesheet, 247, 102, 16, 16, 1, 0.09, 4, false, true);

    }
}