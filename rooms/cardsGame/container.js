const Conditions = require('./conditions')
const Base = require('./base')

module.exports = class Container extends Base {

  constructor(options = {}) {
    super(options)

    // for visuals
    this.x = options.x || 0
    this.y = options.y || 0

    // set of conditions used during gameplay
    this.conditions = new Conditions(options.conditions, this)
  }

  get length() {
    return this.children.length
  }

  /**
   * Shuffle all elements, Fisher yates shuffle
   * 
   * @return {Container}
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
    return this
  }

  /**
   * Gives you the topmost element in this container
   * 
   * @return {object}
   */
  top() {
    return this.children[this.children.length - 1]
  }

  /**
   * Gives you an element from the bottom
   * 
   * @return {object}
   */
  bottom() {
    return this.children[0]
  }

}