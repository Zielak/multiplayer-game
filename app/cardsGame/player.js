const Base = require('./base')

class Player extends Base {

  constructor(options = {}) {
    super(options)

    this.type = 'player'

    this.name = options.name
    this.clientId = options.clientId

    // Defaults
    this.score = 0
    // Infinite time left for testing
    this.timeleft = 'Infinity'
  }

}

module.exports = Player
