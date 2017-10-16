const {
  Deck,
  Pile,
  Hand,
  Player,
  Presets,
} = require('../../cardsGame/index')

const randomName = () =>
  [1, 2, 3].map(() => Math.floor(Math.random() * 25 + 65)).map((e) => String.fromCharCode(e)).join('')

module.exports = (state, reducer) => {
  // Gather players
  // state.clients.forEach(client => {
  [0, 1, 2].forEach(client => {
    const newPlayer = new Player({
      clientId: client,
      name: randomName(),
    })
    reducer.players.add(state, newPlayer)
  })

  const mainDeck = new Deck({
    x: 0, y: 0,
  })
  reducer.containers.add(state, mainDeck)

  // Set the table, empty decks and rows
  state.players.list.forEach(player => {
    reducer.containers.add(state, new Deck({
      x: 20,
      parent: player,
    }))
    reducer.containers.add(state, new Hand({
      parent: player,
    }))
    reducer.containers.add(state, new Pile({
      parent: player,
      name: 'stage',
      y: -20,
    }))
    reducer.containers.add(state, new Pile({
      parent: player,
      name: 'dead heat',
      // a situation in or result of a race
      // in which two or more competitors are exactly even.
      y: -20,
      x: -20,
    }))
  })

  // Setup all cards
  Presets.classicCards().forEach(card => {
    reducer.cards.add(state, card)
    mainDeck.addChild(card)
  })

  // Deal all cards to players after delay
  setTimeout(() => {
    // Get players hands
    const decks = state.players.list.map(player => player.filterByType('deck').first)
    mainDeck.deal(decks)
  }, 2000)
}
