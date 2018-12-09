class BreakoutMain extends Phaser.Scene {
    constructor(){
        super({
            key: 'BreakoutMain'
        })

        this.bricks;
        this.paddle;
        this.ball;
    }

    preload(){
        this.load.image('brick', 'assets/tileGrey_26.png');
        this.load.image('ball', 'assets/ballGey_07.png');
        this.load.image('paddle', 'assets/paddle_10.png')
    }

    create(){
        // Create world bounds on all sides except floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.paddle = this.physics.add.image(BreakoutPage.width / 2, BreakoutPage.height - 50, 'paddle').setImmovable();

    }

    update(){



    }


}