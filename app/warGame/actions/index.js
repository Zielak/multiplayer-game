const status = (success = true, description = '') => {
  const o = { success, description }
  o.valueOf = function valueOf() {
    this.success
  }
  return o
}

module.exports = {
  gameStart: require('./gameStart'),
  testScore_increase: {
    condition: () => status(true),
    action: (state, reducer) => reducer.testScore['increase'](state),
  },
  testScore_decrease: {
    condition: () => status(true),
    action: (state, reducer) => reducer.testScore['decrease'](state),
  }
}
