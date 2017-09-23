/**
 * Container of neatly packed cards in one column.
 */
import React from 'react'
import PropTypes from 'prop-types'

class Deck extends React.Component {

  render(){
  // const shadow = ()

    return (
      <div className="deck">
        
      </div>
    )
  }

  renderFrontGraphics(suit, rank){
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
}

export default Deck
