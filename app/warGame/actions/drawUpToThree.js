const {
  Player,
} = require('../../cardsGame/index')

const condition = (state, client) => new Promise((resolve, reject) => {
  const player = Player.get(
    state.players.list.find(player => player.clientId === client)
  )
  if (!player) {
    reject(`Couldn't find this client in players list`)
  }

  resolve()
})

const action = (state, reducer, client) => new Promise((resolve/*, reject*/) => {
  const player = Player.get(
    state.players.list.find(player => player.clientId === client)
  )

  const myDeck = player.getByType('deck')
  const myHand = player.getByType('hand')

  const cardsToTake = 3 - myHand.length

  myDeck.deal(myHand, cardsToTake)

  setTimeout(resolve, 100)
})

module.exports = {condition, action}
