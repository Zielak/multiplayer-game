const Container = require('../container')

/**
 * TODO: Should ensure that none of the cards in hand
 * are visible to other players
 */
module.exports = class Hand extends Container {

  constructor(options = {}) {
    super({
      ...options,
      type: options.type || 'hand',
    })
  }

  addChild(element){
    super.addChild(element)
    console.log('Let me show that card!', element.type)
    if(element.type === 'card'){
      element.show && element.show()
    }
  }

  removeChild(element){
    super.removeChild(element)

    if(element.type === 'card'){
      element.show && element.hide()
    }
  }

}