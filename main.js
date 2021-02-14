var gameEngine = new GameEngine();
CANVAS_WIDTH = 1024;
CANVAS_HEIGHT = 768;

var ASSET_MANAGER = new AssetManager();

<<<<<<< HEAD
ASSET_MANAGER.queueDownload("./sprites/megamix_enemies.png");
ASSET_MANAGER.queueDownload("./sprites/megaman.png");
ASSET_MANAGER.queueDownload("./sprites/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/barba.png");
ASSET_MANAGER.queueDownload("./sprites/bigboo.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles.png");
ASSET_MANAGER.queueDownload("./sprites/mushrooms.png");
ASSET_MANAGER.queueDownload("./sprites/healthmeter.png")
ASSET_MANAGER.queueDownload("./sprites/powerup.png")


=======
>>>>>>> parent of bab577c... Added Wheelie animations
ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
	var ctx = canvas.getContext('2d');
	gameEngine.init(ctx);

<<<<<<< HEAD
	new SceneManager(gameEngine);
	
=======
>>>>>>> parent of bab577c... Added Wheelie animations
	gameEngine.start();
});
