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

module.exports = (actions) => ({

  /**
   * 
   * 
   * @param {string} client client id
   * @param {string} actionName 
   * @param {object} state 
   * @returns {Promise}
   */
  canClientPerformThisAction: (client, actionName, state) => new Promise((resolve, reject) => {
    if (!state.clients || state.clients.length <= 0) {
      reject(`There are no clients.`)
    }
    if (state.clients.includes(client)) {
      reject(`This client doesn't exist "${client}".`)
    }
    if (actions[actionName] === undefined) {
      reject(`Unknown action "${actionName}".`)
    }
    if (actions[actionName].condition === undefined) {
      resolve(`Action without condition "${actionName}".`)
    }
    actions[actionName].condition(state, client)
      .then(resolve)
      .catch(reject)
  }),

})
