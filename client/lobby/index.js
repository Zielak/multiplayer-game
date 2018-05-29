import React from 'react'
import PropTypes from 'prop-types'
import Redux from 'redux'

// import ClientsList from './../components/clientsList'
// import Messages from './messages'

// TODO: don't load styles when not in view?
require('./styles.scss')

const messages = (state = [], action) => {
  switch (action.type) {
  case 'message.add':
    return [...state, action.message]
  case 'message.remove':
    return [
      ...state.slice(0, action.message.idx),
      ...state.slice(action.message.idx + 1)
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
      ...state.slice(action.client.idx + 1)
    ]
  case 'client.replace':
    return state.map((client) => {
      if(action.client.idx !== client.idx){
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
    // Listen for initial state
    props.room.onStateChange.addOnce(state => {
      console.log('initial lobby data:', state)
      state.clients.forEach((el, idx) => store.dispatch({
        type: 'client.add',
        client: {
          idx, name: el
        },
      }))
      state.messages.forEach(el => store.dispatch({
        type: 'message.add',
        message: el,
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

    props.room.listen('messages/:number', function(change) {
      console.log('new message change arrived: ', change)
      store.dispatch({
        type: 'message.' + change.operation,
        message: change.value
      })
    })

    // store.subscribe(() => {
    //   this.render()
    // })
  }

  render() {
    // return (
    //   <div className="flex">
    //     <Messages
    //       messages={store.getState().messages}
    //       sendMessageHandler={message => {
    //         this.props.room.send({ message })
    //       }}
    //     ></Messages>
    //     <ClientsList
    //       title="Clients"
    //       clients={store.getState().clients}
    //     ></ClientsList>
    //   </div>
    // )
  }
}

Lobby.propTypes = {
  room: PropTypes.object
}

export default Lobby
