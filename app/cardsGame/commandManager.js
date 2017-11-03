module.exports = class CommandManager {

  constructor() {
    this.commands = []
    this.lastCommand = null
  }

  /**
   * 
   * @param {Command} command 
   * @param {*} invoker 
   * @param {*} state 
   * @param {*} reducer 
   */
  execute(command, invoker, state, reducer) {
    const newCommand = new command()

    newCommand.execute(invoker, state, reducer)

    this.commands.push(newCommand)
    this.lastCommand = newCommand
  }

  get canUndo() {
    return this.lastCommand !== null
  }

}