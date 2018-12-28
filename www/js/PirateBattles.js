class PirateBattles extends Component {
    constructor(page) {
        super();

        // DOM element to render game is in BreakoutPage
        this.page = page;   

        // standard phaser config
        this.config = {
            type: Phaser.AUTO,
            width: 3200,
            height: 3200,
            parent: 'game-piratebattles',
            pixelArt: true,
            physics: {
                default: 'arcade'
            },
            scene: [PirateBattlesGame]
        };
    }
    // starts game manually
    startGame() {
        App.pirateGame = new Phaser.Game(this.config);
    }
    // kill the game
    closeGame() {
        // App.pirateGame.destroy(true);
        App.pirateGame.renderer.destroy();
        App.pirateGame.loop.stop();
        App.pirateGame.canvas.remove();
    }

}