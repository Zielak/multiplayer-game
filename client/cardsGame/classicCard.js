const React = require('react')
const PropTypes = require('prop-types')

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
      <div className="card card-classic">
        {face}
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
  suit: PropTypes.string,
  rank: PropTypes.string,
  faceUp: PropTypes.bool,
}

module.exports = ClassicCard
