/**
 * Container of cards that are visible only to the
 * player who owns them
 */
import React from 'react'
import PropTypes from 'prop-types'

import './hand.scss'

class Hand extends React.Component {

  render() {
    // const shadow = ()

    return (
      <div className="Hand" style={{
        left: this.props.x + 50 + '%',
        top: this.props.y + 50 + '%',
        '--angle': this.props.angle + 'deg',
      }}>

      </div>
    )
  }

}

Hand.propTypes = {
  children: PropTypes.array,
  cards: PropTypes.array,

  x: PropTypes.number,
  y: PropTypes.number,
  angle: PropTypes.number,
}

export default Hand
