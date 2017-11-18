/**
 * Decides where each part of the game should be placed,
 * RWD
 */
import React from 'react'
import PropTypes from 'prop-types'
import { rotateDEG, translate, transform, identity, applyToPoint } from 'transformation-matrix'

import ClassicCard from '../card/classicCard'
import {
  findAllParents,
  findAllChildren,
  def,
} from '../../../shared/utils.js'

import Player from '../player/player'
import Deck from '../containers/deck/deck'
import Pile from '../containers/pile/pile'
import Hand from '../containers/hand/hand'

import './table.scss'

// TODO: align angle to the current player
// const startingAngle = 90

const getOwnerId = (element) => {
  if (element.parent) {
    return getOwnerId(element.parent)
  } else {
    return element
  }
}

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
}

const setWorldCoordinates = (element, idx, everything) => {
  const allParents = findAllParents(element, everything)
  const parentTransforms = allParents.map(el => el.localTransform)
  const resultTransform = transform([
    ...parentTransforms,
    element.localTransform,
  ])
  const point = applyToPoint(resultTransform, { x: 0, y: 0 })
  const angle = allParents.reduce((acc, el) => acc + el._local.angle + el.angle, element.angle)
  return {
    ...element,
    x: point.x,
    y: point.y,
    angle: angle,
  }
}

const stripUndefinedChildren = element => {
  if (!element.children) {
    return element
  }
  return {
    ...element,
    children: element.children.filter(child => typeof child !== 'undefined' && child !== null)
  }
}

const addInteractionHandler = handler => {
  return element => {
    element.interactionHandler = event => {
      handler(event)
    }
    return element
  }
}

const renderElements = (element, idx) => {
  // Finally render them all to React components

  switch (element.type) {
  case 'player':
    return <Player key={'player' + idx} {...element} />
  case 'deck':
    return <Deck key={'deck' + idx} {...element} />
  case 'hand':
    return <Hand key={'hand' + idx} {...element} />
  case 'pile':
    return <Pile key={'pile' + idx} {...element} />
  case 'card':
    return <ClassicCard key={'card' + idx} {...element} />
  }
}

class Table extends React.Component {

  render() {

    // Parse all current objects from props
    // Returns renderable html elements
    const players = (this.props.players ? [...this.props.players.list] : [])
      .map(addTransformForPlayers)

    const elements = [
      ...this.props.cards || [],
      ...this.props.containers || [],
      ...players,
    ]
      .map(addRenderingProps)
      .map(addLocalTransform)
      .map(applyParentTransform)
      .map(setWorldCoordinates)
      .map(stripUndefinedChildren)
      .map( addInteractionHandler(this.props.interactionHandler)
      )
      .map(renderElements)

    return (
      <div className='Table'>
        {elements}
      </div>
    )
  }

}

Table.propTypes = {
  players: PropTypes.object,
  cards: PropTypes.array,
  containers: PropTypes.array,

  interactionHandler: PropTypes.func,
}

export default Table
