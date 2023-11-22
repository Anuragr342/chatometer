const socket = io()

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do{
    name = prompt('Please enter your name: ')
}while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    //Append
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server
     socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);

}

// Recieve message

socket.on('message', (msg) => {
    if (msg.user === 'Server' && msg.message === 'A new user has joined the chat.') {
        // Display a "User joined" message in a different style, e.g., with a class 'user-joined'
        appendMessage(msg, 'user-joined');
    } else {
        appendMessage(msg, 'incoming');
    }
    scrollToBottom();
});


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}