const ClassicCard = require('./classicCard')
const Deck = require('./containers/deck')

module.exports = {
  classicCardsDeck: () => {
    const ranks = [2,3,4,5,6,7,8,9,10,'J','Q','K','A']
    const suits = ['H','S','C','D']

    const deck = new Deck({
      elements: suits.reduce((prevS, suit) => [
        ...prevS,
        ...ranks.reduce((prevR, rank) => [
          ...prevR,
          new ClassicCard({suit, rank})
        ], [])
      ], [])
    })

    console.info(`   CardAPI, presets: created a deck of ${deck.length} cards`)

    return deck
  }
}