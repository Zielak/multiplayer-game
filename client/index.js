import { Client } from 'colyseus.js'

// import Lobby from './lobby/index'
// import WarGame from './warGame/index'

require('./styles.scss')

// === === === === === === == = -

const host = window.document.location.host.replace(/:.*/, '')
const client = new Client('ws://' + host + (location.port ? ':' + 2657 : ''))

const warGameRoom = client.join('warGame')

/*const warGameController = */
import warGameController from './warGame/controller'
warGameController({
  room: warGameRoom,
  updateCallback: (getState) => {
    const state = getState ? getState() : {}
    state
  }
})

warGameRoom.onJoin.add(function () {
  console.log(client.id, 'joined', warGameRoom.name)
  setTimeout(() => {
    // Testing, just init with players
    console.log('GO NOW!')
    warGameRoom.send({ action: 'GameStart' })
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
// render()
