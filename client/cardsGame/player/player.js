
import React from 'react'
import PropTypes from 'prop-types'

import './player.scss'

// const positionFromAngle = (angle, distance) => {
//   const x = distance * Math.cos(angle * (Math.PI * 2 / 360))
//   const y = distance * Math.sin(angle * (Math.PI * 2 / 360))
//   return {left: x+50+'%', top: y+50+'%'}
// }

class Player extends React.Component {
  
  render(){
    return (
      <div className="Player" style={{
        left: this.props.x + 50 + '%',
        top: this.props.y + 50 + '%'
      }}>
        <div className="icon">
          <div className="name">{this.props.name}</div>
        </div>
      </div>
    )
  }
}

Player.propTypes = {
  children: PropTypes.array,
  angle: PropTypes.number,
  childs: PropTypes.array,
  idx: PropTypes.number,
  id: PropTypes.string,
  name: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Player
