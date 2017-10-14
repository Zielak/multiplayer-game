const Container = require('../container')

module.exports = class Row extends Container {

  constructor(options = {}) {
    super({
      ...options,
      type: options.type || 'row',
    })
  }

}