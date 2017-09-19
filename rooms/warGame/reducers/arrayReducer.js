module.exports = (targetArray) => {
  return {
    add: (state, element) => {
      state[targetArray].push(element)
    },
    remove: (state, element) => {
      state[targetArray] = state[targetArray].filter(el => el !== element)
    }
  }
}
