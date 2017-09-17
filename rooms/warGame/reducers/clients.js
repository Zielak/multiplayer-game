module.exports = (state, data) => {
  switch (data.action) {
  case 'clients.add':
    state.clients.push(data.client)
    break
  case 'clients.remove':
    state.clients = state.clients.filter(el => el !== data.client)
  }
}