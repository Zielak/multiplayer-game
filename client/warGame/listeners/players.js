import store from '../store'

export default room => {
  room.listen('players/list/:number', (change) => {
    console.log('player list changed: ', change)
    store.dispatch({
      type: 'players.' + change.operation,
      data: {
        idx: parseInt(change.path.number),
        player: change.value,
      }
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