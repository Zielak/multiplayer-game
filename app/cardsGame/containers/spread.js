const Container = require('../container')

module.exports = class Spread extends Container {

  constructor(options = {}) {
    super({
      ...options,
      type: options.type || 'spread',
    })
  }

}