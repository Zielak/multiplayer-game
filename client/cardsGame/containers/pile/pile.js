/**
 * Container of cards with loosely placed
 * and slightly rotated cards
 */
/**
 * Container of neatly packed cards in one column.
 */
import React from 'react'
import PropTypes from 'prop-types'
// import { worldTransformCSS } from '../../renderer'

// import { translate, transform } from 'transformation-matrix'

import './pile.scss'

class Pile extends React.Component {

  render() {
    return (
      <div className="Pile" style={this.parseStyle()}>
        <div className="label">PILE</div>
      </div>
    )
  }

  parseStyle() {
    // return worldTransformCSS(this.props.parentTransform, this.props.localTransform)
  }

}

Pile.propTypes = {
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

export default Pile
