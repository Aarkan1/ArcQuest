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
            this.goFullscreen();
            this.breakout = new Breakout(this);
            this.breakout.startGame();
        },0)
        this.render();
    }

    goFullscreen(){
    let elem = this.baseEl.find("#game-breakout")[0];

        if (!document.fullscreen) {
            // this.baseEl.find('#game-breakout').height('100vh').width('100vw');
            elem.webkitRequestFullscreen();
        }
    }

}

    $(document).on('change', function () {
        // key event 13 == enter
        // key event 27 == escape
        if (document.fullscreen) {
            $('#game-breakout').height('100vh').width('100vw');
        } 
    });
    
    let elem = document.querySelector("#game-breakout");
    
    $('.btn-fs button').on('click', function () {
        if (!document.fullscreen) {
            elem.webkitRequestFullscreen()
        }
    
        // if (elem.requestFullscreen) {
        //     elem.requestFullscreen();
        // } else if (elem.mozRequestFullScreen) { /* Firefox */
        //     elem.mozRequestFullScreen();
        // } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        //     elem.webkitRequestFullscreen();
        // } else if (elem.msRequestFullscreen) { /* IE/Edge */
        //     elem.msRequestFullscreen();
        // }
    });

