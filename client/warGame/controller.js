const Redux = require('redux')

const players = (state, action) => {
  if(state === undefined) {
    return {
      list: [],
      reversed: false,
      currentPlayerIdx: 0,
      currentPlayer: null,
    }
  }
  switch (action.type) {
  case 'players.add':
    return {
      ...state,
      list: [...state.list, action.data.player]
    }
  case 'players.remove':
    return {
      ...state,
      list: [
        ...state.slice(0, action.data.idx),
        ...state.slice(action.data.idx + 1)
      ]
    }
  case 'players.replace':
    return {
      ...state,
      list: state.map((player) => {
        if (action.data.idx !== player.idx) {
          return player
        }
        return {
          ...player,
          name: action.data.player.name
        }
      })
    }
  case 'players.reversed':
    return {
      ...state,
      reversed: action.data.player
    }
  default:
    return state
  }
}

const host = (state = null, action) => {
  action.type === 'host.add'
  switch(action.type){
  case 'host.add':
  case 'host.replace':
    return action.data
  default:
    return state
  }
}

const gameState = (state = {}, action) => {
  if (state === undefined) {
    return {
      started: false,
    }
  } else {
    return state
  }
}

const testScore = (state = 0, action) => {
  if(action.type === 'testScore.replace' || action.type === 'testScore.add'){
    return action.data
  }else{
    return state
  }
}

const cardsApp = Redux.combineReducers({
  players,
  host,
  gameState,
  testScore,
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
    console.log('new testScore: ', change.value)
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
