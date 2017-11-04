class Command {

  constructor(context = {}) {
    this.context = context
  }

  execute(/*invoker, state, reducer*/) { }

  undo() { }

}

module.exports = Command
