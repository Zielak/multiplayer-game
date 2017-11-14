import React from 'react'
import PropTypes from 'prop-types'

require('./classicCard.scss')

class ClassicCard extends React.Component {

  render() {
    const render = this.props.state.faceUp ?
      this.renderFrontGraphics(this.props.suit, this.props.rank) :
      this.renderBackGraphics()

    return (
      <div className="ClassicCard" style={this.parseStyle()}>
        {render}
        <span className="debug">{this.props.name}</span>
      </div>
    )
  }

  parseStyle() {
    return {
      left: this.props.x + '%',
      top: this.props.y + '%',
      '--angle': this.props.angle + 'deg',
      zIndex: this.props.zIndex,
    }
  }

  renderFrontGraphics(suit, rank) {
    return <div className={`front suit-${suit}`}>
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

    </div>
  }

  renderRank(rank) {
    return rank
  }

  renderSuit(suit) {
    switch (suit) {
    case 'D': return '♦'
    case 'C': return '♣'
    case 'H': return '♥'
    case 'S': return '♠'
    }
  }

}

ClassicCard.propTypes = {
  id: PropTypes.string,
  parent: PropTypes.string,

  localTransform: PropTypes.object,

  x: PropTypes.number,
  y: PropTypes.number,
  angle: PropTypes.number,
  zIndex: PropTypes.number,

  name: PropTypes.string,
  suit: PropTypes.string,
  rank: PropTypes.any,

  state: PropTypes.shape({
    faceUp: PropTypes.bool,
    rotated: PropTypes.number,
    marked: PropTypes.bool,
  }),

}

export default ClassicCard
