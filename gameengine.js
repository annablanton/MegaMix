// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011
class GameEngine {
    constructor() {
        this.entities = [];
        this.nonCollidableEntities = [];
        this.ctx = null;
        this.left=false; //direction
        this.right=false;
        this.up=false;
        this.down=false;
        this.space =false;  //jumping
        this.shift=false;   //sliding
        this.q=false;       //weapon switching 
        this.click=false;   //for mouse
        this.mouse = false;
        this.qReleased = true;
        this.flipControl = false;
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

        this.ctx.canvas.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        }, false);

        this.ctx.canvas.addEventListener("mousedown", function (e) {
            //console.log("mouse click");
            switch (event.button) {
                case 0:
                    that.click = true;
                    break;
                case 2:
                    that.rightclick = true;
                    e.preventDefault();
                    break;
            }
        });

        this.ctx.canvas.addEventListener("onclick", function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });

        this.ctx.canvas.addEventListener("mouseup", function (e) {
            switch (event.button) {
                case 0:
                    //console.log("left mouse up");
                    that.click = false;
                    break;
                case 2:
                    //console.log("right mouse up");
                    that.rightclick = false;
                    break;
            }
        })

        this.ctx.canvas.addEventListener("keydown", function (e) {
            if (that.flipControl) {
                switch (e.code) {
                    case "ArrowLeft":
                    case "KeyA":
                        that.right = true;
                        break;
                    case "ArrowRight":
                    case "KeyD":
                        that.left = true;
                        break;
                    case "ArrowUp":
                    case "KeyW":
                        that.down = true;
                        break;
                    case "ArrowDown":
                    case "KeyS":
                        that.up = true;
                        break;
                    case "Space":
                        e.preventDefault();
                        that.space = true;
                        break;
                    case "ShiftLeft":
                        that.shift = true;
                        break;
                    case "KeyQ":
                        that.q = true;
                        break;
                }
            } else {
                switch (e.code) {
                    case "ArrowLeft":
                    case "KeyA":
                        that.left = true;
                        break;
                    case "ArrowRight":
                    case "KeyD":
                        that.right = true;
                        break;
                    case "ArrowUp":
                    case "KeyW":
                        that.up = true;
                        break;
                    case "ArrowDown":
                    case "KeyS":
                        that.down = true;
                        break;
                    case "Space":
                        e.preventDefault();
                        that.space = true;
                        break;
                    case "ShiftLeft":
                        that.shift = true;
                        break;
                    case "KeyQ":
                        that.q = true;
                        break;
                }
            }
            
           
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            if (that.flipControl) {
                switch (e.code) {
                    case "ArrowLeft":
                    case "KeyA":
                        that.right = false;
                        break;
                    case "ArrowRight":
                    case "KeyD":
                        that.left = false;
                        break;
                    case "ArrowUp":
                    case "KeyW":
                        that.down = false;
                        break;
                    case "ArrowDown":
                    case "KeyS":
                        that.up = false;
                        break;
                    case "Space":
                        that.space = false;
                        break;
                    case "ShiftLeft":
                        that.shift = false;
                        break;
                    case "KeyQ":
                        that.q = false;
                        break;
                }
            } else {
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
                        break;
                    case "ShiftLeft":
                        that.shift = false;
                        break;
                    case "KeyQ":
                        that.q = false;
                        break;
                }
            }
            
        }, false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    addNonCollidableEntity(entity) {
        this.nonCollidableEntities.push(entity);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (var i = 0; i < this.nonCollidableEntities.length; i++) {
            this.nonCollidableEntities[i].draw(this.ctx);
        }
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
        for (var i = 0; i < this.nonCollidableEntities.length; i++) {
            var entity = this.nonCollidableEntities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }

        for (var i = 0; i < this.nonCollidableEntities.length; i++) {
            if (this.nonCollidableEntities[i].removeFromWorld) {
                this.nonCollidableEntities.splice(i, 1);
            }
        }
    };

    clearEntities() {
        if (this.camera) this.camera.tutorial = false;
        this.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });

        this.nonCollidableEntities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    }

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };
};