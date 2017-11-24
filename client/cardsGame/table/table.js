import { Container } from 'pixi.js'
import { Player, Game } from '../index'

/**
 * Decides where each part of the game should be placed,
 * RWD
 */
import PropTypes from 'prop-types'
/*
import { rotateDEG, translate, transform, identity } from 'transformation-matrix'

// import ClassicCard from '../card/classicCard'
import {
  // findAllParents,
  findAllChildren,
  def,
} from '../../../shared/utils.js'

// import Player from '../player/player'
import Deck from '../containers/deck/deck'
import Pile from '../containers/pile/pile'
import Hand from '../containers/hand/hand'
*/

// TODO: align angle to the current player
// const startingAngle = 90

const getOwnerId = (element) => {
  if (element.parent) {
    return getOwnerId(element.parent)
  } else {
    return element
  }
}

/**
 * 
 * @param {Player} player 
 * @param {*} idx 
 * @param {*} players 
 */
const positionPlayers = (player, idx, players) => {
  const angle = Math.PI * 2 / players.length * idx
  const point = {
    x: Game.width / 2 + Math.sin(angle) * (Game.width * 0.4),
    y: Game.height / 2 + Math.cos(angle) * (Game.height * 0.4),
  }
  player.rotation = -angle
  player.x = point.x
  player.y = point.y
}

/*
const addRenderingProps = (element) => {
  return {
    ...element,
    x: def(element.x, 0),
    y: def(element.y, 0),
    angle: def(element.angle, 0),
    zIndex: def(element.zIndex, 0),
  }
}

const addTransformForPlayers = (player, idx, players) => {
  const angle = 360 / players.length * idx
  return {
    ...player,
    localTransform: transform([
      identity(),
      translate(50, 50),
      rotateDEG(angle),
      translate(0, 40),
    ]),
    angle,
  }
}

const addLocalTransform = (element) => {
  if (element.localTransform) {
    return element
  }
  return {
    ...element,
    localTransform: transform([
      identity(),
      rotateDEG(element._local.angle),
      element.parent ? identity() : translate(50, 50),
      translate(element._local.x, element._local.y),
    ]),
    angle: element._local.angle,
  }
}

const parentTransforms = {
  deck: Deck.restyleChild,
  hand: Hand.restyleChild,
  pile: Pile.restyleChild,
}

const applyParentTransform = (element, idx, everything) => {
  // This method is only for parents
  if (!element.children || element.children.length === 0 || !parentTransforms[element.type]) {
    return element
  }

  findAllChildren(element, everything)
    .map(child => {
      // Add current idx in the parent's array
      child._sortIdx = element.children.indexOf(child.id)
      return child
    })
    .sort((a, b) => a._sortIdx - b._sortIdx)
    .map(child => {
      delete child._sortIdx
      return child
    })
    .map((child, idx, allChildren) => {
      const newTransform = parentTransforms[element.type](child, idx, allChildren.length)

      child.localTransform = transform([
        child.localTransform,
        rotateDEG(def(newTransform.angle, 0)),
        translate(def(newTransform.x, 0), def(newTransform.y, 0))
      ])
      child.angle += def(newTransform.angle, 0)
      child.zIndex += def(newTransform.zIndex, 0)
    })
  return element
}*/

class Table extends Container {

  constructor(props) {
    super()
    this.name = 'table'
    this.props = props

    this.players = new Container()

    this.addChild(this.players)
  }

  updatePlayer(operation, idx, data) {
    const _data = {
      ...data,
      idx
    }
    switch (operation) {
    case 'add':
      this.players.addChild(new Player(_data))
      break
    case 'remove':
      // TODO: confirm that players always have the same idx
      this.players.removeChildAt(idx)
      break
    case 'replace':
      this.players.removeChildAt(idx)
      this.players.addChild(new Player(_data))
      break
    case 'update':
      this.players.getChildAt(idx).props = data
      break
    }

    this.update()
  }

  update() {
    this.players.children.forEach(positionPlayers)
  }

}

Table.propTypes = {
  players: PropTypes.object,
  cards: PropTypes.array,
  containers: PropTypes.array,

  interactionHandler: PropTypes.func,
}

export default Table
