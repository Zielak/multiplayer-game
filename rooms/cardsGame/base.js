const uuid = require('uuid/v4')
const Player = require('./player')
const utils = require('./utils')

module.exports = class Base {
  constructor(options = {}){
    this.id = uuid()

    // Real-life size (in CM) and position
    this.x = utils.default(options.x, 0)
    this.y = utils.default(options.y, 0)
    this.width = utils.default(options.width, 5)
    this.width = utils.default(options.width, 5)
    
    // Parent element which holds this container
    this.parent = utils.default(options.parent, null)
  }

  /**
   * Get the real owner of this container, by traversing `this.parent` chain.
   * 
   * @readonly
   * @return {Player|null} `Player` or `null` if this container doesn't belong to anyone
   */
  get owner(){
    if(this.parent instanceof Player){
      return this.parent
    } else if (this.parent === null) {
      return null
    } else {
      return this.parent.owner
    }
  }
}
