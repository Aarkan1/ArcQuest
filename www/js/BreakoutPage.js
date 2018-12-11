class BreakoutPage extends Component {
    constructor() {
        super();
        this.addRoute('/breakout', 'Breakout');
        this.addEvents({
            'click .btn-start-breakout': 'startBreakout'
        });
        this.breakoutGame;
        this.showBreakout = false;
        
    }
    
    startBreakout(){
        this.breakoutGame = new BreakoutGame(this);
        this.showBreakout = true;
        this.render();
    }

}