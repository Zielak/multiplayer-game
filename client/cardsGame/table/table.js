/**
 * Decides where each part of the game should be placed,
 * RWD
 */
import React from 'react'
import PropTypes from 'prop-types'

// import ClassicCard from '../card/classicCard'
// import {getElementById, getAllParents} from '../utils'

import Player from '../player/player'

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

    if(this.props.players && this.props.players.list){
      const angle = this.props.players.list ? 360 / this.props.players.list.length : 0
      // TODO: align angle to the current player
      const startingAngle = 90

      // TODO: Get all parents

      // TODO: Transform this element regarding all parents transforms

      players = this.props.players.list.map((player, idx) => ({
        ...player,
        angle: angle * idx + startingAngle,
        idx,
      })).map((element, idx) => {
        const position = positionFromAngle(angle * idx + 90, 40)
        return (
          <Player key={'player'+element.idx}
            {...element}
            x={element.dimensions.x + position.x}
            y={element.dimensions.y + position.y}

            width={element.dimensions.width}
            height={element.dimensions.height}
          ></Player>
        )
      })
    }

    // const elements = [
    //   ...this.props.containers,
    //   ...this.props.cards,
    // ].map(element => {
    //   // Find parent
    //   const owner = findOwner(elements, element)
    // })

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
