const EventEmitter = require('eventemitter3')
const CommandManager = require('./commandManager')

class Game extends EventEmitter {

  constructor({ commands, reducer }) {
    super()

    this.commands = commands
    this.reducer = reducer

    this.commandManager = new CommandManager()
  }

  /**
   * 
   * 
   * @param {object} client object, with id and stuff. Otherwise will act as the "game" itself issues this command
   * @param {string} actionName 
   * @param {object} state 
   * @returns {Promise}
   * @memberof Game
   */
  performAction(client, actionName, state) {
    if(client === null || typeof client !== 'object'){
      client = Game.id
    }
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
        .then(status => {
          resolve(status)
          this.emit(Game.events.ACTION_COMPLETED, actionName, status)
        })
        .catch(status => {
          reject(`FAIL, something went wrong: ${status}`)
          this.emit(Game.events.ACTION_FAILED, actionName, status)
        })
    })
  }

}

Game.events = {
  ACTION_COMPLETED: 'actionCompleted',
  ACTION_FAILED: 'actionFailed',
}

Game.id = {id: Symbol('gameid')}

module.exports = Game
