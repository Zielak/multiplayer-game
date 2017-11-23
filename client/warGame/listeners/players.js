/* eslint-disable no-unused-vars */
export default ({ room, game }) => {
  room.listen('players/list/:idx', (change) => {
    console.log('player list changed: ', change)
    game.table.updatePlayer(change.operation, parseInt(change.path.idx), change.value)
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
