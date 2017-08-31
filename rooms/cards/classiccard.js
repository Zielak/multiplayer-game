const BaseCard = require('./basecard')

module.exports = class ClassicCard extends BaseCard {

  constructor(options){
    super(options)
    this.suit = options.suit
    this.rank = options.rank

    this.name = this.rank + this.suit
  }

  show(){
    this.state.faceUp = true
  }
  hide(){
    this.state.faceUp = false
  }

}