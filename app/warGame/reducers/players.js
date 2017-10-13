module.exports = {
  add: (state, player) => state.players.list.push(player),

  update: (state, player) => {
    state.players.list.forEach(element => {
      if (element.id === player.id) {
        for (const key in player) {
          element[key] = player[key]
        }
      }
    })
  },

  next: (state) => {
    const players = state.players
    let currIdx = players.currentPlayerIdx
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
  },

  prev: (state) => {
    const players = state.players
    let currIdx = players.currentPlayerIdx
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
  },

  shuffle: (state) => {
    let currentPlayerIdx = state.players.currentPlayerIdx
    let i = state.players.list.length
    if (i === 0) {
      return
    }
    while (--i) {
      const j = Math.floor(Math.random() * (i + 1))
      const tempi = state.players.list[i]
      const tempj = state.players.list[j]
      state.players.list[i] = tempj
      state.players.list[j] = tempi
      // Keep the current player the same
      if (i === currentPlayerIdx) {
        currentPlayerIdx = j
      }
    }
    state.players.currentPlayerIdx = currentPlayerIdx
    state.players.currentPlayer = state.players.list[currentPlayerIdx]
  },

  reverse: (state) => {
    state.players.reversed = state.players.reversed
  }
}
