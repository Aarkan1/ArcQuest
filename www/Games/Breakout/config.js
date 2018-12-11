 let width = window.innerWidth;
 let height = window.innerHeight;

 let config = {
     type: Phaser.AUTO,
     width: width,
     height: height,
     parent: 'game-breakout',
     physics: {
         default: 'arcade'
        },
        scene: [BreakoutMain]
 };

 let game = new Phaser.Game(config);