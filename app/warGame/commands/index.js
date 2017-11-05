const defaultCommands = require('../../cardsGame/commands/index')

module.exports = {
  gameStart: require('./gameStart'),

  nextPlayer: defaultCommands.nextPlayer,
  prevPlayer: defaultCommands.prevPlayer,

  drawUpToThree: require('./drawUpToThree'),
}
