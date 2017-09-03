/**
 * Container of neatly packed cards in one column.
 */
const React = require('react')
const PropTypes = require('prop-types')

class Deck extends React.Component {

  render(){
    const shadow = ()

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

ClassicCard.propTypes = {
  cards: PropTypes.array,
  rank: PropTypes.string,
  faceUp: PropTypes.bool,
}

module.exports = ClassicCard
