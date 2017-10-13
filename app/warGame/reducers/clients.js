module.exports = {
  add: (state, client) => {
    state.clients.push(client)
  },
  remove: (state, client) => {
    state.clients = state.clients.filter(el => el !== client)
  }
}
