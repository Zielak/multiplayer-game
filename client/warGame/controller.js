import store from './store'
import {
  cardsListener,
  containersListener,
  playersListener,
} from './listeners/index'

export default ({ room, updateCallback }) => {
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

  // room.onUpdate.add(state => {
  //   console.log('UPDATE:', state)
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

  cardsListener(room)
  containersListener(room)
  playersListener(room)

  room.listen('game.start', () => {
    console.log('game.start!? ', arguments)
  })

  return {
    store,
  }
}
