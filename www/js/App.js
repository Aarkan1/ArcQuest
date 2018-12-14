class App extends Component {

  constructor(){
    super();
    this.navBar = new NavBar();
    this.pageContent = new PageContent();
    this.footer = new Footer();
    // only in the App class:
    new Router(this.pageContent);
    $('body').html(this.render());


    Store.socket = io.connect('http://127.0.0.1:3000');

  }

}
