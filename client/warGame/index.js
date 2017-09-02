const React = require('react')
const PropTypes = require('prop-types')
const Redux = require('redux')

const PlayersList = require('../components/clientsList')

// require('./styles.css')

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
  gameState,
})

const store = Redux.createStore(cardsApp)

class Cards extends React.Component {

  constructor(props) {
    super(props)
    // Listen for initial state
    props.room.onUpdate.addOnce(state => {
      console.log('initial lobby data:', state)
      state.clients.forEach((el, idx) => store.dispatch({
        type: 'client.add',
        client: {
          idx, name: el
        },
      }))
    })

    // listen to patches coming from the server
    props.room.listen('clients/:number', (change) => {
      console.log('new client change arrived: ', change)
      store.dispatch({
        type: 'client.' + change.operation,
        client: {
          idx: change.path.number,
          name: change.value,
        }
      })
    })

    props.room.listen('game.start', () => {
      console.log('game.start!? ', arguments)
    })
  }

  render() {
    return (
      <div className="flex">
        <div>
          <button onClick={()=>this.initGameHandler()}>
            Maybe START?
          </button>
        </div>
        <PlayersList
          title="Players"
          clients={store.getState().players}
        ></PlayersList>
      </div>
    )
  }

  initGameHandler(){
    this.props.room.send({action: 'init'})
  }
}

Cards.propTypes = {
  room: PropTypes.object
}

module.exports = Cards
