const {
  Deck,
  Pile,
  Hand,
  Player,
  Presets,
} = require('../../cardsGame/index')

const randomName = () =>
  [1, 2, 3].map(() => Math.floor(Math.random() * 25 + 65)).map((e) => String.fromCharCode(e)).join('')

const condition = (state, client) => new Promise((resolve, reject) => {
  if(client.id !== state.host){
    reject(`Client '${client.id}' is not a host: '${state.host}'`)
  }else if (state.clients.length < 1){
    reject(`Not enough clients: only '${state.clients.length}' clients in the room`)
  }
  resolve()
})

const action = (state, reducer) => new Promise((resolve/*, reject*/) => {
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
    // Get players decks
    const decks = state.players.list.map(player => player.getAllByType('deck').first)
    mainDeck.deal(decks)
  }, 2000)
  mainDeck.on(Deck.events.DEALT, () => {
    resolve()
  })
})

module.exports = {condition, action}
