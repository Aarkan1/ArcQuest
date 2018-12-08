class GamePage extends Component {
    constructor() {
        super();
        this.addRoute('/tic-tac-toe', 'Tic Tac Toe');
        this.addEvents({
            'click .btn-login': 'gotoLogin',
            'click .btn-gameboard': 'gotoGame'
        });
        this.loginScreen = new LoginScreen(this);
        this.gameScreen = new GameScreen(this);

        this.showLogin = true;
        this.showGameboard = false;

 

    }









    
    gotoLogin() {
        this.showGameboard = false;
        this.showLogin = true;
        this.render();
        
    }
    gotoGame() {
        this.showLogin = false;
        this.showGameboard = true;
        this.render()
    }

    // unmount() {
    //     this.showLogin = false;
    //     this.showGameboard = false;
    // }
}