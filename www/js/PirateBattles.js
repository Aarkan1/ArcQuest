class PirateBattles extends Component{
    constructor(page) {
        super();

        // DOM element to render game is in BreakoutPage
        this.page = page;
        this.width = page.baseEl.find('#game-piratebattles').width();
        this.height = page.baseEl.find('#game-piratebattles').height();

        // standard phaser config
        this.config = {
            type: Phaser.AUTO,
            width: this.width,
            height: this.height,
            parent: 'game-piratebattles',
            pixelArt: true,
            physics: {
                default: 'arcade'
            },
            scene: [PirateBattlesGame]
        };
    }
    // starts game manually
    startGame(){
        App.pirateGame = new Phaser.Game(this.config);
    }
    
}