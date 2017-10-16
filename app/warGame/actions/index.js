module.exports = {
  startGame: require('./startGame'),
  testScore_increase: (state, reducer) => reducer.testScore['increase'](state),
  testScore_decrease: (state, reducer) => reducer.testScore['decrease'](state)
}
