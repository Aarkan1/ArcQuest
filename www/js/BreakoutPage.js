class BreakoutPage extends Component{
    constructor(){
        super();
        this.addRoute('/breakout', 'Breakout');
        this.width = this.baseEl.find('.game-breakout-window').innerWidth() * 0.9;
        this.height = this.baseEl.find('.game-breakout-window').innerHeight() * 0.8;

        this.config = {
            type: Phaser.AUTO,
            width: this.width,
            height: this.height,
            parent: 'game-breakout',
            scene: [BreakoutMain],
            physics: {
                default: 'arcade'
            }
        };

        this.game = new Phaser.Game(this.config);

    }
}