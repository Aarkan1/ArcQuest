class PirateBattlesPage extends Component {
    constructor() {
        super();
        this.addRoute('/piratebattles', 'Pirate Battles');
        this.addEvents({
            'click .btn-start-piratebattles': 'startPirateBattles'
        });
        // boolean toggle
        this.showPirateBattles = false;
        this.piratebattles;
    }

    // restarts game if user leaves page
    unmount(){
        this.showPirateBattles = false;
        this.piratebattles = undefined;
        App.pirateGame = undefined;
    }

    // load game on click
    startPirateBattles() {
        this.showPirateBattles = true;

        // place game start last in queue
        // needs to load DOM before starting game
        setTimeout(() => {
            this.piratebattles = new PirateBattles(this);
            this.piratebattles.startGame();
        },0)
        this.render();
    }
}