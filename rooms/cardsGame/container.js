const Conditions = require('./conditions')
const Base = require('./base')

module.exports = class Container extends Base {

  constructor(options = {}) {
    super(options)

    // Array of cards and/or other containers
    this.elements = Array.isArray(options.elements) ? options.elements : []

    // for visuals
    this.x = options.x || 0
    this.y = options.y || 0

    // set of conditions used during gameplay
    this.conditions = new Conditions(options.conditions, this)
  }

  get length(){
    return this.elements.length
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
        this.elements.push(el)
        this.elements.onPush(el)
      })
    }
    return this
  }

  /**
   * Removes one element from container
   * 
   * @param {object} element 
   * @return {Array} containing removed elements
   */
  remove(element) {
    const idx = this.elements.indexOf(element)
    return this.elements.splice(idx, 1)
  }

  /**
   * Shuffle all elements, Fisher yates shuffle
   * 
   * @return {Container}
   */
  shuffle(){
    let i = this.elements.length
    if (i === 0) return
    while (--i) {
      const j = Math.floor(Math.random() * (i + 1))
      const tempi = this.elements[i]
      const tempj = this.elements[j]
      this.elements[i] = tempj
      this.elements[j] = tempi
    }
    return this
  }

  /**
   * Gives you the topmost element in this container
   * 
   * @return {object}
   */
  top(){
    return this.elements[this.elements.length-1]
  }

  /**
   * Gives you an element from the bottom
   * 
   * @return {object}
   */
  bottom(){
    return this.elements[0]
  }

  onPlayerTap() { }

  /**
   * Override. Will be called right after pushing an element
   * 
   * @param {object} element
   */
  onPush(element) { }

}