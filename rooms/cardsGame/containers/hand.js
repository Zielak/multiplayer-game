const Container = require('../container')

/**
 * TODO: Should ensure that none of the cards in hand
 * are visible to other players
 */
module.exports = class Hand extends Container {

  constructor(options){
    super(options)
  }

  get type(){
    return 'hand'
  }

}