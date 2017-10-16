/**
 * Decides where each part of the game should be placed,
 * RWD
 */
import React from 'react'
import PropTypes from 'prop-types'

import ClassicCard from '../card/classicCard'
import {
  // getElementById,
  getAllParents,
  translatePoint,
  rotatePoint,
} from '../utils'

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

// const findById = (elements, id) => elements.some(elem => elem.id === id)

const addIndexProp = (element, idx) => {
  // Add index for later, keys are important in React
  return {
    ...element,
    idx,
  }
}

const addAngleProp = element => ({ ...element, angle: 0 })

const positionAndRotatePlayers = (element, idx, elements) => {
  const angle = getPartialAngle(elements)

  // Manipulate every player first
  if (element.type !== 'player') return element

  // Get initial correct position on the table, and add an angle
  const position = positionFromAngle(angle * idx + startingAngle, 40)
  return {
    ...element,
    dimensions: {
      x: position.x,
      y: position.y,
    },
    angle: angle * idx + startingAngle,
  }
}

const positionAndRotateElements = (element, idx, elements) => {
  // Get all parents
  const parents = getAllParents(elements, element)

  // Transform this element regarding all parents transforms
  const position = parents.reduce((point, parent) => {
    const parentPos = {
      x: parent.dimensions.x,
      y: parent.dimensions.y,
    }
    let p = translatePoint(point, parentPos)
    p = rotatePoint(p, parentPos, parent.angle)
    return p
  }, { x: element.dimensions.x, y: element.dimensions.y })

  // Just get the final angle
  const angle = parents[parents.length - 1] ?
    parents[parents.length - 1].angle - startingAngle :
    startingAngle

  return {
    ...element,
    x: position.x,
    y: position.y,
    angle,
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
      <Player key={'player' + element.idx}
        {...element}
      ></Player>
    )
  } else if (element.type === 'deck') {
    return (
      <Deck key={'deck' + element.idx}
        {...element}
      ></Deck>
    )
  } else if (element.type === 'pile') {
    return (
      <Pile key={'pile' + element.idx}
        {...element}
      ></Pile>
    )
  } else if (element.type === 'card') {
    return (
      <ClassicCard key={'card' + element.idx}
        {...element}
      ></ClassicCard>
    )
  }
}

class Table extends React.Component {

  render() {

    // Parse all current elements from props
    // Returns renderable html elements
    const elements = [
      ...this.props.players && this.props.players.list || [],
      ...this.props.containers || [],
      ...this.props.cards || [],
    ]
      .map(addIndexProp)
      .map(addAngleProp)
      .map(positionAndRotatePlayers)
      .map(positionAndRotateElements)
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
