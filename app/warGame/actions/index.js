const defaultCommands = require('../../cardsGame/commands/index')

module.exports = {
  gameStart: require('./gameStart'),

  playCard: require('./playCard'),
  nextPlayer: defaultCommands.nextPlayer,
  prevPlayer: defaultCommands.prevPlayer,

  drawUpToThree: require('./drawUpToThree'),

  testDeal: require('./testDeal'),
}
