module.exports = {
  clients: require('./arrayReducer')('clients'),
  players: require('./players'),
  cards: require('./arrayReducer')('cards'),
  containers: require('./containers'),
  testScore: {
    increase: (state) => {
      state.testScore++
    },
    decrease: (state) => {
      state.testScore--
    }
  }
}
