import { Container, Sprite, Text } from 'pixi.js'
import PropTypes from 'prop-types'

class Player extends Container {

  constructor(props) {
    super()
    this.props = props
    this.icon = new Sprite()
    this.label = new Text(this.props.name, {
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

  x: PropTypes.number,
  y: PropTypes.number,
  angle: PropTypes.number,
  zIndex: PropTypes.number,
}

export default Player
