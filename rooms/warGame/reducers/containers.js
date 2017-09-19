module.exports = {
  add: (state, container) => {
    state.containers.push(container)
  },
  remove: (state, container) => {
    state.containers = state.containers.filter(el => el !== container)
  }
}
