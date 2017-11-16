const defaultCommands = require('../../cardsGame/commands/index')

module.exports = {
  GameStart: require('./gameStart'),

  PlayCard: require('./playCard'),
  NextPlayer: defaultCommands.NextPlayer,
  PrevPlayer: defaultCommands.PrevPlayer,

  DrawUpToThree: require('./drawUpToThree'),

  TestDeal: require('./testDeal'),
}
