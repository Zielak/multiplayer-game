const colyseus = require('colyseus')
const { Game } = require('../cardsGame/index')

const commands = require('./commands/index')
const reducer = require('./reducers/index')

module.exports = class WarGame extends colyseus.Room {

  onInit(options) {
    this.game = new Game({
      commands,
      reducer,
    })

    this.setState({
      clients: [],
      maxClients: options.maxClients || 2,
      host: options.host,

      // Has the game started?
      started: false,
      // Clients that are actually playing the game plus some turn order variables
      players: {
        list: [],
        reversed: false,
        currentPlayerIdx: 0,
        currentPlayer: null,
        currentPlayerPhase: 0,
      },
      // Initial array of all available cards in the game
      cards: [],
      // Containers holding (or not yet) cards
      containers: [],
      // Table
      table: null,

      // Testing
      testScore: 0,
    })

    console.log('WarGame room created!', options)
  }

  requestJoin() {
    const res = this.clients.length < this.state.maxClients
    if (!res) {
      console.log('WarGame - rejected new client!')
    }
    return this.clients.length < this.state.maxClients
  }

  onJoin(client) {
    console.log('WarGame: JOINED: ', client.id)
    reducer.clients.add(this.state, client.id)
    if (!this.state.host) {
      this.state.host = client.id
    }
  }

  onLeave(client) {
    reducer.clients.remove(this.state, client.id)
    // TODO: Handle leave when the game is running
    // Timeout => end game? Make player able to go back in?
  }

  onMessage(client, data) {
    console.log('MSG: ', JSON.stringify(data))

    this.game.performAction(client, data.action, this.state)
      .then(status => {
        console.log('action resolved!', status)
      })
      .catch(status => {
        console.error('action failed!', status)
        this.broadcast({
          event: 'game.error',
          data: `Client "${client.id}" failed to perform "${data.action}" action.
          Details: ${status}`
        })
      })
  }

  onDispose() {
    console.log('Dispose WarGame')
    console.log('===========================')
  }

}
