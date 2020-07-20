;(function () {
  var socket = io('http://192.168.0.2:3000')
  var chat = document.querySelector('#chat')
  var message = document.querySelector('input[name=message]')
  var board = document.querySelector('#messages')

  function renderMessage(msg, from) {
    var itsme = from === socket.id
    var c = itsme ? '<p class="me">' : '<p>'
    var name = itsme ? 'Eu' : from
    board.innerHTML += c + '<strong>' + name + '</strong>: ' + msg + '</p>'
  }

  socket.on('receivedMessage', function (m) {
    renderMessage(m.message, m.from)
  })

  socket.on('previous', function (messages) {
    console.log(messages)
    for (var m of messages) {
      renderMessage(m.message, m.from)
    }
  })

  chat.addEventListener('submit', (event) => {
    event.preventDefault()
    if (message.value) {
      renderMessage(message.value, socket.id)
      socket.emit('sendMessage', { message: message.value, from: socket.id })
      message.value = ''
    }
  })
})()
