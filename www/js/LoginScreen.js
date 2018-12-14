class LoginScreen extends Component {
    constructor(game) {
        super();
        this.addEvents({
            'click #new': 'startGame',
            'click #join': 'joinGame',
            'click #test-send': 'emit'
        });
        this.game = game;
        
        // Player types
        this.P1 = 'X';
        this.P2 = 'O';
        this.player;
        this.game;


        
        Store.socket.on('newGame', (data) => console.log(`${data.name} a started game in ${data.room}`));
   

    
    }



    // Start a new game
    startGame() {
        let name = '';
        name = this.baseEl.find('#nameNew').val();

        if (name.length < 3 || name.length > 10) {
            alert(`Name is too ${name.length < 3 ? `short`: `long`}!`);
            return;
        }

        Store.socket.emit('createGame', {
            name: name
        });
        this.player = new Player(name, this.P1);
        // this.render();
    }

    // Join an existing game
    joinGame() {
        let name = '';
        name = this.baseEl.find('#nameJoin').val();
        if (name.length < 3 || name.length > 10) {
            alert(`Name is too ${name.length < 3 ? `short`: `long`}!`);
            return;
        }
        let roomID = this.baseEl.find('#room').val();
        if (!roomID) {
            alert('Enter a game ID')
        }

        Store.socket.emit('joinGame', {
            name: name,
            room: roomID
        });
        this.player = new Player(name, this.P2);
        this.render();
    }


}