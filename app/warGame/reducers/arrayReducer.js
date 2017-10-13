module.exports = (targetArray) => {
  const reducer = {
    add: (state, element) => {
      element.onUpdate = me => reducer.update(state, me)
      state[targetArray].push(element)
    },
    remove: (state, element) => {
      state[targetArray] = state[targetArray].filter(el => el !== element)
    },
    update: (state, element) => {
      state[targetArray].forEach(el => {
        if (el.id === element.id) {
          for (const key in element) {
            el[key] = element[key]
          }
        }
      })
    },
  }
  return reducer
}
