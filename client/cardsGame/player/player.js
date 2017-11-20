import PIXI from 'pixi.js'

import PropTypes from 'prop-types'

// const positionFromAngle = (angle, distance) => {
//   const x = distance * Math.cos(angle * (Math.PI * 2 / 360))
//   const y = distance * Math.sin(angle * (Math.PI * 2 / 360))
//   return {left: x+50+'%', top: y+50+'%'}
// }

class Player extends PIXI.Container {

  constructor(props) {
    super()
    this.props = props
    this.icon = new PIXI.Sprite()
    this.label = new PIXI.Text(this.props.name, {
      fill: ['#ffffff', '#00ff99'],
      stroke: '#4a1850',
      strokeThickness: 5,
    })

    this.addChild(this.icon)
    this.addChild(this.label)
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
