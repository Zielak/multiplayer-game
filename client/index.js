const Colyseus = require('colyseus.js')
const React = require('react')
const ReactDOM = require('react-dom')

const Lobby = require('./lobby/index')

// === === === === === === == = -

const host = window.document.location.host.replace(/:.*/, '')
const client = new Colyseus.Client('ws://' + host + (location.port ? ':'+2657 : ''))

const chatRoom = client.join('chat')

chatRoom.onUpdate.addOnce(function(state) {
  console.log('initial room data:', state)
  ReactDOM.render(
    <Lobby room={chatRoom}/>,
    document.getElementById('root')
  )
})

// new room state
chatRoom.onUpdate.add(function(state) {
  console.log(`state updated`, state)
})

// chatRoom.listen(function(change) {
//   console.log('patch:', change.path, change.operation, change.value)
// })
