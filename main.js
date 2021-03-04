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
ASSET_MANAGER.queueDownload("./sprites/bg2.png");
ASSET_MANAGER.queueDownload("./sprites/effects.png");
ASSET_MANAGER.queueDownload("./sprites/intropage.png");
ASSET_MANAGER.queueDownload("./sprites/towerdemolition.png");

//sounds
ASSET_MANAGER.queueDownload("./sounds/background.mp3");
ASSET_MANAGER.queueDownload("./sounds/background1.mp3");
ASSET_MANAGER.queueDownload("./sounds/bossbattle.mp3");
ASSET_MANAGER.queueDownload("./sounds/bigboo battle.mp3")
ASSET_MANAGER.queueDownload("./sounds/tutorial bgm.mp3");
ASSET_MANAGER.queueDownload("./sounds/barbafire1.wav");
ASSET_MANAGER.queueDownload("./sounds/death.wav");
ASSET_MANAGER.queueDownload("./sounds/jump.wav"); 
ASSET_MANAGER.queueDownload("./sounds/laser.wav");
ASSET_MANAGER.queueDownload("./sounds/megamanDamage.wav");
ASSET_MANAGER.queueDownload("./sounds/mushroom.wav");
ASSET_MANAGER.queueDownload("./sounds/powerup.wav");
ASSET_MANAGER.queueDownload("./sounds/shooting.wav");
ASSET_MANAGER.queueDownload("./sounds/sliding.wav");
ASSET_MANAGER.queueDownload("./sounds/stageclear.wav");
ASSET_MANAGER.queueDownload("./sounds/swing.wav");

ASSET_MANAGER.downloadAll(function () {
	ASSET_MANAGER.autoRepeat("./sounds/background.mp3");
	ASSET_MANAGER.autoRepeat("./sounds/background1.mp3");
	ASSET_MANAGER.autoRepeat("./sounds/tutorial bgm.mp3");
	ASSET_MANAGER.autoRepeat("./sounds/bossbattle.mp3");
	var canvas = document.getElementById('gameWorld');
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
	var ctx = canvas.getContext('2d');
	gameEngine.init(ctx);

	new SceneManager(gameEngine);
	
	gameEngine.start();
});
