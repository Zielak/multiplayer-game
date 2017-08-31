const path = require('path')
const express = require('express')
const serveIndex = require('serve-index')
const http = require('http')
const colyseus = require('colyseus')

// Require ChatRoom handler
const LobbyRoom = require('./rooms/lobby')
const MonstrousEscapeRoom = require('./rooms/monstrousEscape')

const port = process.env.PORT || 2657
const app = express()

// Create HTTP Server
const httpServer = http.createServer(app)

// Attach WebSocket Server on HTTP Server.
const gameServer = new colyseus.Server({ server: httpServer })

// Register LobbyRoom as 'chat'
gameServer.register('chat', LobbyRoom)
gameServer.register('monstrousgame', MonstrousEscapeRoom)

app.use(express.static(path.join(__dirname, 'static')))
app.use('/', serveIndex(path.join(__dirname, 'static'), {'icons': true}))

gameServer.listen(port)

console.log(`Listening on http://localhost:${ port }`)
