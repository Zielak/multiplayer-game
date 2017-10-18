/**
 * Decides where each part of the game should be placed,
 * RWD
 */
import React from 'react'
import PropTypes from 'prop-types'
import { rotateDEG, translate, transform, applyToPoint, identity } from 'transformation-matrix'

import ClassicCard from '../card/classicCard'
import {
  findAllParents,
} from '../../../shared/utils.js'

import Player from '../player/player'
import Deck from '../containers/deck/deck'
import Pile from '../containers/pile/pile'
// import Hand from '../containers/hand/hand'

import './table.scss'

const getElementsByType = (array, type) =>
  array.filter(el => el.type === type)

const getPartialAngle = elements => {
  return 360 / getElementsByType(elements, 'player').length
}

// TODO: align angle to the current player
const startingAngle = 90

const positionFromAngle = (angle, distance) => {
  const x = Math.round(distance * Math.cos(angle * (Math.PI * 2 / 360)) * 100) / 100
  const y = Math.round(distance * Math.sin(angle * (Math.PI * 2 / 360)) * 100) / 100
  return { x, y }
}

const getOwnerId = (element) => {
  if (element.parent) {
    return getOwnerId(element.parent)
  } else {
    return element
  }
}

const addIndexProp = (element, idx) => {
  // Add index for later, keys are important in React
  return {
    ...element,
    idx,
  }
}

const addTransformProps = element => ({
  ...element,
  dimensions: {
    x: element.dimensions.x || 0,
    y: element.dimensions.y || 0,
    angle: element.dimensions.angle || 0,
  },
  angle: 0,
  x: 0,
  y: 0,
})

const positionAndRotatePlayers = (element, idx, elements) => {
  // Manipulate every player first
  if (element.type !== 'player') return element
  
  const angle = getPartialAngle(elements)

  // Get initial correct position on the table, and add an angle
  const position = positionFromAngle(angle * idx + startingAngle, 40)
  return {
    ...element,
    dimensions: {
      x: position.x,
      y: position.y,
      angle: angle * idx ,
    },
  }
}

const addTransformMatrices = element => {
  const trans = transform(
    translate(element.dimensions.x, element.dimensions.y),
    rotateDEG(element.dimensions.angle)
  )
  return {
    ...element,
    transform: trans
  }
}

const setWorldCoordinates = (element, idx, everything) => {
  const parents = findAllParents(element, everything)
  const rotation = parents.reduce((acc, parent) => acc + parent.dimensions.angle, element.dimensions.angle)
  const matrices = parents.map(parent => parent.transform)
  const matrix = matrices.length > 0 ? transform(matrices) : identity()
  const pos = applyToPoint(matrix, { x: element.dimensions.x, y: element.dimensions.y })

  return {
    ...element,
    x: pos.x,
    y: pos.y,
    angle: rotation,
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

const renderElements = element => {
  // Finally render them all to React components
  if (element.type === 'player') {
    return (
      <Player key={'player' + element.idx} {...element}/>
    )
  } else if (element.type === 'deck') {
    return (
      <Deck key={'deck' + element.idx} {...element}/>
    )
  } else if (element.type === 'pile') {
    return (
      <Pile key={'pile' + element.idx} {...element}/>
    )
  } else if (element.type === 'card') {
    return (
      <ClassicCard key={'card' + element.idx} {...element}/>
    )
  }
}

class Table extends React.Component {

  render() {

    // Parse all current objects from props
    // Returns renderable html elements
    const elements = [
      ...this.props.players && this.props.players.list || [],
      ...this.props.containers || [],
      ...this.props.cards || [],
    ]
      .map(addIndexProp)
      .map(addTransformProps)
      .map(positionAndRotatePlayers)
      .map(addTransformMatrices)
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
