class NavBar extends Component {

  constructor(){
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Breakout', '/breakout'),
      new NavItem('Pirate Battles', '/piratebattles'),
      new NavItem('Chat', '/chat')
    ];
  }

}