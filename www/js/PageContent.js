class PageContent extends Component {

  constructor(){
    super();
    this.startPage = new StartPage();
    this.missingPage = new MissingPage();
    this.breakoutPage = new BreakoutPage();
    App.pirateBattlesPage = new PirateBattlesPage();
    this.gamePage = new GamePage();
    this.chatPage = new ChatPage();
    // this.loadMusiciansAndBands();



  }

  async loadMusiciansAndBands(){
     // optional, this is if we want to load data from a JSON file
    JSON._classes(MusiciansAndBands, Musicians, Bands, Musician, Band);
    let response = await JSON._load('musicians-and-bands.json');
    if(response === null){ return; }
    // set the original id of musiciansAndBands
    // to get things into the "rendering loop"
    response.data._id = this.musiciansAndBands._id;
    this.musiciansAndBands = response.data;
    this.musiciansAndBands.render();
  }

  
}