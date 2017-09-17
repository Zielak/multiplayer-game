const Colyseus = require('colyseus.js')
const React = require('react')
const ReactDOM = require('react-dom')

require('./styles.css')

// const Lobby = require('./lobby/index')
const WarGame = require('./warGame/index')

// === === === === === === == = -

const host = window.document.location.host.replace(/:.*/, '')
const client = new Colyseus.Client('ws://' + host + (location.port ? ':'+2657 : ''))

const warGameRoom = client.join('warGame')

const render = (getState) => {
  console.log('render')
  const state = getState ? getState() : {}
  ReactDOM.render(
    <WarGame
      initGameHandler={() =>
        warGameRoom.send({ action: 'game.start' })
      }
      testScoreHandler={add =>
        warGameRoom.send({
          action: add > 0 ? 'testScore.increase' : 'testScore.decrease'
        })
      }
      {...state}
    />,
    document.getElementById('root')
  )
}

/*const warGameController = */require('./warGame/controller')({
  room: warGameRoom,
  updateCallback: render,
})

warGameRoom.onJoin.add(function() {
  console.log(client.id, "joined", warGameRoom.name)
})

// Initial render plz
render()

// Keep updating 
// warGameRoom.onUpdate.add(function(state) {
//   if(page === 'warGame') render()
// })

// warGameRoom.onData.add(e => {
//   if(e.event === 'game.error'){
//     console.error('game.error: ', e.data)
//   }
// })

// warGameRoom.listen('clients', change => {
//   console.log('clients changed', change)
// })
// warGameRoom.listen('host', change => {
//   console.log('host changed', change)
// })

// chatRoom.listen(function(change) {
//   console.log('patch:', change.path, change.operation, change.value)
// })
