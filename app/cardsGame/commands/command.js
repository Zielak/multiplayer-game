module.exports = class Command {

  constructor(invoker, conditions, context = {}) {
    this.invoker = invoker
    this.conditions = conditions
    this.context = context
  }

  execute() { }

  undo() { }

}