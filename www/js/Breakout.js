class Breakout extends Component{
    constructor(page) {
        super();

        // DOM element to render game is in BreakoutPage
        this.page = page;
        this.width = page.baseEl.find('#game-breakout').width();
        this.height = page.baseEl.find('#game-breakout').height();

        // standard phaser config
        this.config = {
            type: Phaser.AUTO,
            width: this.width,
            height: this.height,
            parent: 'game-breakout',
            physics: {
                default: 'arcade'
            },
            scene: [BreakoutMain]
        };
    }
    // starts game manually
    startGame(){
        App.breakoutGame = new Phaser.Game(this.config);

        let e = $.Event('keypress');
        let code = e.keyCode || e.which;
        code = 122; // F11
        $('item').trigger(code);
    }
    // kill the game
    closeGame(){
        // App.breakoutGame.destroy(true);
        // App.breakoutGame.scene.remove(BreakoutMain);
        App.breakoutGame.renderer.destroy();
        App.breakoutGame.loop.stop();
        App.breakoutGame.canvas.remove();
    }
}

