const status = require('../shared/utils').actionStatusFactory

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

module.exports = (actions, reducer) => {
  return {
    canClientPerformThisAction: (client, actionName, state) => {
      if (!state.clients || state.clients.length <= 0) {
        // console.error(`There are no clients: ${typeof state.clients}, ${state.clients}.`)
        return status(false, `There are no clients.`)
      }
      if (state.clients.includes(client)) {
        // console.error(`This client doesn't exist "${client}".`)
        return status(false, `This client doesn't exist "${client}".`)
      }
      if (actions[actionName] === undefined) {
        // console.error(`Unknown action "${action}".`)
        return status(false, `Unknown action "${actionName}".`)
      }
      if (actions[actionName].condition === undefined) {
        // console.info(`Action without condition "${action}".`)
        return status(true, `Action without condition "${actionName}".`)
      }
      return actions[actionName].condition(state, client)
    },
    performAction: (actionName, state) => {
      if (actions[actionName] === undefined) {
        return status(false, `Unknown action.`)
      }
      if (actions[actionName].action === undefined) {
        return status(false, `No action defined.`)
      }
      // const actionType = getActionType(action)
      // const actionArgument = getActionArgument(action)
      return actions[actionName].action(state, reducer)
    }
  }
}
