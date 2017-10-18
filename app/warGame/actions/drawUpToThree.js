const {
  Player,
} = require('../../cardsGame/index')

const status = require('../../../shared/utils').actionStatusFactory

const condition = (state, client) => {
  const player = Player.get(
    state.players.list.find(player => player.clientId === client)
  )
  if (!player) {
    status(false, `Couldn't find this client in players list`)
  }

  // const hand = 
  // TODO: finish me

}

const action = (state, reducer) => new Promise((ressolve, reject) => {
  state, reducer, ressolve, reject
})

module.exports = {condition, action}
