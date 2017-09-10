module.exports = (state = [], data) => {
  switch (data.action) {
  case 'clients.add':
    return [
      ...state,
      data.client
    ]
  case 'clients.remove':
    return state.filter(el => el !== data.client)
  default:
    return state
  }
}