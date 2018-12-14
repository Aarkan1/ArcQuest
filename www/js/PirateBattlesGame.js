class PirateBattlesGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'PirateBattlesGame'
        });
        // get game width and height for scaling
        this.width = App.pirateGame.config.width;
        this.height = App.pirateGame.config.height;
        this.player;
        this.cursors;
    }

    preload() {
        // load tilemap
        this.load.image('tiles', 'assets/piratebattles/tiles_sheet.png');
        this.load.tilemapTiledJSON('map', 'assets/piratebattles/map.json');

        this.load.image('Blue', 'assets/piratebattles/shipBlue3.png');
    }

    create() {

        // create a holder for tiles
        let map = this.make.tilemap({
            key: 'map'
        });

        // add tileset
        let tileset = map.addTilesetImage('tiles_sheet', 'tiles');

        // add layers from tileset
        let sea = map.createStaticLayer('sea', tileset, 0, 0);

        this.player = this.physics.add.image(this.width / 2, this.height / 2, 'Blue');

        // this.cursors = this.input.keyboard
        // border collision
        this.player.setCollideWorldBounds(true);
        
        // arrow input
        // cursors = this.input.keyboard.createCursorKeys();
        this.cursors = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
            
        });
        
        // Camera setup
        let cam = this.cameras.main;

        cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        cam.startFollow(this.player);
        cam.roundPixels = true; // avoid tile bleed
        cam.setSize(this.width, this.height);
        cam.setZoom(1);
        cam.setLerp(0.3);

        // let fullS = document.fullscreen;
        // this.cameras.main.setFollowOffset(fullS ? 0 : -450, fullS ? 0 : -160);

    }

    update() {

    }


}