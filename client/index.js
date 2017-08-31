const Colyseus = require('colyseus.js')
const ClientsList = require('./lobby/clientsList')

const host = window.document.location.host.replace(/:.*/, '')
const client = new Colyseus.Client('ws://' + host + (location.port ? ':'+2657 : ''))

const chatRoom = client.join('chat')

const clients = new ClientsList(document.getElementById('clients'), chatRoom)
clients.lol

chatRoom.onUpdate.addOnce(function(state) {
  console.log('initial room data:', state)
})

// new room state
chatRoom.onUpdate.add(function(state) {
  console.log(`state updated`, state)
})

// listen to patches coming from the server
chatRoom.listen('messages/:number', function(change) {
  const p = document.createElement('p')
  p.innerHTML = change.value
  document.getElementById('messages').appendChild(p)
})

chatRoom.listen(function(change) {
  console.log('patch:', change.path, change.operation, change.value)
})

// send data to room on submit
document.getElementById('form').onsubmit = function(e) {
  e.preventDefault()

  const input = document.getElementById('input')

  // send data to room
  chatRoom.send({ message: input.value })

  // clear input
  input.value = ''
}
