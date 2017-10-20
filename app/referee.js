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
    canClientPerformThisAction: (client, actionName, state) => new Promise((resolve, reject) => {
      if (!state.clients || state.clients.length <= 0) {
        // console.error(`There are no clients: ${typeof state.clients}, ${state.clients}.`)
        reject(`There are no clients.`)
      }
      if (state.clients.includes(client)) {
        // console.error(`This client doesn't exist "${client}".`)
        reject(`This client doesn't exist "${client}".`)
      }
      if (actions[actionName] === undefined) {
        // console.error(`Unknown action "${action}".`)
        reject(`Unknown action "${actionName}".`)
      }
      if (actions[actionName].condition === undefined) {
        // console.info(`Action without condition "${action}".`)
        resolve(`Action without condition "${actionName}".`)
      }
      actions[actionName].condition(state, client)
        .then(resolve)
        .catch(reject)
    }),
    performAction: (actionName, state) => new Promise((resolve, reject) => {
      console.info(`Referee: performAction(${actionName}, some state)`)
      if (actions[actionName] === undefined) {
        reject(`Unknown action.`)
      }
      if (actions[actionName].action === undefined) {
        reject(`No action defined.`)
      }
      actions[actionName].action(state, reducer)
        .then(resolve)
        .catch(reject)
    })
  }
}
