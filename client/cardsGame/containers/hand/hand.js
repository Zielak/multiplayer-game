/**
 * Container of cards that are visible only to the
 * player who owns them
 */
import React from 'react'
import PropTypes from 'prop-types'
// import { worldTransformCSS } from '../../renderer'

// import { translate, transform } from 'transformation-matrix'

import './hand.scss'

class Hand extends React.Component {

  render() {
    // const shadow = ()

    return (
      <div className="Hand" style={this.parseStyle()}>

      </div>
    )
  }

  parseStyle() {
    // return worldTransformCSS(this.props.parentTransform, this.props.localTransform)
  }

  componentDidMount() {
    this.restyleAllChildren()
  }

  componentDidUpdate() {
    this.restyleAllChildren()
  }

  restyleAllChildren() {
    /*this.props.mapThroughChildren(this.props.id, (child, idx, array) => {
      const half = length * 0.5
      child.props.parentTransform.transform = transform([
        child.props.parentTransform.transform,
        translate(-half * 1.6 + idx * 1.6, 0),
      ])
      // child.setState((prevState) => {
      //   return {
      //     ...prevState,
      //     style: {
      //       ...prevState.style,
      //       ...this.restyleNthChild(prevState.style, idx, array.length)
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
   * @param {number} length number of all children
   * @returns new style object with applied changes
   * @memberof Deck
   */
  restyleNthChild(style, idx, length) {
    const half = length * 0.5
    return {
      ...style,
      left: style.left - half * 1.6 + idx * 1.6,
      angle: style.angle - half * 10 + (idx + 0.5) * 10,
      zIndex: idx + 1
    }
  }

}

Hand.propTypes = {
  id: PropTypes.string,
  mapThroughChildren: PropTypes.func,
  children: PropTypes.array,

  parentTransform: PropTypes.shape({
    transform: PropTypes.object,
    angle: PropTypes.number,
    zIndex: PropTypes.number,
  }),
  localTransform: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    angle: PropTypes.number,
    zIndex: PropTypes.number,
  }),
}

export default Hand
