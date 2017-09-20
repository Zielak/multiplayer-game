const uuid = require('uuid/v4')
const Player = require('./player')
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
    
    // Sanitize parent to ID
    if (typeof options.parent.id === 'string') {
      this.parent = options.parent
    } else if (typeof options.parent === 'object' && options.parent.id) {
      this.parent = options.parent.id
    } else {
      this.parent = null
    }
    
    // Parent element which holds this container
    this.parent = options.parent ? utils.default(options.parent.id, null) : null
  }

  /**
   * Get the real owner of this container, by traversing `this.parent` chain.
   * 
   * @readonly
   * @return {Player|null} `Player` or `null` if this container doesn't belong to anyone
   */
  get owner(){
    if(Base.get(this.parent) instanceof Player){
      return this.parent
    } else if (this.parent === null) {
      return null
    } else {
      return Base.get(this.parent.owner)
    }
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
