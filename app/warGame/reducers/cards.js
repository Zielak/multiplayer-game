const reducer = {
  add: (state, card) => {
    card.onUpdate = me => reducer.update(state, me)
    state.cards.push(card)
  },
  remove: (state, card) => {
    state.cards = state.cards.filter(el => el !== card)
  }
}
module.exports = reducer
