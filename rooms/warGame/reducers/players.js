module.exports = (state, data) => {
  const players = state.players
  let currIdx = players.currentPlayerIdx
  switch (data.action) {
  case 'players.add':
    players.list.push(data.player)
    break
  case 'players.next':
    if (!players.reversed) {
      if (++currIdx > players.list.length - 1) {
        currIdx = 0
      }
    } else {
      if (--currIdx < 0) {
        currIdx = players.list.length - 1
      }
    }
    players.currentPlayerIdx = currIdx
    players.currentPlayer = players.list[currIdx]
    break
  case 'players.prev':
    if (players.reversed) {
      if (++currIdx > players.list.length - 1) {
        currIdx = 0
      }
    } else {
      if (--currIdx < 0) {
        currIdx = players.list.length - 1
      }
    }
    players.currentPlayerIdx = currIdx
    players.currentPlayer = players.list[currIdx]
    break
  case 'players.shuffle':
    shufflePlayers(players)
    break
  case 'players.reverse':
    return {
      ...state,
      reversed: !state.reversed
    }
  default:
    return state
  }
}

const shufflePlayers = (players) => {
  let currentPlayerIdx = players.currentPlayerIdx
  let i = players.list.length
  if (i === 0){
    return
  }
  while (--i) {
    const j = Math.floor(Math.random() * (i + 1))
    const tempi = players.list[i]
    const tempj = players.list[j]
    players.list[i] = tempj
    players.list[j] = tempi
    // Keep the current player the same
    if(i === currentPlayerIdx){
      currentPlayerIdx = j
    }
  }
  players.currentPlayerIdx = currentPlayerIdx
  players.currentPlayer = players.list[currentPlayerIdx]
}
