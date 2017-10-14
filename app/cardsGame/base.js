const uuid = require('uuid/v4')
const utils = require('./utils')

const objects = new Map()

module.exports = class Base {
  constructor(options = {}) {
    this.id = uuid()

    // Store a reference to itself by ID
    objects.set(this.id, this)

    this.type = utils.def(options.type, undefined)
    this.name = utils.def(options.name, undefined)

    // Has any dimensions? Add to seperate object
    // if (utils.exists(options.x) || utils.exists(options.y)
    // || utils.exists(options.y) || utils.exists(options.y)) {
    this.dimensions = {
      // Real-life size (in CM) and position
      x: utils.def(options.x, 0),
      y: utils.def(options.y, 0),
      width: utils.def(options.width, 5),
      height: utils.def(options.height, 5),
    }
    // }

    // List of children ID's
    this.children = []

    this.onUpdate = utils.def(options.onUpdate || utils.noop)

    // Sanitize parent to ID
    if (
      typeof options.parent === 'object' &&
      options.parent.id && typeof options.parent.id === 'string'
    ) {
      // console.log('Parent was object', options.parent)
      options.parent = options.parent.id
    } else {
      // console.log('Parent was nothing?', options.parent)
      options.parent = null
    }

    // Add myself to my new parent element
    if (options.parent !== null) {
      const parent = objects.get(options.parent)
      parent && parent.addChild(this.id)
    }
  }

  /**
   * Get the real owner of this container, by traversing `this.parent` chain.
   * 
   * @readonly
   * @return {Player|null} `Player` or `null` if this container doesn't belong to anyone
   */
  get owner() {
    if (typeof Base.get(this.parent) === 'object') {
      return this.parent
    } else if (this.parent === null) {
      return null
    } else {
      return Base.get(this.parent.owner)
    }
  }

  /**
   * Adds new child to this element, ensuring that its last parent
   * knows about this change.
   * 
   * @param {any|string} element reference to an object or its ID
   * @returns this
   */
  addChild(element) {
    const child = typeof element === 'string' ? objects.get(element) : element

    // Notify element's last parent of change
    const lastParent = objects.get(child.parent)
    if (lastParent) {
      lastParent.removeChild(child)
    }

    // Change child's parent element
    child.parent = this.id

    // Add to this list
    this.children.push(child.id)
    this.onUpdate(this)
    child.onUpdate(child)
    return this
  }

  /**
   * Removes one child
   * 
   * @param {any|string} element reference to an object or its ID
   * @returns this
   */
  removeChild(element) {
    const child = typeof element === 'string' ? Base.get(element) : element

    if(!child) {
      throw new ReferenceError(`couldn't find that chid: ${child}`)
    }

    // Confirm it's my child
    if(!this.children.some(id => id === child.id)){
      return this
    }

    // Nullify its parent
    child.parent = null

    this.children = this.children.filter(id => id !== child.id)
    this.onUpdate(this)
    child.onUpdate(child)
    return this
  }

  filterByName(/*name*/) { }

  /**
   * Get every child of a certain type
   * FIXME: how to handle nested elements?
   * 
   * @param {string} type what kind of elements do you want
   * @return {Array<object>} list of found elements
   */
  filterByType(type) {
    const nested = []
    const found = this.children
      .map(Base.toObject)
      .filter(el => {
        if (el.children.length > 1) {
          nested.push(...el.filterByType(type))
        }
        return el.type === type
      })
    return [...found, ...nested]
  }

  /**
   * Get a reference to the object by its ID
   * 
   * @static
   * @param {string} id 
   * @returns {any}
   */
  static get(id) {
    return objects.get(id)
  }

  /**
   * Maps an ID to object reference
   * 
   * @static
   * @param {any} element preferably string ID
   * @returns {object}
   */
  static toObject(element) {
    return typeof element === 'string' ? Base.get(element) : element
  }

  // /**
  //  * Maps all ID strings to an array of objects
  //  * 
  //  * @static
  //  * @param {array} [elements=[]] array of strings
  //  * @returns {array}
  //  */
  // static mapToObject(elements = []) {
  //   console.warn('typeof elements: ', typeof elements)
  //   console.warn(elements)
  //   return elements.map(Base.toObject)
  // }

  /**
   * Only for testing. Do not use while playing
   * 
   * @static
   */
  static _clear() {
    objects.clear()
  }
}
