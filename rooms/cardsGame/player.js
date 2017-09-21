const Base = require('./base')

module.exports = class Player extends Base {

  constructor(options = {}){
    super(options)

    this.name = options.name
    this.clientId = options.clientId
    
    // Defaults
    this.score = 0
    // Infinite time left for testing
    this.timeleft = "Infinity"
  }

}