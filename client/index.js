const Colyseus = require('colyseus.js')
const ClientsList = require('./clientsList')

var host = window.document.location.host.replace(/:.*/, '')
var client = new Colyseus.Client('ws://' + host + (location.port ? ':'+2657 : ''))

var chatRoom = client.join('chat')

const clientsList = new ClientsList(document.getElementById('clients'), chatRoom)

chatRoom.onUpdate.addOnce(function(state) {
  console.log('initial room data:', state)
})

// new room state
chatRoom.onUpdate.add(function(state) {
  console.log(`state updated`, state)
})

// listen to patches coming from the server
chatRoom.listen('messages/:number', function(change) {
  var p = document.createElement('p')
  p.innerHTML = change.value
  document.getElementById('messages').appendChild(p)
})

chatRoom.listen(function(change) {
  console.log('patch:', change.path, change.operation, change.value)
})

// send data to room on submit
document.getElementById('form').onsubmit = function(e) {
  e.preventDefault()

  var input = document.getElementById('input')

  // send data to room
  chatRoom.send({ message: input.value })

  // clear input
  input.value = ''
}


