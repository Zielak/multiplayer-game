const colyseus = require('colyseus')

const {
  Deck,
  PlayersTurn,
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
      if(client === state.host){
        return actionStatus()
      }else{
        return actionStatus(false, `Client is not a host`)
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

const canStartPlaying = (state) => {
  return state.clients.length > 1
}

const getActionType = (data) => {
  if(data.action === undefined) return ''
  const firstDot = data.action.indexOf('.')
  return data.action.slice(0, firstDot)
}

const reducer = (state = {}, data) => {
  const actionType = getActionType(data)
  console.log(`Reduce: '${actionType}', ${data.action}`)

  let newState

  switch (actionType) {
    case 'client':
      newState = {
        ...state,
        clients: clientsReducer(state.clients, data),
      }
      break
    case 'host':
      newState = {
        ...state,
        host: hostReducer(state.host, data),
      }
      break
    case 'player':
      newState = {
        ...state,
        players: playersReducer(state.players, data),
      }
      break
    case 'card':
      newState = {
        ...state,
        cards: cardsReducer(state.cards, data),
      }
      break
    case 'container':
      newState = {
        ...state,
        containers: containersReducer(state.containers, data),
      }
      break
  }

  return newState
}

const clientsReducer = (state = [], data) => {
  switch (data.action) {
    case 'client.add':
      return [
        ...state,
        data.client
      ]
    case 'client.remove':
      return state.filter(el => el !== data.client)
    default:
      return state
  }
}

const playersReducer = (state = [], data) => {
  switch (data.action) {
    case 'player.add':
      return [
        ...state,
        data.player
      ]
    default:
      return state
  }
}
const cardsReducer = (state = [], data) => {
  return state
}
const containersReducer = (state = [], data) => {
  return state
}

module.exports = class WarGame extends colyseus.Room {

  onInit(options) {
    this.setState({
      clients: [],
      maxClients: options.maxClients || 2,
      host: options.host,

      // Has the game started?
      started: false,
      // Clients that are actually playing the game
      players: [],
      // Player currently in action
      currentPlayer: {},
      // Initial array of all available cards in the game
      cards: [],
      // Container holding (or not yet) cards
      containers: [],
      // Table
      table: null
    })
    this.playersTurn = new PlayersTurn()
    
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
      action: 'client.add',
      client: client.id,
    })
    if(!this.state.host){
      this.state.host = client.id
    }
  }

  onLeave(client) {
    this.state = reducer(this.state, {
      action: 'client.remove',
      client: client.id,
    })
    // TODO: Handle leave when the game is running
    // Timeout => end game? Make player able to go back in?
  }

  onMessage(client, data) {
    console.log('MSG: ', JSON.stringify(data))

    const actionStatus = canPerformThisAction(client, data.action, this.state)

    if (actionStatus.success) {
      this.state = reducer(this.state, data)
      this.act(data)
    } else {
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

  // GAME FUNCTIONS === === == = -

  act(data){
    switch(data.action){
      case 'game.start':
        this.start()
    }
  }

  start() {
    if (canStartPlaying(this.state)) {
      // Gather players
      this.state.clients.forEach(client => {
        const newPlayer = new Player({
          id: client.id,
          name: randomName(),
        })
        this.state = reducer({ action: 'player.add', player: newPlayer })
      })
      this.playersTurn.setPlayers(this.state.players)

      // Setup all cards
      this.state = reducer({ action: 'deck.set', deck: Presets.classicCardsDeck() })

      // Set the table
      this.state = reducer({
        action: 'container.add',
        container: new Deck({ parent: this.playersTurn.players[0] })
      })
      this.state = reducer({
        action: 'container.add',
        container: new Deck({ parent: this.playersTurn.players[1] })
      })
    } else {
      console.log(`Can't start the game yet.`)
    }

    return this.started
  }

}
