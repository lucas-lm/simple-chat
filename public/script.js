;(function () {
  var socket = io('http://localhost:3000')
  const chat = document.querySelector('#chat')
  const message = document.querySelector('input[name=message]')
  const board = document.querySelector('#messages')

  function renderMessage(msg) {
    board.innerHTML += '<p>' + msg + '</p>'
  }

  socket.on('receivedMessage', renderMessage)
  socket.on('previous', function (messages) {
    for (var message of messages) {
      renderMessage(message)
    }
  })

  chat.addEventListener('submit', (event) => {
    event.preventDefault()
    if (message.value) {
      renderMessage(message.value)
      socket.emit('sendMessage', message.value)
    }
  })
})()
