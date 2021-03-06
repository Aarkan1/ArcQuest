class PirateBattlesGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'PirateBattlesGame'
        });
        // get game width and height for scaling
        // this.width = App.pirateWidth;
        // this.height = App.pirateHeight;
        this.width = App.pirateGame.config.width;
        this.height = App.pirateGame.config.height;
        this.player;
        this.cursors;
        this.teams = ['Blue', 'Blue', 'Blue', 'Blue', 'Blue'];

    }

    preload() {
        // load tilemap
        this.load.image('tiles', 'assets/piratebattles/tiles_sheet.png');
        this.load.tilemapTiledJSON('map', 'assets/piratebattles/map.json');

        this.load.image('Blue', 'assets/piratebattles/shipBlue3.png');
    }

    create() {
        let self = this;
        this.otherPlayers = this.physics.add.group();

        this.socket = io();

        // fill otherPlayers array with all online players
        this.socket.on('currentPlayers', function (players) {
            Object.keys(players).forEach(function (id) {
                if (players[id].playerId === self.socket.id) {
                    // skip self
                } else {
                    const otherPlayer = self.add.sprite(players[id].x, players[id].y, self.teams[players[id].team]).setOrigin(0.5, 0.5);
                    otherPlayer.playerId = players[id].playerId;
                    self.otherPlayers.add(otherPlayer);
                }
            });
        });
        this.socket.on('newPlayer', function (playerInfo) {
            const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, self.teams[playerInfo.team]).setOrigin(0.5, 0.5);
            otherPlayer.playerId = playerInfo.playerId;
            self.otherPlayers.add(otherPlayer);
        });
        this.socket.on('disconnect', function (playerId) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerId === otherPlayer.playerId) {
                    otherPlayer.destroy();
                }
            });
        });
        this.socket.on('playerMoved', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    otherPlayer.setRotation(playerInfo.rotation);
                    otherPlayer.setPosition(playerInfo.x, playerInfo.y);
                }
            });
        });

        // create a holder for tiles
        let map = this.make.tilemap({
            key: 'map'
        });

        // add tileset
        let tileset = map.addTilesetImage('tiles_sheet', 'tiles');

        // add layers from tileset
        let sea = map.createStaticLayer('sea', tileset, 0, 0);


        let team = Math.floor(Math.random() * 4);
        let ship = this.teams[team];
        let x = Math.floor(Math.random() * this.width - 50) + 50;
        let y = Math.floor(Math.random() * this.height - 50) + 50;
        this.player = this.physics.add.image(x, y, ship);
        this.player.setOrigin(0.5, 0.5);
        this.player.setDrag(100);
        this.player.setAngularDrag(30);
        this.player.setMaxVelocity(200);
        // emit new player to other players
        let newPlayer = {
            rotation: 0,
            x: x,
            y: y,
            team: team
        };
        this.socket.emit('pirate', newPlayer);

            let cam = this.cameras.main;
            // cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            cam.roundPixels = true; // avoid tile bleed
            cam.setSize(this.width, this.height);
            cam.setZoom(0.8);
            cam.setLerp(0.3);
            cam.startFollow(this.player);
            // cam.setFollowOffset(0, -230);

        // arrow input
        // cursors = this.input.keyboard.createCursorKeys();
        this.cursors = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });

        // this.blueScoreText = this.add.text(16, 16, '', {
        //     fontSize: '32px',
        //     fill: '#0000FF'
        //   });
        //   this.redScoreText = this.add.text(584, 16, '', {
        //     fontSize: '32px',
        //     fill: '#FF0000'
        //   });

        //   this.socket.on('scoreUpdate', function (scores) {
        //     self.blueScoreText.setText('Blue: ' + scores.blue);
        //     self.redScoreText.setText('Red: ' + scores.red);
        //   });

        //   this.socket.on('treasure', function (starLocation) {
        //     if (self.star) self.star.destroy();
        //     self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star');
        //     self.physics.add.overlap(self.ship, self.treasure, function () {
        //       this.socket.emit('treasureCollected');
        //     }, null, self);
        //   });
    }

    update(delta) {

        if (this.player) {
            if (this.cursors.up.isDown) {
                this.physics.velocityFromRotation(this.player.rotation + 1.5, 70, this.player.body.acceleration);
                if (this.cursors.left.isDown) {
                    this.player.setAngularVelocity(-30);
                } else if (this.cursors.right.isDown) {
                    this.player.setAngularVelocity(30);
                }
            } else {
                this.player.setAcceleration(0);
            }
            this.physics.world.wrap(this.player, 5);

            let x = this.player.x;
            let y = this.player.y;
            let r = this.player.rotation;
            if (this.player.oldPosition && (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y || r !== this.player.oldPosition.rotation)) {
                this.socket.emit('playerMovement', {
                    x: this.player.x,
                    y: this.player.y,
                    rotation: this.player.rotation
                });
            }

            this.player.oldPosition = {
                x: this.player.x,
                y: this.player.y,
                rotation: this.player.rotation
            };
        }
    }
}