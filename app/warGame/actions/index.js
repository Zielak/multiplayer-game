const status = require('../../utils/actionStatusFactory')

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
