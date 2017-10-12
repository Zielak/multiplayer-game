/**
 * Container of cards with loosely placed
 * and slightly rotated cards
 */
/**
 * Container of neatly packed cards in one column.
 */
import React from 'react'
import PropTypes from 'prop-types'

import './pile.scss'

class Pile extends React.Component {

  render(){
  // const shadow = ()

    return (
      <div className="Pile" style={{
        left: this.props.x + 50 + '%',
        top: this.props.y + 50 + '%'
      }}>
        <div className="label">PILE</div>
      </div>
    )
  }

}

Pile.propTypes = {
  cards: PropTypes.array,

  x: PropTypes.number,
  y: PropTypes.number,
}

export default Pile
