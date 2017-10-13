import {
  combineReducers,
  createStore
} from 'redux'
import {
  players,
  host,
  containers,
  cards,
  gameState,
  testScore,
} from './reducers'

const cardsApp = combineReducers({
  players,
  host,
  containers,
  cards,
  gameState,
  testScore,
})

const store = createStore(cardsApp)

export default ({room, updateCallback}) => {
  console.log('creating controller, listening for new stuff')
  
  /*const unsubscribe = */store.subscribe(updateCallback.bind(null, store.getState))

  // let angle = 0

  // setInterval(() => {
  //   angle += 3
  //   updateCallback(store.getState, angle)
  // }, 250)

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
    console.log('container changed: ', change)
    store.dispatch({
      type: 'containers.' + change.operation,
      data: {
        idx: parseInt(change.path.number),
        container: change.value,
      }
    })
  })

  room.listen('cards/:number', (change) => {
    // console.log('card changed: ', change)
    store.dispatch({
      type: 'cards.' + change.operation,
      data: {
        idx: parseInt(change.path.number),
        card: change.value,
      }
    })
  })

  room.listen('game.start', () => {
    console.log('game.start!? ', arguments)
  })
  
  return {
    store,
  }
}
