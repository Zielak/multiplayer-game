const Redux = require('redux')
const {
  playersReducer,
  hostReducer,
  gameStateReducer,
  testScoreReducer,
} = require('./reducers')

const cardsApp = Redux.combineReducers({
  playersReducer,
  hostReducer,
  gameStateReducer,
  testScoreReducer,
})

const store = Redux.createStore(cardsApp)

module.exports = ({room, updateCallback}) => {
  console.log('creating controller, listening for new stuff')
  
  const unsubscribe = store.subscribe(updateCallback.bind(null, store.getState))

  room.onUpdate.addOnce(state => {
    console.log('initial lobby data:', state)
    state.clients.forEach((el, idx) => store.dispatch({
      type: 'clients.add',
      data: {
        idx, name: el
      },
    }))
    store.dispatch({
      type: 'host.set',
      data: state.host,
    })
  })

  room.onUpdate.add(state => {
    console.log('Update', state)
  })

  // room.onUpdate.add(state => {
  //   console.log('onUpdate: ', state)
  // })

  // listen to patches coming from the server
  room.listen('clients/:number', (change) => {
    console.log('new client change arrived: ', change)
    store.dispatch({
      type: 'clients.' + change.operation,
      data: {
        idx: parseInt(change.path.number),
        name: change.value,
      }
    })
  })

  room.listen('host', (change) => {
    console.log('host changed: ', change)
    store.dispatch({
      type: 'host.' + change.operation,
      data: change.value
    })
  })

  room.listen('testScore', change => {
    // console.log('new testScore: ', change.value)
    store.dispatch({
      type: 'testScore.' + change.operation,
      data: change.value,
    })
  })

  room.listen('players/list/:number', (change) => {
    console.log('player list changed: ', change)
    store.dispatch({
      type: 'players.' + change.operation,
      data: {
        idx: parseInt(change.path.number),
        player: change.value,
      }
    })
  })
  room.listen('players/reversed', (change) => {
    console.log('player reversed changed: ', change)
  })
  room.listen('players/currentPlayerIdx', (change) => {
    console.log('player currentPlayerIdx changed: ', change)
  })
  room.listen('players/currentPlayer', (change) => {
    console.log('player currentPlayer changed: ', change)
  })

  room.listen('containers/:number', (change) => {
    // console.log('container changed: ', change)
  })

  room.listen('cards/:number', (change) => {
    // console.log('card changed: ', change)
  })

  room.listen('game.start', () => {
    console.log('game.start!? ', arguments)
  })
  
  return {
    store,
  }
}
