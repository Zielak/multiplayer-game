module.exports = {
  add: (state, card) => {
    state.cards.push(card)
  },
  remove: (state, card) => {
    state.cards = state.cards.filter(el => el !== card)
  }
}
