class PirateBattles extends Component {
    constructor(page) {
        super();

        // DOM element to render game is in BreakoutPage
        this.page = page;
        this.width = page.baseEl.find('#game-piratebattles').width();
        this.height = page.baseEl.find('#game-piratebattles').height();

        // standard phaser config
        this.config = {
            type: Phaser.AUTO,
            width: 768,
            height: 576,
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