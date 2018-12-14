class BreakoutPage extends Component {
    constructor() {
        super();
        this.addRoute('/breakout', 'Breakout');
        this.addEvents({
            'click .btn-start-breakout': 'startBreakout'
        });
        // boolean toggle
        this.showBreakout = false;
        this.breakout;
    }

    // restarts game if user leaves page
    unmount(){
        this.showBreakout = false;
        this.breakout = undefined;
        App.breakoutGame = undefined;
    }

    // load game on click
    startBreakout() {
        this.showBreakout = true;

        // place game start last in queue
        // needs to load DOM before starting game
        setTimeout(() => {
            this.breakout = new Breakout(this);
            this.breakout.startGame();
        },0)
        this.render();
    }
}