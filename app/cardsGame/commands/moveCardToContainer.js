const Command = require('./command')
// const Container = require('../container')
const utils = require('../../../shared/utils')

class MoveCardToContainer extends Command {

  /**
   * Creates an instance of MoveCardToContainer.
   * @param {object} invoker who tries to invoke this action
   * @param {array} conditions list of conditions to check before executing
   * @param {MoveCardToContainerContext} context
   * 
   * @typedef {object} MoveCardToContainerContext
   * @property {object} state 
   * @property {object} card - which card to move
   * @property {Container} container - container
   * @property {boolean} [prepend=false] - should card be moved to the bottom?
   * 
   * @memberof MoveCardToContainer
   */
  constructor(invoker, conditions, context){
    super(invoker, conditions)

    /** @type {MoveCardToContainerContext} */
    this.context = context
  }

  execute() {
    const card = utils.getElementById(this.context.state.cards, this.context.card.id)
    this.context.container.addChild(card)
  }

}

module.exports = MoveCardToContainer
