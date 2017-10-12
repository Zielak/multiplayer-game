import React from 'react'
import PropTypes from 'prop-types'

require('./classicCard.scss')

class ClassicCard extends React.Component {

  render(){
    const face = this.props.faceUp ?
      <div className="face">
        <div className="">
          {this.renderFrontGraphics(this.props.suit, this.props.rank)}
        </div>
        <div className="icons">
          <div className="rank">{this.renderRank(this.props.rank)}</div>
          <div className="suit">{this.renderSuit(this.props.suit)}</div>
        </div>
        <div className="icons reverse">
          <div className="rank">{this.renderRank(this.props.rank)}</div>
          <div className="suit">{this.renderSuit(this.props.suit)}</div>
        </div>
      </div> :
      <div className="back">
        {this.renderBackGraphics()}
      </div>

    return (
      <div className="ClassicCard" style={{
        left: this.props.x + 50 + '%',
        top: this.props.y + 50 + '%',
        '--angle': this.props.angle+'deg',
      }}>
        {face}
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

ClassicCard.propTypes = {
  name: PropTypes.string,
  suit: PropTypes.string,
  rank: PropTypes.string,
  
  faceUp: PropTypes.bool,
  rotated: PropTypes.number,
  marked: PropTypes.bool,

  x: PropTypes.number,
  y: PropTypes.number,
  angle: PropTypes.number,
}

export default ClassicCard
