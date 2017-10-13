const Container = require('../container')

module.exports = class Spread extends Container {

  constructor(options = {}) {
    super(options)
    this.type = 'spread'
  }

}