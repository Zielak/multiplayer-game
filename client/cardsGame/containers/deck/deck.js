/**
 * Container of neatly packed cards in one column.
 */
import React from 'react'
import PropTypes from 'prop-types'

import './deck.scss'

class Deck extends React.Component {

  render() {
    const countCards = this.props.children ? this.props.children.length : 0

    return (
      <div className="Deck"
        style={{
          left: this.props.x + 50 + '%',
          top: this.props.y + 50 + '%',
          '--angle': this.props.angle + 'deg',
        }}
      >
        <div>
          <div className="label">{countCards} cards</div>
        </div>
      </div>
    )
  }

  componentWillMount() {
    this.props.registerMyself(this)
  }

  componentWillUpdate() {
    this.mapThroughChildren(this.props.id, (child, idx) => {
      child.setState((prevState) => {
        return {
          ...prevState,
          style: {
            ...prevState.style,
            ...this.restyleNthChild(prevState.style, idx)
          }
        }
      })
    })
  }

  renderFrontGraphics(/*suit, rank*/) {
    return 'card'
  }

  renderBackGraphics() {
    return 'bg'
  }

  renderRank(rank) {
    return rank
  }

  renderSuit(suit) {
    return suit
  }

  /**
   * Function used in restyling each of its child.
   * 
   * @param {object} style current style object from the other react component
   * @param {number} idx index of the element in my array
   * @returns new style object with applied changes
   * @memberof Deck
   */
  restyleNthChild(style, idx) {
    return {
      ...style,
      left: style.left + idx / 2,
      top: style.top + idx / 2,
    }
  }

  // Table.js will provide me with that function
  mapThroughChildren(/*myId, mapper*/) { }

}

Deck.propTypes = {
  id: PropTypes.string,
  children: PropTypes.array,
  registerMyself: PropTypes.func,

  cards: PropTypes.array,
  rank: PropTypes.string,
  faceUp: PropTypes.bool,

  x: PropTypes.number,
  y: PropTypes.number,
  angle: PropTypes.number,
}

export default Deck
