const Conditions = require('./conditions')
const Base = require('./base')

class Container extends Base {

  constructor(options = {}) {
    super(options)

    // set of conditions used during gameplay
    this.conditions = new Conditions(options.conditions, this)
  }

  get length() {
    return this.children.length
  }

  /**
   * Shuffle all elements, Fisher yates shuffle
   * 
   * @return {Container} this for chaining
   */
  shuffle() {
    let i = this.children.length
    if (i === 0) return
    while (--i) {
      const j = Math.floor(Math.random() * (i + 1))
      const tempi = this.children[i]
      const tempj = this.children[j]
      this.children[i] = tempj
      this.children[j] = tempi
    }
    this.emit(Container.SHUFFLED)
    return this
  }

  /**
   * Gives you the topmost element in this container
   * 
   * @return {object}
   */
  top() {
    return Container.get(this.children[this.children.length - 1])
  }

  /**
   * Gives you an element from the bottom
   * 
   * @return {object}
   */
  bottom() {
    return Container.get(this.children[0])
  }

}

Container.events = {
  ...Base.events,
  SHUFFLED: 'shuffled',
}

module.exports = Container
