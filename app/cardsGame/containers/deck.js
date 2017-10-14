const Container = require('../container')

/**
 * Neatly stacked cards on top of eachother. Only the top card is visible.
 * Deck respects card's `faceUp` state,
 * and will show the face or back of visible card
 */
module.exports = class Deck extends Container {

  constructor(options = {}) {
    super({
      ...options,
      type: options.type || 'deck',
    })
  }

  /**
   * Deals `count` cards from this container to other containers.
   * Eg. hands
   * 
   * @param {array|Container} containers 
   * @param {[number]} count how many cards should I deal for each player?
   */
  deal(containers, count = Infinity) {
    let i = 0
    containers = Array.isArray(containers) ? containers : [containers]
    containers = containers.map(Container.toObject)
    const maxDeals = count * containers.length

    console.warn(`I myself have ${this.children.length} cards`)
    while(this.children.length > 0 && i < maxDeals){
      console.info(`${i}: to containers[${i%containers.length}] => ${this.children.length} cards left`)
      const card = this.top()
      containers[i%containers.length].addChild(card)
      i++
    }
    this.onCardsDealt(containers)
  }

  onCardsDealt(containers) {
    console.info('Done dealing cards.')
    console.info(containers.map(el => el.children))
  }

}
