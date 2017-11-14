import { Client } from 'colyseus.js'
import React from 'react'
import ReactDOM from 'react-dom'

require('./styles.scss')

// import Lobby from './lobby/index'
import WarGame from './warGame/index'

// === === === === === === == = -

const host = window.document.location.host.replace(/:.*/, '')
const client = new Client('ws://' + host + (location.port ? ':' + 2657 : ''))

const warGameRoom = client.join('warGame')

const render = (getState, testAngle = 0) => {
  const state = getState ? getState() : {}
  ReactDOM.render(
    <WarGame
      testDealHandler={() =>
        warGameRoom.send({ action: 'testDeal' })
      }
      interactionHandler={(player, reporter, element) =>
        warGameRoom.send({ action: 'interaction', player, reporter, element })
      }
      testAngle={testAngle}
      {...state}
    />,
    document.getElementById('root')
  )
}

/*const warGameController = */
import warGameController from './warGame/controller'
warGameController({
  room: warGameRoom,
  updateCallback: render,
})

warGameRoom.onJoin.add(function () {
  console.log(client.id, 'joined', warGameRoom.name)
  setTimeout(() => {
    // Testing, just init with players
    console.log('GO NOW!')
    warGameRoom.send({ action: 'gameStart' })
  }, 100)
})

warGameRoom.onLeave.add(function () {
  console.info('ON: Leave!')
  warGameRoom.removeAllListeners()
  warGameRoom.leave()

  setTimeout(() => {
    document.location.href += ''
  }, 250)
})
warGameRoom.onError.add(function () {
  console.info('ON: Error!')
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
