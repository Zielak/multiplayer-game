const React = require('react')
const PropTypes = require('prop-types')
const ReactDOM = require('react-dom')
const Redux = require('redux')

const ClientsList = require('./clientsList')
const Messages = require('./messages')

const messages = (state = [], action) => {
  switch (action.type) {
    case 'message.add':
      return [...state, action.message]
    case 'message.remove':
      return [
        ...state.slice(0, action.message.idx),
        ...state.concat(state.slice(action.message.idx + 1))
      ]
    case 'message.replace':
      return state.map((message) => {
        if(action.message.key !== message.key){
          return message
        }
        return {
          ...message,
          name: action.message.name
        }
      })
    default:
      return state
  }
}

const clients = (state = [], action) => {
  switch (action.type) {
    case 'client.add':
      return [...state, action.client]
    case 'client.remove':
      return [
        ...state.slice(0, action.client.idx),
        ...state.concat(state.slice(action.client.idx + 1))
      ]
    case 'client.replace':
      return state.map((client) => {
        if(action.client.key !== client.key){
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

const lobbyApp = Redux.combineReducers({
  clients,
  messages
})
const store = Redux.createStore(lobbyApp)

class Lobby extends React.Component{
  constructor(props) {
    super(props)
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

    props.room.listen('messages/:number', function(change) {
      console.log('new message change arrived: ', change)
      store.dispatch({
        type: 'message.' + change.operation,
        message: change.value
      })
    })

    props.room.onUpdate.addOnce(state => {
      state.clients.forEach((el, idx) => store.dispatch({
        type: 'client.add',
        client: {
          idx: idx,
          name: el,
        }
      }), this)
    })

    store.subscribe(this.render)
  }

  add(key, name) {
    const p = document.createElement('p')
    p.innerHTML = name
    p.id = 'client_' + key
    this.element.appendChild(p)
  }

  replace(key, name) {
    const el = document.getElementById('client_' + key)
    el.innerHTML = name
    el.id = 'client_' + key
  }

  remove(key) {
    document.getElementById('client_' + key).remove()
  }

  render() {
    return (
      <div className="flex">
        <Messages
          messages={store.getState().messages}
        ></Messages>
        <ClientsList
          clients={store.getState().clients}
        ></ClientsList>
      </div>
    )
  }
}

Lobby.propTypes = {
  room: PropTypes.object
}

module.exports = Lobby
