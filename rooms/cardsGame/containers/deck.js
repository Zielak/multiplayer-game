const Container = require('../container')

/**
 * Neatly stacked cards on top of eachother. Only the top card is visible.
 * Deck respects card's `faceUp` state,
 * and will show the face or back of visible card
 */
module.exports = class Deck extends Container {

  get type(){
    return 'deck'
  }

  /**
   * Deals `count` cards from this container to other containers.
   * Eg. hands
   * 
   * @param {number} count how many cards should I deal?
   * @param {array|Container} containers 
   */
  deal(count, containers) {
    let i = 0
    containers = !Array.isArray(containers) ? [containers] : containers
    const totalCount = count * containers.length

    const dealOne = () => {
      if (this.length === 0 || i === totalCount) {
        this.onCardsDealt()
        return
      }
      containers[i%containers.length].push(this.top())
      i++
      dealOne()
    }
    dealOne()
  }

  onCardsDealt() {}

}
