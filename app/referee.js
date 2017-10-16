const status = require('./utils/actionStatusFactory')

// const getActionType = (action) => {
//   if (action === undefined) return ''
//   const firstDot = action.indexOf('.')
//   return action.slice(0, firstDot)
// }
// const getActionArgument = (action) => {
//   if (action === undefined) return ''
//   const firstDot = action.indexOf('.') + 1
//   return action.slice(firstDot)
// }

module.exports = (rules, actions, reducer) => {
  return {
    canClientPerformThisAction: (client, action, state) => {
      if (!state.clients || state.clients) {
        return status(false, `There are no clients.`)
      }
      if (state.clients.includes(client)) {
        return status(false, `This client doesn't exist "${client}".`)
      }
      if (rules[action] === undefined) {
        return status(false, `Unknown action.`)
      }
      return rules[action](client, state)
    },
    performAction: (action, state) => {
      if (actions[action] === undefined) {
        return status(false, `Unknown action.`)
      }
      // const actionType = getActionType(action)
      // const actionArgument = getActionArgument(action)
      return actions[action](state, reducer)
    }
  }
}
