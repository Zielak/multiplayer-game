const {
  Deck, ClassicCard
} = require('./index')

module.exports = {
  classicCardsDeck: () => {
    const ranks = [2,3,4,5,6,7,8,9,10,'J','Q','K','A']
    const suits = ['H','S','C','D']

    const deck = new Deck(suits.map(suit => {
      ranks.map(rank => {
        return new ClassicCard({
          suit, rank
        })
      })
    }))

    console.log(`   CardAPI, presets: created a deck of ${deck.length} cards`)

    return deck.slice(0)
  }
}