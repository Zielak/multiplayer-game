class Command {

  constructor(context = {}) {
    this.context = context
  }

  prepare() { }

  execute(/*invoker, state, reducer*/) { }

  undo() { }

}

module.exports = Command
