import React from 'react'
import PropTypes from 'prop-types'

require('./classicCard.scss')

class ClassicCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      style: {
        left: props.x,
        top: props.y,
        angle: props.angle || 0,
      }
    }
  }

  render() {
    const render = this.props.faceUp ?
      this.renderFrontGraphics(this.props.suit, this.props.rank) :
      this.renderBackGraphics()

    return (
      <div className="ClassicCard" style={this.parseStyle(this.state.style)}>
        {render}
      </div>
    )
  }

  componentWillMount() {
    this.props.registerMyself(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState(prevState => {
      return {
        ...prevState,
        style: {
          left: newProps.x,
          top: newProps.y,
          angle: newProps.angle || 0,
        }
      }
    })
  }

  parseStyle(stateStyle) {
    const style = {
      ...stateStyle
    }
    style.left = `${stateStyle.left + 50}%`
    style.top = `${stateStyle.top + 50}%`
    style['--angle'] = `${stateStyle.angle}deg`

    return style
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
  registerMyself: PropTypes.func,
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
