module.exports = {
  isPlayersTurn: (state, player) => {
    return state.players.currentPlayer === player
  },
}
