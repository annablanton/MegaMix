// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011
class GameEngine {
    constructor() {
        this.entities = [];
        // this.showOutlines = false;
        // this.surfaceWidth = null;
        // this.surfaceHeight = null;

        this.ctx = null;
        //direction
        this.left=false;
        this.right=false;
        this.up=false;
        this.down=false;
        //jump, slide and weapon 
        this.space =false;
        this.shift=false;
        this.q=false;
        //mouse
        this.click=false;
        this.mouse = false;
        this.qReleased = true;
        //this.contextmenu =false;

    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();

    };

    start() {
        var that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    };

    startInput() {
        var that = this;
        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return { x: x, y: y };
        }

        this.ctx.canvas.addEventListener("mousemove", function (e) {
            //console.log(getXandY(e));
            that.mouse = getXandY(e);
        }, false);

        //this.ctx.canvas.addEventListener("click", function (e) {
        //    //console.log(getXandY(e)+"left click");
        //    that.click = getXandY(e);
        //    that.click = true;
        //}, false);

        this.ctx.canvas.addEventListener("contextmenu", function (e) {
            //console.log(getXandY(e)+"right click");
            //that.rightclick = true;
            //that.contextmenu = true;
            e.preventDefault();
        }, false);

        this.ctx.canvas.addEventListener("mousedown", function (e) {
            console.log("mouse click");
            switch (event.button) {
                case 0:
                    that.click = true;
                    break;
                case 2:
                    that.rightclick = true;
                    break;
            }
        })

        this.ctx.canvas.addEventListener("mouseup", function (e) {
            switch (event.button) {
                case 0:
                    console.log("left mouse up");
                    that.click = false;
                    break;
                case 2:
                    console.log("right mouse up");
                    that.rightclick = false;
                    break;
            }
        })



        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = true;
                    //console.log("left");
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = true;
                    //console.log("right");
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = true;
                    //console.log("upupup");
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = true;
                    break;
                case "Space":
                    e.preventDefault();
                    that.space = true;
                    //console.log("jump");
                    break;
                case "ShiftLeft":
                    that.shift = true;
                    //console.log("slide");
                    break;
                case "KeyQ":
                    that.q = true;
                    //console.log("weapon change");
                    break;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = false;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = false;
                    break;
                case "Space":
                    that.space = false;
                    console.log("jump");
                    break;
                case "ShiftLeft":
                    that.shift = false;
                    console.log("slide");
                    break;
                case "KeyQ":
                    that.q = false;
                    console.log("weapon change");
                    break;
            }
        }, false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
    };

    update() {
        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };
};