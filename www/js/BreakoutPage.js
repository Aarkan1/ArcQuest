class BreakoutPage extends Component {
    constructor() {
        super();
        this.addRoute('/breakout', 'Breakout');
        this.addEvents({
            'click .btn-start-breakout': 'startBreakout'
        });
        // boolean toggle
        this.showBreakout = false;

    }

    // load game on click
    startBreakout() {
        this.showBreakout = true;
        this.render();
    }

}