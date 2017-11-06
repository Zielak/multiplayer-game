/**
 * Container of neatly packed cards in one column.
 */
import React from 'react'
import PropTypes from 'prop-types'

import './deck.scss'

class Deck extends React.Component {

  render() {
    const countCards = this.props.children ? this.props.children.length : 0

    return (
      <div className="Deck" style={this.parseStyle()}>
        <div>
          <div className="label">{countCards} cards</div>
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

Deck.restyleChild = (child, idx/*, length*/) => {
  return {
    x: idx * .1,
    y: -idx * .1,
    angle: 0,
    zIndex: idx,
  }
}

Deck.propTypes = {
  id: PropTypes.string,
  children: PropTypes.array,

  localTransform: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  angle: PropTypes.number,
  zIndex: PropTypes.number,
}

export default Deck
