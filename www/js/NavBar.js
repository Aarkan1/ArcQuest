class NavBar extends Component {

  constructor(){
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Tic Tac Toe', '/tic-tac-toe'),
      new NavItem('Chat', '/chat')
    ];
  }

}