import { appendIdx } from '../../../shared/utils'

export default (target, room) => {
  room.listen('players/list/:idx', (change) => {
    console.log('player list changed: ', change)
    target.emit('players.' + change.operation, {
      idx: parseInt(change.path.idx),
      player: appendIdx(change.value, parseInt(change.path.idx)),
    })
  })
  room.listen('players/reversed', (change) => {
    console.log('player reversed changed: ', change)
  })
  room.listen('players/currentPlayerIdx', (change) => {
    console.log('player currentPlayerIdx changed: ', change)
  })
  room.listen('players/currentPlayer', (change) => {
    console.log('player currentPlayer changed: ', change)
  })
}
