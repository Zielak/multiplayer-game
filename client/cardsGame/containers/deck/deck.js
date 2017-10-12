/**
 * Container of neatly packed cards in one column.
 */
import React from 'react'
import PropTypes from 'prop-types'

import './deck.scss'

class Deck extends React.Component {

  render(){
    return (
      <div className="Deck"
        style={{
          left: this.props.x + 50 + '%',
          top: this.props.y + 50 + '%',
          '--angle': this.props.angle+'deg',
        }}
      >
        <div className="label">DECK</div>
      </div>
    )
  }

  renderFrontGraphics(/*suit, rank*/){
    return 'card'
  }
  
  renderBackGraphics(){
    return 'bg'
  }

  renderRank(rank){
    return rank
  }

  renderSuit(suit){
    return suit
  }

}

Deck.propTypes = {
  cards: PropTypes.array,
  rank: PropTypes.string,
  faceUp: PropTypes.bool,

  x: PropTypes.number,
  y: PropTypes.number,
  angle: PropTypes.number,
}

export default Deck
