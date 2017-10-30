const Command = require('./command')
const containerClasses = {
  'container': require('./container'),
  'deck': require('./containers/deck'),
  'hand': require('./containers/hand'),
  'pile': require('./containers/pile'),
  'row': require('./containers/row'),
  'spread': require('./containers/spread'),
}

module.exports = class CreateContainer extends Command {

  constructor(state, type, options) {
    super()
    this._state = state
    this._type = type
    this._options = options
  }

  execute() {
    return new Promise((resolve/*, reject*/) => {
      this._newContainer = new containerClasses[this._type](this._options)
      this._state.containers.push(this._newContainer)
      resolve()
    })
  }

  undo() {
    return new Promise((resolve, reject) => {
      if (!this._newContainer) {
        reject()
      }
      // TODO: undo me.
    })
  }
}
