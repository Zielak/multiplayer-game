/**
 * Container of neatly packed cards in one column.
 */
import React from 'react'
import PropTypes from 'prop-types'
import ClassicCard from '../../card/classicCard'

import './deck.scss'

class Deck extends React.Component {

  render() {
    const countCards = this.props.children ? this.props.children.length : 0
    
    const top = this.props.children && this.props.children.length > 0 ?
      <ClassicCard/> :
      <div className="label">DECK<br />{countCards} cards</div>
    
    return (
      <div className="Deck"
        style={{
          left: this.props.x + 50 + '%',
          top: this.props.y + 50 + '%',
          '--angle': this.props.angle + 'deg',
          '--deck-offset': this.props.children && this.props.children.length/5+'px',
        }}
      >
        {top}
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
  children: PropTypes.array,
  cards: PropTypes.array,
  rank: PropTypes.string,
  faceUp: PropTypes.bool,

  x: PropTypes.number,
  y: PropTypes.number,
  angle: PropTypes.number,
}

export default Deck
