const utils = require('./utils')

/**
 * Table is where all the containers and cards are laid out.
 * Table defines the dimensions of our playground and limits.
 * It's origin point is always rendered in the middle of the screen.
 * On server we don't know anything about user's screen,
 * so we're not going to assume the dimensions.
 */
module.exports = class Table {

  constructor(options = {}){
    this.width = utils.default(options.width, 55)
    this.height = utils.default(options.height, 55)
    this.x = 0
    this.y = 0
  }

}