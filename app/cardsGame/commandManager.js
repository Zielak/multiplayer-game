module.exports = class CommandManager {

  constructor() {
    this.commands = []
    this.lastCommand = null
  }

  get canUndo() {
    return this.lastCommand !== null
  }

}