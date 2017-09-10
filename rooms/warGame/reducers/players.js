module.exports = (state = {}, data) => {
  let currIdx = state.currentPlayerIdx
  switch (data.action) {
  case 'players.add':
    return {
      ...state,
      players: data.player
    }
  case 'players.next':
    if (!state.reversed) {
      if (++currIdx > state.players.length - 1) {
        currIdx = 0
      }
    } else {
      if (--currIdx < 0) {
        currIdx = state.players.length - 1
      }
    }
    return {
      ...state,
      currentPlayerIdx: currIdx,
      currentPlayer: state.players[currIdx],
    }
  case 'players.prev':
    if (state.reversed) {
      if (++currIdx > state.players.length - 1) {
        currIdx = 0
      }
    } else {
      if (--currIdx < 0) {
        currIdx = state.players.length - 1
      }
    }
    return {
      ...state,
      currentPlayerIdx: currIdx,
      currentPlayer: state.players[currIdx],
    }
  case 'players.shuffle':
    return shufflePlayers(state)
  case 'players.reverse':
    return {
      ...state,
      reversed: !state.reversed
    }
  default:
    return state
  }
}

const shufflePlayers = (state) => {
  const players = state.players.slice(0)
  let currentPlayerIdx = state.currentPlayerIdx
  let i = players.length
  if (i === 0){
    return state
  }
  while (--i) {
    const j = Math.floor(Math.random() * (i + 1))
    const tempi = players[i]
    const tempj = players[j]
    players[i] = tempj
    players[j] = tempi
    // Keep the current player the same
    if(i === currentPlayerIdx){
      currentPlayerIdx = j
    }
  }
  return {
    ...state,
    players,
    currentPlayerIdx,
    currentPlayer: players[currentPlayerIdx],
  }
}
