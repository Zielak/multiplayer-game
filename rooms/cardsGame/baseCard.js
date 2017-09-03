const Base = require('./base')
const Conditions = require('./conditions')

module.exports = class BaseCard extends Base {

  constructor(options = {}){
    super(options)
    this.name = options.name || 'card'

    // set of conditions used during gameplay
    this.conditions = new Conditions(options.conditions)

    // All the states at which a single card can be.
    // faceUp: boolean, rotated: number/angle, marked: boolean
    this.state = Object.assign({}, {
      faceUp: true,
      rotated: 0,
      marked: false,
    }, options.state)
  }

  canBeTakenBy(){}

}
