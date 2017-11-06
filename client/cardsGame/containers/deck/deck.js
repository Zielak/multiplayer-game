/**
 * Container of neatly packed cards in one column.
 */
import React from 'react'
import PropTypes from 'prop-types'
// import { worldTransformCSS } from '../../renderer'

// import { translate, transform } from 'transformation-matrix'

import './deck.scss'

class Deck extends React.Component {

  render() {
    const countCards = this.props.children ? this.props.children.length : 0

    return (
      <div className="Deck" style={this.parseStyle()}>
        <div>
          <div className="label">{countCards} cards</div>
        </div>
      </div>
    )
  }

  parseStyle() {
    return {
      left: this.props.x + '%',
      top: this.props.y + '%',
      '--angle': this.props.angle + 'deg',
    }
  }

  componentDidMount() {
    this.restyleAllChildren()
  }

  componentDidUpdate() {
    this.restyleAllChildren()
  }

  restyleAllChildren() {
    /*this.props.mapThroughChildren(this.props.id, (child, idx) => {
      child.props.parentTransform.transform = transform([
        child.props.parentTransform.transform,
        translate(idx * 0.1, -idx * 0.1),
      ])
      // child.setState((prevState) => {
      //   return {
      //     ...prevState,
      //     style: {
      //       ...prevState.style,
      //       ...this.restyleNthChild(prevState.style, idx)
      //     }
      //   }
      // })
    })*/
  }

  /**
   * Function used in restyling each of its child.
   * 
   * @param {object} style current style object from the other react component
   * @param {number} idx index of the element in my array
   * @returns new style object with applied changes
   * @memberof Deck
   */
  transformNthChild(style, idx) {
    return {
      ...style,
      left: style.left + idx * 0.1,
      top: style.top - idx * 0.1,
      zIndex: idx + 1
    }
  }

}

Deck.propTypes = {
  id: PropTypes.string,
  mapThroughChildren: PropTypes.func,
  children: PropTypes.array,

  localTransform: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  angle: PropTypes.number,
  zIndex: PropTypes.number,
}

export default Deck
