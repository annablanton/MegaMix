var gameEngine = new GameEngine();
CANVAS_WIDTH = 1024;
CANVAS_HEIGHT = 768;

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/megamix_enemies.png");
ASSET_MANAGER.queueDownload("./sprites/megaman.png");
ASSET_MANAGER.queueDownload("./sprites/tiles.png");
ASSET_MANAGER.queueDownload("./sprites/barba.png");
ASSET_MANAGER.queueDownload("./sprites/bigboo.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles.png");
ASSET_MANAGER.queueDownload("./sprites/mushrooms.png");
ASSET_MANAGER.queueDownload("./sprites/healthmeter.png");
ASSET_MANAGER.queueDownload("./sprites/powerup.png");
ASSET_MANAGER.queueDownload("./sprites/bg1.png");
ASSET_MANAGER.queueDownload("./sprites/effects.png");
ASSET_MANAGER.queueDownload("./sprites/intropage.png");


ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
	var ctx = canvas.getContext('2d');
	gameEngine.init(ctx);

	new SceneManager(gameEngine);
	
	gameEngine.start();
});
