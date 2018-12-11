class ChatPage extends Component {
    constructor() {
        super();
        this.addRoute('/chat', 'Chat');
        this.addEvents({
            'click #chat-send': 'send',
            'keyup #chat-text': 'sendOnEnter'
        });

        // socket eventhandler printing message
        Store.socket.on('return-msg', (msg) => {
            this.printChat(msg);
        });
    }

    // needs css to make chat direction right
    printChat(msg) {
        this.baseEl.find('.net-msg').prepend(
            `<p class="sent-msg m-0">${msg.name}: ${msg.text}</p>`
        );
    }

    // sends message to server
    send() {
        let chatName = this.baseEl.find('#chat-name').val();
        let chatText = this.baseEl.find('#chat-text');
        // only send when name and text are present
        if (chatName && chatText.val()) {
            let msg = {
                name: chatName,
                text: chatText.val()
            }
            this.printChat(msg);
            Store.socket.emit('msg', msg);
            // empty input field
            chatText.val('');
        }
    }

    sendOnEnter(e) {
        if (e.which === 13) {
            this.send();
        }
    }
}