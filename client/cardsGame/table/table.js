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
  // def,
} from '../../../shared/utils.js'

import Player from '../player/player'
import Deck from '../containers/deck/deck'
import Pile from '../containers/pile/pile'
import Hand from '../containers/hand/hand'

import './table.scss'

// TODO: align angle to the current player
// const startingAngle = 90

// const positionFromAngle = (angle, distance) => {
//   const x = Math.round(distance * Math.cos(angle * (Math.PI * 2 / 360)) * 100) / 100
//   const y = Math.round(distance * Math.sin(angle * (Math.PI * 2 / 360)) * 100) / 100
//   return { x, y }
// }

const getOwnerId = (element) => {
  if (element.parent) {
    return getOwnerId(element.parent)
  } else {
    return element
  }
}

// Everything is gonna have this. All extend the Base class
// const addTransformProps = element => ({
//   ...element,
//   _localTransform: {
//     x: def(element._localTransform.x, 0),
//     y: def(element._localTransform.y, 0),
//     angle: def(element._localTransform.angle, 0),
//   }
// })

const addTransformForPlayers = (player, idx, players) => {
  const angle = 360 / players.length * idx
  return {
    ...player,
    localTransform: transform([
      identity(),
      rotateDEG(angle),
      translate(0, 30)
    ]),
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
      translate(element._local.x, element._local.y)
    ]),
  }
}

const setWorldCoordinates = (element, idx, everything) => {
  const allParents = findAllParents(element, everything)
  if (allParents.length === 0) {
    return {
      ...element,
    }
  }
  const parentTransforms = allParents.map(el => el.localTransform)
  const resultTransform = transform([
    element.localTransform,
    ...parentTransforms
  ])
  const point = applyToPoint(resultTransform, {x:0, y:0})
  const angle = allParents.reduce((acc, el) => acc + el._local.angle, 0)
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

/**
 * Used in comunication between siblings.
 * 'parent': ['children'],
 */
const parentChildrenList = {}

/**
 * Place only an element if its a child.
 * Will create a parent's list if it's the first child to report.
 */
const registerAsChild = (component) => {
  const parent = component.props.parent
  if (!parent) {
    return
  }
  // My parent still didn't register.
  if (!Array.isArray(parentChildrenList[parent])) {
    parentChildrenList[parent] = []
  }
  // I want to register at parent's place
  const alreadyHere = parentChildrenList[parent].some(fromList => {
    return fromList.props.id === component.props.id
  })
  if (!alreadyHere) {
    // Remove yourself from any parent you used to be before
    removeFromAnyParent(component.props.id)
    // Register at the new place
    parentChildrenList[parent].push(component)
  }
}

const removeFromAnyParent = (id) => {
  Object.keys(parentChildrenList).forEach(key => {
    parentChildrenList[key] = parentChildrenList[key].filter(child => {
      return child.props.id !== id
    })
  })
}

/**
 * Each parent component will call this to report new state of its children.
 * The list should be sorted and lost children should be removed.
 * @param {string} componentId
 * @param {array<string>} list of ids, children of the component
 */
const updateChildrenList = (componentId, list) => {

  const getChildById = (componentId, childId) => {
    return parentChildrenList[componentId].find(child => child.props.id === childId)
  }

  const sortedArray = list.map(childId =>
    getChildById(componentId, childId)
  )

  parentChildrenList[componentId] = sortedArray
}

const mapThroughChildren = (myId, mapper) => {
  parentChildrenList[myId] && parentChildrenList[myId].map(mapper)
}

const renderElements = (element, idx) => {
  // Finally render them all to React components

  // Element can register itself as a child
  element.registerAsChild = registerAsChild
  // Parent will be able to map through its child
  element.mapThroughChildren = mapThroughChildren
  // Parent will be able to sort list of its chilren
  element.updateChildrenList = updateChildrenList

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
      .map(addLocalTransform)
      .map(setWorldCoordinates)
      .map(stripUndefinedChildren)
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

  testAngle: PropTypes.number,
}

export default Table
