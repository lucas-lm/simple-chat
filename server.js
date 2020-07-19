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
server.listen(process.env.PORT || 3000)
