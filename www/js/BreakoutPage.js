// let width = $('.game-breakout-window').innerWidth() * 0.9;
// let height = $('.game-breakout-window').innerHeight() * 0.8;

// let config = {
//     type: Phaser.AUTO,
//     width: width,
//     height: height,
//     parent: 'game-breakout',
//     scene: [BreakoutMain],
//     physics: {
//         default: 'arcade'
//     }
// };

// let game = new Phaser.Game(this.config);

class BreakoutPage extends Component {
    constructor() {
        super();
        this.addRoute('/breakout', 'Breakout');
        this.addEvents({
            'click .btn-start-breakout': 'startBreakout'
        });
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
        this.game;
    }
    
    startBreakout(){
        this.game = new Phaser.Game(this.config);
    }

}