class Breakout extends Component{
    constructor() {
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;

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

        this.game = new Phaser.Game(this.config);
    }
}