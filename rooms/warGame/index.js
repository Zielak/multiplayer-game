const colyseus = require('colyseus')

const {
  Deck,
  Player,
  Presets,
} = require('../cardsGame/index')

const randomName = () =>
  [1, 2, 3].map(() => Math.floor(Math.random() * 25 + 65)).map((e) => String.fromCharCode(e))

const actionStatus = (success = true, description = '') => {
  return { success, description }
}

const canPerformThisAction = (client, action, state) => {
  switch (action) {
  case 'game.start':
    if(client.id !== state.host){
      return actionStatus(false, `Client '${client.id}' is not a host: '${state.host}'`)
    }else if (state.clients.length < 2){
      return actionStatus(false, `Not enough clients: only '${state.clients.length}' clients in the room`)
    }else{
      return actionStatus()
    }
  case '':
    if(client.id === state.currentPlayer.id){
      return actionStatus()
    }else{
      return actionStatus(false, `Client is not current player`)
    }
  default:
    return actionStatus(false, `Unknown action "${action}"`)
  }
}

const performAction = (data, state) => {
  switch(data.action){
  case 'game.start':
    startGame(data, state)
  }
}

const startGame = (data, state) => {
  // Gather players
  state.clients.forEach(client => {
    const newPlayer = new Player({
      id: client.id,
      name: randomName(),
    })
    state = reducer(state, { action: 'players.add', player: newPlayer })
  })

  // Setup all cards
  state = reducer(state, { action: 'decks.set', deck: Presets.classicCardsDeck() })

  // Set the table
  state = reducer(state, {
    action: 'containers.add',
    container: new Deck({ parent: state.players[0] })
  })
  state = reducer(state, {
    action: 'containers.add',
    container: new Deck({ parent: state.players[1] })
  })
}

const getActionType = (data) => {
  if(data.action === undefined) return ''
  const firstDot = data.action.indexOf('.')
  return data.action.slice(0, firstDot)
}

const reducer = (state = {}, data) => {
  const actionType = getActionType(data)
  console.info(`Reduce: '${actionType}', ${data.action}`)

  switch (actionType) {
  case 'clients':
    return {
      ...state,
      clients: clientsReducer(state.clients, data),
    }
  case 'players':
    return {
      ...state,
      players: playersReducer(state.players, data),
    }
  case 'cards':
    return {
      ...state,
      cards: cardsReducer(state.cards, data),
    }
  case 'containers':
    return {
      ...state,
      containers: containersReducer(state.containers, data),
    }
  default:
    return state
  }
}

const clientsReducer = require('./reducers/clients')
const playersReducer = require('./reducers/players')
const cardsReducer = require('./reducers/cards')
const containersReducer = require('./reducers/containers')

module.exports = class WarGame extends colyseus.Room {

  onInit(options) {
    this.setState({
      clients: [],
      maxClients: options.maxClients || 2,
      host: options.host,

      // Has the game started?
      started: false,
      // Clients that are actually playing the game plus some turn order variables
      players: {},
      // Initial array of all available cards in the game
      cards: [],
      // Container holding (or not yet) cards
      containers: [],
      // Table
      table: null
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
    this.state = reducer(this.state, {
      action: 'clients.add',
      client: client.id,
    })
    if(!this.state.host){
      this.state.host = client.id
    }
  }

  onLeave(client) {
    this.state = reducer(this.state, {
      action: 'clients.remove',
      client: client.id,
    })
    // TODO: Handle leave when the game is running
    // Timeout => end game? Make player able to go back in?
  }

  onMessage(client, data) {
    console.log('MSG: ', JSON.stringify(data))

    const actionStatus = canPerformThisAction(client, data.action, this.state)
    console.log(`action: ${data.action}`)
    if (actionStatus.success) {
      console.log(` - success: ${actionStatus.description}`)
      performAction(data, this.state)
      this.state = reducer(this.state, data)
    } else {
      console.warn(` - fail: ${actionStatus.description}`)
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
