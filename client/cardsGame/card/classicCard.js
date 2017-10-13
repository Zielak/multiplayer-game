import React from 'react'
import PropTypes from 'prop-types'

require('./classicCard.scss')

class ClassicCard extends React.Component {

  render() {
    const render = this.props.faceUp ?
      this.renderFrontGraphics(this.props.suit, this.props.rank) :
      this.renderBackGraphics()

    return (
      <div className="ClassicCard" style={{
        left: this.props.x + 50 + '%',
        top: this.props.y + 50 + '%',
        '--angle': (this.props.angle || 0) + 'deg',
      }}>
        {render}
      </div>
    )
  }

  renderFrontGraphics(suit, rank) {
    return <div className="front">
      <div className="icons">
        <div className="rank">{this.renderRank(rank)}</div>
        <div className="suit">{this.renderSuit(suit)}</div>
      </div>
      <div className="icons reverse">
        <div className="rank">{this.renderRank(rank)}</div>
        <div className="suit">{this.renderSuit(suit)}</div>
      </div>
    </div>
  }

  renderBackGraphics() {
    return <div className="back">
      card
    </div>
  }

  renderRank(rank) {
    return rank
  }

  renderSuit(suit) {
    return suit
  }

}

ClassicCard.propTypes = {
  name: PropTypes.string,
  suit: PropTypes.string,
  rank: PropTypes.any,

  faceUp: PropTypes.bool,
  rotated: PropTypes.number,
  marked: PropTypes.bool,

  x: PropTypes.number,
  y: PropTypes.number,
  angle: PropTypes.number,
}

export default ClassicCard
