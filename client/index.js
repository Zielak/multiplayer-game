const Colyseus = require('colyseus.js')
const React = require('react')
const ReactDOM = require('react-dom')

require('./styles.css')

const Lobby = require('./lobby/index')
const Cards = require('./cards/index')

// === === === === === === == = -

const host = window.document.location.host.replace(/:.*/, '')
const client = new Colyseus.Client('ws://' + host + (location.port ? ':'+2657 : ''))

const chatRoom = client.join('chat')
const cardsRoom = client.join('cards')

const render = () => {
  console.log('RENDER')
  ReactDOM.render(
    <Lobby room={chatRoom}/>,
    document.getElementById('root')
  )
}
render()

// new room state
chatRoom.onUpdate.add(function(state) {
  render()
})

// chatRoom.listen(function(change) {
//   console.log('patch:', change.path, change.operation, change.value)
// })
