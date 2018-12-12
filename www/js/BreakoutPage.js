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

    // load game on click
    startBreakout() {
        this.showBreakout = true;
        // this.breakout = new Breakout();
        this.render();
    }
    

}