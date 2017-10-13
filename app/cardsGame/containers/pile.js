const Container = require('../container')
const Utils = require('../utils.js')

const cardsDataFactory = (card, limits) => {
  return {
    id: card.id,
    rotation: Utils.float(limits.minAngle, limits.maxAngle),
    offset: {
      x: Utils.float(limits.minX, limits.maxX),
      y: Utils.float(limits.minY, limits.maxY),
    }
  }
}

/**
 * Cards in Pile have tendency to fall at random angle and not exactly in
 * the center of the container.
 * Should hold info of each card's position
 * and rotation when it lands in container
 */
module.exports = class Pile extends Container {

  constructor(options = {}) {
    super(options)
    this.type = 'pile'

    this.limits = Object.assign({}, {
      minAngle: -20,
      maxAngle: 20,
      minX: -10,
      minY: -10,
      maxX: 10,
      maxY: 10,
    }, options.limits)

    this.cardsData = []
  }

  push(element) {
    this.cardsData.push(cardsDataFactory(element, this.limits))
    return super.push(element)
  }

  remove(element) {
    const idx = this.elements.indexOf(element)
    return this.elements.splice(idx, 1)
  }

  // TODO: Store data about each card's rotation

}