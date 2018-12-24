// Require the express module
const express = require('express');
// Require jsonflex
const jsonflex = require('jsonflex')();
// Create a new web server
const app = express();

// Tell the web server to serve files
// from the www folder and serve the jsonflex script
app.use(jsonflex);
app.use(express.static('www'));

// Create socket.io server
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Initialize socket rooms
let rooms = 0;
let global = 'global';

// store connected players
let piratePlayers = {};

// Create socket connection
io.on('connection', function (socket) {
  // a user connects
  console.log('a user connected');
  // a user disconnects
  socket.on('disconnect', () => {
    console.log('user disconnected');
    /*
        PIRATE BATTLES
    */
    // remove player from connected list
    delete piratePlayers[socket.id];
    // update online players to remove offline player
    io.emit('disconnect', socket.id);
  });

  /*
      PIRATE BATTLES
  */
  // create a new player and add it to players list
  piratePlayers[socket.id] = {
    playerId: socket.id,
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    team: Math.floor(Math.random() * 4)
  };
  
  socket.join(global);
  // send other players data to new player
  socket.emit('onlinePlayers', {players: piratePlayers});

  console.log(piratePlayers);
  
  
  // update online players with the new player
  socket.broadcast.emit('newPlayer', piratePlayers[socket.id]);
  // update player movement and direction
  socket.on('playerMovement', (playerMove) => {
    piratePlayers[socket.id].x = playerMove.x;
    piratePlayers[socket.id].y = playerMove.y;
    piratePlayers[socket.id].rotation = playerMove.rotation;
    // emit movement to all players
    socket.broadcast.emit('playerMoved', piratePlayers[socket.id]);
  });


  // when a user sends a message
  // emit that message to all users
  socket.on('msg', (data) => {

    io.emit('return-msg', data);
  });


});


// Start the web server on port 3000
server.listen(3000, () => console.log('Listening on port 3000'));


const fs = require('fs');
const path = require('path');

// Automatically load all scripts at root level of js folder
// and load their corresponding template files
app.get('/autoload-js-and-templates', (req, res) => {
  let files = fs.readdirSync(path.join(__dirname, '/www/js'));
  files = files.filter(x => x.substr(-3) === '.js')
  let html = files.map(x => `<script src="/js/${x}"></script>`).join('');
  html += files.filter(x => fs.existsSync(path.join(
    __dirname, '/www/templates', x.split('.js').join('.html')
  ))).map(x => `<script src="/template-to-js/${
    x.split('.js').join('.html')}"></script>`).join('');
  res.send(`document.write('${html}')`);
});

// Convert a template to a js render method
app.get('/template-to-js/:template', (req, res) => {
  let html = fs.readFileSync(path.join(
    __dirname, '/www/templates', req.params.template));
  html = req.params.template.split('.html')[0] +
    '.prototype.render = function(){ return `\n' + html + '\n`};'
  res.send(html);
});

// Serve the index page everywhere so that the
// frontend router can decide what to do
app.use((req, res, next) => {
  if (req.url === '/jsonflex.js' || req.url == '/json-save') {
    next();
    return;
  }
  res.sendFile(path.join(__dirname, '/www/index.html'));
});