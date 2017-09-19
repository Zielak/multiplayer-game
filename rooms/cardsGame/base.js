const uuid = require('uuid/v4')
const Player = require('./player')
const utils = require('./utils')

const objects = new Map()

module.exports = class Base {
  constructor(options = {}){
    this.id = uuid()

    // Store a reference to itself by ID
    objects.set(this.id, this)

    // Real-life size (in CM) and position
    this.x = utils.default(options.x, 0)
    this.y = utils.default(options.y, 0)
    this.width = utils.default(options.width, 5)
    this.width = utils.default(options.width, 5)
    
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
