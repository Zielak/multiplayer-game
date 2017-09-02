const Colyseus = require('colyseus.js')
const React = require('react')
const ReactDOM = require('react-dom')

require('./styles.css')

const Lobby = require('./lobby/index')
const WarGame = require('./warGame/index')

// === === === === === === == = -

const host = window.document.location.host.replace(/:.*/, '')
const client = new Colyseus.Client('ws://' + host + (location.port ? ':'+2657 : ''))

let page = 'warGame'
// const chatRoom = client.join('lobby')
const warGameRoom = client.join('warGame')

const render = () => {
  console.log('RENDER')
  switch(page){
    case 'warGame':
      ReactDOM.render(
        <WarGame room={warGameRoom}/>,
        document.getElementById('root')
      )
      break
    default:
      /*ReactDOM.render(
        <Lobby room={chatRoom}/>,
        document.getElementById('root')
      )*/
      break
  }
  
}
render()

// new room state
warGameRoom.onUpdate.add(function(state) {
  render()
})

// chatRoom.listen(function(change) {
//   console.log('patch:', change.path, change.operation, change.value)
// })
