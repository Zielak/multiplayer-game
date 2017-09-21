const uuid = require('uuid/v4')
const utils = require('./utils')

const objects = new Map()

module.exports = class Base {
  constructor(options = {}){
    this.id = uuid()

    // Store a reference to itself by ID
    objects.set(this.id, this)
    
    // Has any dimensions? Add to seperate object
    if (utils.exists(options.x) || utils.exists(options.y)
      || utils.exists(options.y) || utils.exists(options.y)) {
      this.dimensions = {
        // Real-life size (in CM) and position
        x: utils.default(options.x, 0),
        y: utils.default(options.y, 0),
        width: utils.default(options.width, 5),
        height: utils.default(options.height, 5),
      }
    }
    
    // List of children ID's
    this.children = []
    
    // Sanitize parent to ID
    if (options.parent && typeof options.parent.id === 'string') {
      this.parent = options.parent
    } else if (typeof options.parent === 'object' && options.parent.id) {
      this.parent = options.parent.id
    } else {
      this.parent = null
    }
    
    // Parent element which holds this container
    this.parent = null
    if (options.parent !== undefined) {
      const parent = Base.get(options.parent)
      parent && parent.addChild(this.id)
    }
  }

  /**
   * Get the real owner of this container, by traversing `this.parent` chain.
   * 
   * @readonly
   * @return {Player|null} `Player` or `null` if this container doesn't belong to anyone
   */
  get owner(){
    if(typeof Base.get(this.parent) === 'object'){
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
    const childId = typeof element !== 'string' ? element.id : element
    const child = typeof element !== 'string' ? element : Base.get(element)
    
    // Notify element's last parent of change
    const lastParent = Base.get(child.parent)
    lastParent.removeChild(childId)
    
    // Change child's parent element
    child.parent = this.id
    
    // Add to this list
    this.children.push(childId)
    return this
  }
  
  /**
   * Removes one child
   * 
   * @param {any|string} element reference to an object or its ID
   * @returns this
   */
  removeChild(element) {
    const childId = typeof element !== 'string' ? element.id : element
    const child = typeof element !== 'string' ? element : Base.get(element)
    
    // Nullify its parent
    child.parent = null
    
    this.children = this.children.filter(e => e !== child)
    return this
  }

  /**
   * Get a reference to the object by its ID
   * 
   * @static
   * @param {string} id 
   * @returns {any}
   */
  static get(id){
    return objects.get(id)
  }
}
