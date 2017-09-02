const colyseus = require('colyseus')

const {
  PlayersTurn,
  Player,
} = require('../cardsGame/index')

const randomName = () => 
  [1,2,3].map(()=>(Math.floor(Math.random()*25+65))).map((e)=>String.fromCharCode(e))

const canPerformThisAction = (client, action, state) => {
  switch (action) {
    case 'game.start':
      return client === state.host
    case '':
      return client.id === state.currentPlayer.id
    default:
      return false
  }
}

const canStartPlaying = (state) => {
  return state.clients.length > 1
}

const reducer = (state = {}, data) => {
  if(data.action === 'game.start'){
    this.setup(this.state.clients.slice(0))
    if(this.start()){
      this.broadcast({event: 'game.start'})
    } else {
      console.log(`Can't start the game yet.`)
    }
  }
}

const playersReducer = (state = [], data) => {
  switch(data.action){
    case 'player.add':
      return [
        ...state,
        data.player
      ]
    
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
      // Clients that are actually playing the game
      players: [],
      // Player currently in action
      currentPlayer: {},
      // Initial deck of cards
      cards: [],

    })
    this.canStartPlaying
    this.playersTurn = new PlayersTurn()

    console.log('WarGame room created!', options)
  }

  requestJoin(/*options*/) {
    const res = this.clients.length < this.state.maxClients
    if(!res) {
      console.log('WarGame - rejected new client!')
    }
    return this.clients.length < this.state.maxClients
  }

  onJoin(client) {
    console.log('WarGame: JOINED: ',client, JSON.stringify(client))
    this.state.clients.push(client.id)
  }

  onLeave(client) {
    this.state.clients.splice(
      this.state.clients.indexOf(client.id), 1
    )
  }

  onMessage(client, data) {
    console.log('MSG: ',JSON.stringify(data))

    if(!canPerformThisAction(client, data.action)){
      this.broadcast({
        event: 'game.error',
        data: `Client ${client} tried to perform ${data.action} action`
      })
    } else {
      this.setState(reducer(this.state, data))
    }
  }

  onDispose() {
    console.log('Dispose WarGame')
  }

  updateState(data){
    if(data.action.indexOf('player.' === 0)){
      this.setState({
        ...this.state,
        players: playersReducer(this.state.players, data)
      })
    }
    if(data.action.indexOf('player.' === 0)){
      this.setState({
        ...this.state,
        players: playersReducer(this.state.players, data)
      })
    }
  }

  // GAME FUNCTIONS === === == = -

  start(){
    if(canStartPlaying(this.state)){
      this.state.clients.forEach(client => {
        let newPlayer = new Player({
          id: client.id,
          name: randomName(),
        })
        this.updateState({action: 'player.add', player: newPlayer})
      })
      this.playersTurn
    }

    return this.started
  }

}
