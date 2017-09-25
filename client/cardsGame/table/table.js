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

const positionFromAngle = (angle, distance) => {
  const x = distance * Math.cos(angle * (Math.PI * 2 / 360))
  const y = distance * Math.sin(angle * (Math.PI * 2 / 360))
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

class Table extends React.Component {

  render() {
    let players = []

    if (this.props.players && this.props.players.list) {
      const angle = this.props.players.list ? 360 / this.props.players.list.length : 0
      // TODO: align angle to the current player
      const startingAngle = 90

      players = this.props.players.list.map((player, idx) => {
        // Get initial correct position on the table, and add an angle
        const position = positionFromAngle(angle * idx + 90, 40)
        return {
          ...player,
          x: position.x,
          y: position.y,
          angle: angle * idx + startingAngle,
          idx,
        }
      }).map((element) => {

        return (
          <Player key={'player' + element.idx}
            {...element}
            x={element.dimensions.x}
            y={element.dimensions.y}

            width={element.dimensions.width}
            height={element.dimensions.height}
          ></Player>
        )
      })
    }

    // Parse all current elements from props
    // Returns renderable html elements
    const elements = [
      ...this.props.players && this.props.players.list || [],
      ...this.props.containers || [],
      ...this.props.cards || [],
    ].map(element => {
      // TODO: Get all parents
      const parents = getAllParents(elements, element)
      
      // TODO: Transform this element regarding all parents transforms
      const position = parents.reduce((point, parent) => {
        const parentPos = {
          x: parent.dimensions.x,
          y: parent.dimensions.y,
        }
        let p = translatePoint(point, parentPos)
        p = rotatePoint(p, parentPos, parent.dimensions.angle)
        return p
      }, {x: element.dimensions.x, y: element.dimensions.y})
      
      return {
        ...element,
        x: position.x,
        y: position.y,
      }
    }).map(element => {
      if(element.type === 'deck'){
        return (
          <Deck key={'deck' + element.idx}
            {...element}
          ></Deck>
        )
      } else if(element.type === 'pile'){
        return (
          <Pile key={'pile' + element.idx}
            {...element}
          ></Pile>
        )
      } else if(element.type === 'card') {
        return (
          <ClassicCard key={'card' + element.idx}
            {...element}
          ></ClassicCard>
        )
      }
      
    })

    return (
      <div className='Table'>
        {players}
      </div>
    )
  }

}

Table.propTypes = {
  players: PropTypes.object,
  cards: PropTypes.array,
  containers: PropTypes.array,
}

export default Table
