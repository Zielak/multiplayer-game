const {
  Command,
  Player,
  Deck,
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

const command = class DrawUpToThreeCommand extends Command {

  execute(invoker, state/*, reducer*/) {
    return new Promise((resolve) => {
      const player = Player.get(
        state.players.list.find(player => player.clientId === invoker).id
      )

      const myDeck = player.getByType('deck')
      const myHand = player.getByType('hand')

      const cardsToTake = 3 - myHand.length

      myDeck.deal(myHand, cardsToTake)
        .on(Deck.events.DEALT, () => setTimeout(resolve, 250))

    })
  }

}

module.exports = { condition, command }
