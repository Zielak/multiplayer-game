const Redux = require('redux')

const players = (state = [], action) => {
  switch (action.type) {
    case 'client.add':
      return [...state, action.client]
    case 'client.remove':
      return [
        ...state.slice(0, action.client.idx),
        ...state.slice(action.client.idx + 1)
      ]
    case 'client.replace':
      return state.map((client) => {
        if (action.client.idx !== client.idx) {
          return client
        }
        return {
          ...client,
          name: action.client.name
        }
      })
    default:
      return state
  }
}

const host = (state = null, action) => {
  if(action.type === 'host.set'){
    return action.host
  } else {
    return state
  }
}

const gameState = (state, action) => {
  if (state === undefined) {
    return {
      started: false,
    }
  } else {
    return state
  }
}

const cardsApp = Redux.combineReducers({
  players,
  host,
  gameState,
})

const store = Redux.createStore(cardsApp)

module.exports = ({room, updateCallback}) => {
  console.log('creating controller, listening for new stuff')
  
  let a = ''
  const unsubscribe = store.subscribe(updateCallback.bind(null, store.getState))

  room.onUpdate.addOnce(state => {
    console.log('initial lobby data:', state)
    state.clients.forEach((el, idx) => store.dispatch({
      type: 'client.add',
      client: {
        idx, name: el
      },
    }))
    store.dispatch({
      type: 'host.set',
      host: state.host,
    })
  })

  // room.onUpdate.add(state => {
  //   console.log('onUpdate: ', state)
  // })

  // listen to patches coming from the server
  room.listen('clients/:number', (change) => {
    console.log('new client change arrived: ', change)
    store.dispatch({
      type: 'client.' + change.operation,
      client: {
        idx: parseInt(change.path.number),
        name: change.value,
      }
    })
  })

  room.listen('host', (change) => {
    console.log('host changed: ', change)
  })

  room.listen('players/:number', (change) => {
    console.log('player changed: ', change)
  })

  room.listen('containers/:number', (change) => {
    console.log('container changed: ', change)
  })

  room.listen('cards/:number', (change) => {
    console.log('card changed: ', change)
  })

  room.listen('game.start', () => {
    console.log('game.start!? ', arguments)
  })
  
  return {
    store,
  }
}
