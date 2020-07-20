const express = require('express')
const path = require('path')
const http = require('http')
const socket = require('socket.io')
const ejs = require('ejs')

const app = express()
const server = http.createServer(app)
const io = socket(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => res.render('index.html'))

const nicknames = ['Pitolomeu', 'Discordia', 'Sabruna', 'Merchola', 'Brupou']

const users = {}

const randInt = (n) => Math.round(n * Math.random())

const messages = []
const LIMIT = 2000

const addMessage = (s) => (msg) => {
  msg.from = { id: s.id, name: users[s.id] }
  messages.push(msg)
  if (messages.length > LIMIT) messages.shift()
  s.broadcast.emit('receivedMessage', msg)
}

io.on('connection', (s) => {
  users[s.id] = nicknames[randInt(4)]
  s.emit('previous', messages)
  s.on('sendMessage', addMessage(s))
})

server.listen(process.env.PORT || 3000)
