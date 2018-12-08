class ChatPage extends Component {
    constructor(){
        super();
        this.addRoute('/chat', 'Chat');
        this.addEvents({
            'click #chat-send': 'send',
            'keyup #chat-text': 'sendOnEnter'
        });

        Store.socket.on('return-msg', (msg) => {

            this.printChat(msg);

        });
    }


    // needs css to make chat direction right
    printChat(msg){
        if(msg.text !== ''){
            this.baseEl.find('.net-msg').prepend(
                `<p class="sent-msg m-0">${msg.name}: ${msg.text}</p>`
                );
            }
    }

// sends message to server
    send() {
        let chatName = this.baseEl.find('#chat-name').val();
        let chatText = this.baseEl.find('#chat-text').val();
        let msg = {
            name: chatName,
            text: chatText
        }
        this.printChat(msg);
        Store.socket.emit('msg', msg);
        // chatText.empty('');
        // chatText.focus();
    }

    sendOnEnter(e){
        if (e.which === 13){
            this.send();
        }
    }
}