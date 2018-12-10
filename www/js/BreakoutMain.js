class BreakoutMain extends Phaser.Scene {
    constructor() {
        super({
            key: 'BreakoutMain'
        });

        this.width = 500;
        this.height = 300;

        this.columns = 10;
        this.rows = 6;
        this.bricksLeft = 0;
        this.paddle;
        this.ball = {};

        this.score = 0;
        this.scoreText;
        this.level = 0;
        this.levels = [];

        // Create levels
        this.level0 = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this.level1 = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
        ];
        this.level2 = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 3, 3, 0, 1, 1, 1],
            [0, 1, 0, 3, 1, 1, 3, 0, 1, 0],
            [1, 1, 1, 3, 0, 0, 3, 1, 1, 1],
            [0, 1, 1, 1, 3, 3, 1, 1, 1, 0],
            [2, 0, 2, 0, 2, 2, 0, 2, 0, 2]
        ];
        this.level3 = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
        ];

        // fill levels array with levels
        this.levels.push(this.level0);
        this.levels.push(this.level1);
        this.levels.push(this.level2);
        this.levels.push(this.level3);



    }

    preload() {
        // Preload images for bricks, ball, player paddle and audio
        this.load.image('paddle', 'assets/breakout/paddle_10.png');
        this.load.image('ball', 'assets/breakout/ballGrey_07.png');
        this.load.image('brickGrey', 'assets/breakout/tileGrey_26.png');
        this.load.image('brickBlue', 'assets/breakout/tileBlue_26.png');
        this.load.image('brickGreen', 'assets/breakout/tileGreen_26.png');
        this.load.image('brickOrange', 'assets/breakout/tileOrange_25.png');
        this.load.image('brickRed', 'assets/breakout/tileRed_26.png');
        this.load.image('brickYellow', 'assets/breakout/tileYellow_26.png');
        this.load.audio('hitBrick', 'assets/breakout/onBrick.mp3');
        this.load.audio('hitPaddle', 'assets/breakout/onPaddle.mp3');

    }

    create() {
        // add sounds
        this.sound.add('hitBrick');
        this.sound.add('hitPaddle');

        // add couple of colored bricks
        this.brickColor = ['brickBlue', 'brickOrange', 'brickGreen', 'brickRed', 'brickYellow', 'brickGrey'];

        // Create world bounds on all sides except floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        // Create player
        this.paddle = this.physics.add.image(this.width / 2, this.height / 1.13, 'paddle').setImmovable();
        this.paddle.setScale(this.height / 3000);

        // Create the bouncing ball
        this.ball.img = this.physics.add.image(this.width / 2, this.height / 1.193, 'ball');
        this.ball.img.setCollideWorldBounds(true).setBounce(1);
        this.ball.img.setScale(this.height / 3000);
        this.ball.onPaddle = true;


        // create grid with bricks
        this.resetGame();

        // set colliders between ball and other objects
        this.physics.add.collider(this.ball.img, this.paddle, this.hitPaddle, null, this);

        this.scoreText = this.add.text(this.width / 50, this.height / 50, 'Score: 0', {
            fontSize: this.height / 20 + 'px',
            fill: '#fff'
        });


        // add input controls
        this.input.on('pointermove', (pointer) => {
            // keep paddle on screen
            if (pointer.x > this.width / 12.4 && pointer.x < this.width / 1.08) {
                // clamp paddle to cursor
                this.paddle.x = pointer.x;
                // if ball is on paddle, clamp on paddle
                if (this.ball.onPaddle) {
                    this.ball.img.x = this.paddle.x;
                }
            }
        });
        this.input.on('pointerup', (pointer) => {
            if (this.ball.onPaddle) {
                this.ball.img.setVelocity(-75, this.height * -0.7);
                this.ball.onPaddle = false;
            }
        });

    }
    // function handling impact on a brick
    hitBrick(ball, brick) {
        this.sound.play('hitBrick');


        if (brick.data > 1) {
            brick.alpha -= 0.3;
            brick.data--;
        } else {
            // updates the score and score text
            this.score += 10;
            this.scoreText.setText(`Score: ${this.score}`);

            // disables the brick
            brick.disableBody(true, true);
            // countdown
            this.bricksLeft--;
        }
    }
    // function handling ball behavior when it hits the paddle
    hitPaddle(ball, paddle) {

        this.sound.play('hitPaddle');

        let diff = 0;

        // if ball lands on the left or right half of the paddle
        // it gets a different angled bounce depending on the offset
        if (ball.x < paddle.x) {
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        } else if (ball.x > paddle.x) {
            diff = ball.x - paddle.x;
            ball.setVelocityX(10 * diff);
        }
    }
    // when ball is out of bounds, it gets placed on default position
    resetBall() {
        this.ball.img.setVelocity(0);
        this.ball.img.setPosition(this.paddle.x, this.height / 1.193);
        this.ball.onPaddle = true;
    }
    // re-enables bricks and updates the counter
    resetGame() {
        // create grid with bricks
        let brickX = this.width / 7.5;
        let brickY = this.height / 8;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let brick = this.levels[this.level][i][j];
                let hits = brick;

                if (brick > 0) {
                    brick = this.physics.add.image(brickX, brickY, this.brickColor[i]).setImmovable();
                    brick.displayWidth = this.width / 13;
                    brick.displayHeight = this.height / 20;
                    brick.data = hits;
                    // add a collisionhandler when ball hits the brick
                    this.physics.add.collider(this.ball.img, brick, this.hitBrick, null, this);
                    this.bricksLeft++;
                }
                brickX += this.width / 12.5;
            }
            brickX = this.width / 7.5;
            brickY += this.height / 17.5;
        }
    }
    printFinalScore() {
        this.scoreText.x = this.width / 3.5;
        this.scoreText.y = this.height / 2.5;
        this.scoreText.setFontSize( this.height / 10 + 'px');
        this.scoreText.setText(`Score: ${this.score}`);
        this.ball.img.disableBody(true, true);
        this.paddle.disableBody(true, true);
    }
    // game loop
    update() {

        // if ball goes out of bounds, reset its position
        if (this.ball.img.y > this.height + 100) {
            this.score -= 100;
            this.scoreText.setText(`Score: ${this.score}`);
            this.resetBall();
        }
        // when all bricks are hit, the level is over
        if (this.bricksLeft === 0) {
            this.level++;
            this.resetBall();
            if (this.level < this.levels.length) {
                this.resetGame();
            }
        }
        // when all levels are cleared, print final score
        if (this.level > this.levels.length) {
            this.printFinalScore();
        }

    }
}