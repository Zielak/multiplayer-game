import PropTypes from 'prop-types'
import Store from './store'

import {
  cardsListener,
  containersListener,
  playersListener,
} from './listeners/index'

import {
  Game, Table
} from '../cardsGame/index'

class WarGame extends Game {

  constructor(props) {
    super()
    this.props = props

    this.table = new Table(props)
    this.store = new Store(this.stage)

    this.startListening()
  }

  startListening() {
    const room = this.props.room
    console.log('creating controller, listening for new stuff')

    room.onUpdate.addOnce(state => {
      console.log('initial lobby data:', state)
      state.clients.forEach((el, idx) => this.store.dispatch({
        type: 'clients.add',
        data: {
          idx, name: el
        },
      }))
      this.store.dispatch({
        type: 'host.set',
        data: state.host,
      })
    })

    room.onUpdate.add(state => {
      console.log('UPDATE', state)
      // updateCallback.call(null, this.store.getState)
    })

    // listen to patches coming from the server
    room.listen('clients/:number', (change) => {
      console.log('new client change arrived: ', change)
      this.store.dispatch({
        type: 'clients.' + change.operation,
        data: {
          idx: parseInt(change.path.number),
          name: change.value,
        }
      })
    })

    room.listen('host', (change) => {
      console.log('host changed: ', change)
      this.store.dispatch({
        type: 'host.' + change.operation,
        data: change.value
      })
    })

    cardsListener({
      room, store: this.store
    })
    containersListener({
      room, store: this.store
    })
    playersListener({
      room, store: this.store
    })

    room.listen('GameStart', () => {
      console.log('GameStart!? ', arguments)
    })
  }

  storeToTable() {
    
  }
}

WarGame.propTypes = {
  testDealHandler: PropTypes.func,

  players: PropTypes.object,
  cards: PropTypes.array,
  containers: PropTypes.array,
  room: PropTypes.object,

  host: PropTypes.string,
}

export default WarGame
