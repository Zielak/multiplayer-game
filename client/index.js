import { Client } from 'colyseus.js'

// import Lobby from './lobby/index'
import WarGame from './warGame/index'

require('./styles.scss')

// === === === === === === == = -

const host = window.document.location.host.replace(/:.*/, '')
const client = new Client('ws://' + host + (location.port ? ':' + 2657 : ''))

const gameRoom = client.join('warGame')

/*const game = */new WarGame({ room: gameRoom })

gameRoom.onJoin.add(function () {
  console.log(client.id, 'joined', gameRoom.name)
  setTimeout(() => {
    // Testing, just init with players
    console.log('GO NOW!')
    gameRoom.send({ action: 'GameStart' })
  }, 100)
})

gameRoom.onLeave.add(function () {
  console.info('ON: Leave!')
  gameRoom.removeAllListeners()
  gameRoom.leave()

  setTimeout(() => {
    document.location.href += ''
  }, 250)
})
gameRoom.onError.add(function () {
  console.info('ON: Error!')
})
