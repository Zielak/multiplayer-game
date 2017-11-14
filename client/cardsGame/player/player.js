
import React from 'react'
import PropTypes from 'prop-types'

import './player.scss'

// const positionFromAngle = (angle, distance) => {
//   const x = distance * Math.cos(angle * (Math.PI * 2 / 360))
//   const y = distance * Math.sin(angle * (Math.PI * 2 / 360))
//   return {left: x+50+'%', top: y+50+'%'}
// }

class Player extends React.Component {

  render() {
    return (
      <div className="Player" style={this.parseStyle()}>
        <div className="icon">
          <div className="name">{this.props.name}</div>
        </div>
      </div>
    )
  }

  parseStyle() {
    return {
      left: this.props.x + '%',
      top: this.props.y + '%',
      '--angle': this.props.angle + 'deg',
    }
  }

}

Player.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.array,

  localTransform: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  angle: PropTypes.number,
  zIndex: PropTypes.number,
}

export default Player
