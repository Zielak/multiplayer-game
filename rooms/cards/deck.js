const Container = require('./container')

module.exports = class Deck extends Container {

  constructor(options){
    super(options)
  }

  deal(count, hands) {
    let i = 0
    hands = !Array.isArray(hands) ? [hands] : hands
    const totalCount = count * hands.length

    const dealOne = () => {
      if (this.length === 0 || i === totalCount) {
        this.onCardsDealt()
        return
      }
      hands[i%hands.length].push(this.top())
      i++
      dealOne()
    }
    dealOne()
  }

  onCardsDealt() {}

}