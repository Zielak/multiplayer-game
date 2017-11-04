const utils = require('../../shared/utils')

/**
 * Table is where all the containers and cards are laid out.
 * Table defines the dimensions of our playground and limits.
 * It's origin point is always rendered in the middle of the screen.
 * On server we don't know anything about user's screen,
 * so we're not going to assume the dimensions.
 */

class Table {

  constructor(options = {}) {
    this.width = utils.def(options.width, 55)
    this.height = utils.def(options.height, 55)
    this.x = 0
    this.y = 0
  }

}

module.exports = Table
