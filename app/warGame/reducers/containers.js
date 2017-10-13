module.exports = {
  add: (state, container) => {
    state.containers.push(container)
  },
  remove: (state, container) => {
    state.containers = state.containers.filter(el => el !== container)
  },
  update: (state, container) => {
    state.containers.forEach(element => {
      if (element.id === container.id) {
        for (const key in container) {
          element[key] = container[key]
        }
      }
    })
  },
}
