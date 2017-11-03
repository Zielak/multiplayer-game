const EventEmitter = require('eventemitter3')
const CommandManager = require('./commandManager')

class Game extends EventEmitter {
  constructor({ commands, reducer }) {
    super()

    this.commands = commands
    this.reducer = reducer

    this.commandManager = new CommandManager()
  }

  /*
   * FIXME: NOT NEEDED! Command itself have a conditions list and
   *        will reject the promise if you can't do that.
   * 
   * @param {string} client client id
   * @param {string} actionName 
   * @param {object} state 
   * @returns {Promise}
   */
  // canClientPerformThisAction(client, actionName, state) {
  //   return new Promise((resolve, reject) => {
  //     if (!state.clients || state.clients.length <= 0) {
  //       reject(`There are no clients.`)
  //     }
  //     if (state.clients.includes(client)) {
  //       reject(`This client doesn't exist "${client}".`)
  //     }
  //     if (this.commands[actionName] === undefined) {
  //       reject(`Unknown action "${actionName}".`)
  //     }
  //     if (this.commands[actionName].condition === undefined) {
  //       resolve(`Action without condition "${actionName}".`)
  //     }
  //     this.commands[actionName].condition(state, client)
  //       .then(resolve)
  //       .catch(reject)
  //   })
  // }

  performAction(client, actionName, state) {
    return new Promise((resolve, reject) => {
      console.info(`performAction(${client}, ${actionName}, state)`)
      if (!state.clients || state.clients.length <= 0) {
        reject(`There are no clients.`)
      }
      if (state.clients.includes(client)) {
        reject(`This client doesn't exist "${client}".`)
      }

      if (this.commands[actionName] === undefined) {
        reject(`Unknown action "${actionName}".`)
      }

      if (this.commands[actionName] === undefined) {
        reject(`Unknown action.`)
      }
      // Run conditions if it's possible to do it now
      this.commands[actionName].condition(state, client)
        .then(() => this.commandManager.execute(
          this.commands[actionName].command, client, state, this.reducer
        ))
        .then(status => resolve(status))
        .catch(status => reject(`Conditions didn't pass: ${status}`))
    })
  }

}

module.exports = Game
