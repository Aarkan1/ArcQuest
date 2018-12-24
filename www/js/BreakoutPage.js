class BreakoutPage extends Component {
    constructor() {
        super();
        this.addRoute('/breakout', 'Breakout');
        this.addEvents({
            'click .btn-start-breakout': 'startBreakout',
            'click .btn-close-breakout': 'closeBreakout'
        });
        // boolean toggle
        App.showBreakout = false;
        this.breakout;
    }

    // restarts game if user leaves page
    unmount(){
        App.showBreakout = false;
        if(this.breakout){
            this.breakout.closeGame();
        }
    }
    
    closeBreakout(){
        this.render();
    }

    // load game on click
    startBreakout() {
        App.showBreakout = true;

        // place game start last in queue
        // needs to load DOM before starting game
        setTimeout(() => {
            this.breakout = new Breakout(this);
            this.breakout.startGame();
        },0)
        this.render();
    }
}