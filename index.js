const path = require('path')
const express = require('express')
const serveIndex = require('serve-index')
const http = require('http')
const colyseus = require('colyseus')

require('./consoleColors')

// Require ChatRoom handler
const rooms = {
  warGame: require('./app/warGame/index')
  // lobby: require('./app/lobby')
}

const port = process.env.PORT || 2657
const app = express()

// Create HTTP Server
const httpServer = http.createServer(app)

// Attach WebSocket Server on HTTP Server.
const gameServer = new colyseus.Server({ server: httpServer })

// Register Lobby as 'lobby'
// gameServer.register('lobby', Lobby)
gameServer.register('warGame', rooms.warGame)

app.use(express.static(path.join(__dirname, 'static')))
app.use('/', serveIndex(path.join(__dirname, 'static'), {'icons': true}))

gameServer.listen(port)

console.log(`Listening on http://localhost:${ port }`)
