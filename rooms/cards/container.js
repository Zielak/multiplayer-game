const Conditions = require('./conditions')

module.exports = class Container extends Array {

  constructor(options = {}) {
    super()

    this.owner = options.owner || null

    // for visuals
    this.x = options.x || 0
    this.y = options.y || 0

    // set of conditions used during gameplay
    this.conditions = new Conditions(options.conditions, this)
  }

  /**
   * Push any number of elements using an array
   * or comma-separated values (just like in Array)
   * 
   * @param {any} element 
   * @return {Container} this container after pushing everything
   */
  push(element) {
    if (Array.isArray(element)) {
      element.forEach(el => {
        this.push(el)
      })
    } else {
      // Get all arguments into an array
      const allElements = arguments.length === 1 ?
        [arguments[0]] :
        Array.apply(null, arguments)

      allElements.forEach(el => {
        if (el.parent) {
          el.parent.remove(el)
        }
        el.parent = this
        super.push(el)
        this.onPush(el)
      })
    }
    return this
  }

  /**
   * Removes one element from container
   * 
   * @param {object} element 
   */
  remove(element) {
    const idx = this.indexOf(element)
    return this.splice(idx, 1)
  }

  /**
   * Shuffle all elements, Fisher yates shuffle
   * 
   * @return {Container}
   */
  shuffle(){
    let i = this.length
    if (i === 0) return
    while (--i) {
      const j = Math.floor(Math.random() * (i + 1))
      const tempi = this[i]
      const tempj = this[j]
      this[i] = tempj
      this[j] = tempi
    }
    return this
  }

  /**
   * Gives you the topmost element in this container
   * 
   * @return {object}
   */
  top(){
    return this[this.length-1]
  }

  /**
   * Gives you an element from the bottom
   * 
   * @return {object}
   */
  bottom(){
    return this[0]
  }

  onPlayerTap() { }

  /**
   * Override. Will be called right after pushing an element
   * 
   * @param {object} element
   */
  onPush(element) { }

  /**
   * Override. Use this to render this container in any way you want
   */
  onRender(){}
}