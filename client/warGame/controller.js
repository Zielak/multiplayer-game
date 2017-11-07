import store from './store'
import {
  cardsListener,
  containersListener,
  playersListener,
} from './listeners/index'

export default ({ room, updateCallback }) => {
  console.log('creating controller, listening for new stuff')

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
    console.log('UPDATE', state)
    updateCallback.call(null, store.getState)
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

  cardsListener(room)
  containersListener(room)
  playersListener(room)

  room.listen('gameStart', () => {
    console.log('gameStart!? ', arguments)
  })

  return {
    store,
  }
}
