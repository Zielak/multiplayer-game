const BaseCard = require('./basecard')

module.exports = class ClassicCard extends BaseCard {

  constructor(options = {}){
    super(options)
    try {
      this.suit = options.suit
      this.rank = options.rank
    } catch (e) {
      console.error(`There should be 'suit' and 'rank' here... Got: ${JSON.stringify(options)}`)
    }

    this.name = this.rank + this.suit
  }

  show(){
    this.state.faceUp = true
  }
  hide(){
    this.state.faceUp = false
  }

}
