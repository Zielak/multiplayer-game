const colyseus = require('colyseus')
const { canClientPerformThisAction } = require('../referee')

const {
  Deck,
  Pile,
  Hand,
  Player,
  Presets,
} = require('../cardsGame/index')

const randomName = () =>
  [1, 2, 3].map(() => Math.floor(Math.random() * 25 + 65)).map((e) => String.fromCharCode(e)).join('')

const getActionType = (action) => {
  if (action === undefined) return ''
  const firstDot = action.indexOf('.')
  return action.slice(0, firstDot)
}
const getActionArgument = (action) => {
  if (action === undefined) return ''
  const firstDot = action.indexOf('.') + 1
  return action.slice(firstDot)
}

const performAction = (data, state) => {
  const actionType = getActionType(data.action)
  const actionArgument = getActionArgument(data.action)
  switch (data.action) {
  case 'game.start':
    return startGame(data, state)
  }
  if (actionType === 'testScore') {
    // console.warn('trying to run',actionArgument)
    return reducer.testScore[actionArgument](state)
  }
}

const startGame = (data, state) => {
  // Gather players
  // state.clients.forEach(client => {
  [0, 1, 2].forEach(client => {
    const newPlayer = new Player({
      clientId: client,
      name: randomName(),
    })
    reducer.players.add(state, newPlayer)
  })

  const mainDeck = new Deck({
    x: 0, y: 0,
  })
  reducer.containers.add(state, mainDeck)

  // Set the table, empty decks and rows
  state.players.list.forEach(player => {
    reducer.containers.add(state, new Deck({
      x: 10,
      parent: player,
    }))
    reducer.containers.add(state, new Hand({
      parent: player,
    }))
    reducer.containers.add(state, new Pile({
      parent: player,
      name: 'stage',
      y: -20,
    }))
    reducer.containers.add(state, new Pile({
      parent: player,
      name: 'dead heat',
      // a situation in or result of a race
      // in which two or more competitors are exactly even.
      y: -20,
      x: -20,
    }))
  })
  
  // Setup all cards
  Presets.classicCards().forEach(card => {
    reducer.cards.add(state, card)
    mainDeck.addChild(card)
  })
}

const reducer = {
  clients: require('./reducers/arrayReducer')('clients'),
  players: require('./reducers/players'),
  cards: require('./reducers/arrayReducer')('cards'),
  containers: require('./reducers/containers'),
  testScore: {
    increase: (state) => {
      state.testScore++
    },
    decrease: (state) => {
      state.testScore--
    }
  }
}

module.exports = class WarGame extends colyseus.Room {

  onInit(options) {
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
      },
      // Initial array of all available cards in the game
      cards: [],
      // Container holding (or not yet) cards
      containers: [],
      // Table
      table: null,

      // Testing
      testScore: 0,
    })

    // setInterval(() => {
    //   console.log('trying to add dummie player')
    //   this.state = reducer(this.state, { action: 'player.add', player: 'whoop' + Math.random() })
    //   console.log('After change: ', JSON.stringify(this.state))
    // }, 2000)

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
    // this.state.clients.push(client.id)
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

    const actionStatus = canClientPerformThisAction(client, data.action, this.state)
    console.info(`action: ${data.action}`)
    if (actionStatus.success) {
      console.log(` - success: ${actionStatus.description}`)
      performAction(data, this.state)
    } else {
      console.error(` - fail: ${actionStatus.description}`)
      this.broadcast({
        event: 'game.error',
        data: `Client "${client.id}" failed to perform "${data.action}" action.
        Details: ${actionStatus.description}`
      })
    }
  }

  onDispose() {
    console.log('Dispose WarGame')
    console.log('===========================')
  }

}