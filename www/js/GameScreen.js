class GameScreen extends Component {
    constructor(game, roomID) {
        super();
        this.addEvents({
            'click .tile': 'putMark',
            'click .btn-reset': 'clearBoard'
        })
        this.game = game;
        this.roomID = roomID;
        this.gameboard = [];
        this.moves = 0;
        this.turn = true;
        this.player = 'Player 1';

        // initialize an empty 3x3 2d array
        this.clearBoard();

    }

    putMark(e) {
        let tile = this.baseEl.find(e.target);

        let index = tile.attr('id').split('-');
        let col = index[0];
        let row = index[1];

        if (this.gameboard[col][row] === 0) {
            
            tile.text(`${this.turn ? 'X' : 'O'}`);
            
            this.gameboard[col][row] = this.turn ? 1 : 2;

            this.turn = !this.turn;
            this.player = this.turn ? 'Player 1' : 'Player 2';
        }
        console.log(this.gameboard);
        // this.render();
    }

    clearBoard() {
        this.baseEl.find(['.tile']).empty();
        this.turn = true;
        for (let i = 0; i < 3; i++) {
            this.gameboard[i] = [];
            for (let j = 0; j < 3; j++) {
                this.gameboard[i][j] = 0;
            }
        }
        this.render();
    }

}