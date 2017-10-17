import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { rotateDEG, translate, transform, applyToPoint, identity } from 'transformation-matrix'

/* eslint-disable */
var _angle = 0
/* eslint-enable*/

/* eslint-disable no-unused-vars */
const rad2deg = (angle) => {
  return angle * 57.29577951308232 // angle / Math.PI * 180
}

const deg2rad = (angle) => {
  return angle * 0.017453292519943295 // (angle / 180) * Math.PI;
}

const getParent = (child, everything) => everything.filter(el => el.name === child.parent)[0]

const arrayWithoutElement = (element, everything) => everything.filter(el => el.name !== element.name)

const findAllParents = (child, everything) => {
  const result = []
  if (child.parent) {
    const newParent = getParent(child, everything)
    result.push(newParent)
    if (newParent.parent) {
      result.push(...findAllParents(newParent, arrayWithoutElement(newParent, everything)))
    }
  }
  return result
}

const Box = props => <div className="box" style={{
  '--x': props.worldX * 5 + 'px',
  '--y': props.worldY * 5 + 'px',
  '--angle': props.worldAngle + 'deg',
}}>
  <div><strong>{props.name}</strong></div>
  <div style={{ fontSize: '12px' }}>angle: {props.angle}<br />({props.x}, {props.y})</div>
</div>
Box.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  worldX: PropTypes.number,
  worldY: PropTypes.number,
  angle: PropTypes.number,
  worldAngle: PropTypes.number,
  name: PropTypes.string,
}

/* eslint-disable react/prop-types */
const Container = props => <div>
  <div>container here</div>
  {props.children}
</div>
Container.propTypes = {
  angle: PropTypes.number,
}
/* eslint-enable react/prop-types */

const boxes = [
  { name: 'zero', x: 0, y: 0, angle: 0 },
  { name: 'B', x: 50, y: 50, angle: 45 },
  { name: 'C', x: 20, y: 80, angle: 0 },
  { name: 'D', x: 60, y: 25, angle: 0 },

  { name: 'B 1', y: 20, parent: 'B' },

  { name: 'B 1 A', x: 10, parent: 'B 1' },
]

const render = () => {
  const renderedBoxes = boxes
    .map(box => {
      // Provide defaults
      box.x = typeof box.x === 'undefined' ? 0 : box.x
      box.y = typeof box.y === 'undefined' ? 0 : box.y
      box.angle = typeof box.angle === 'undefined' ? 0 : box.angle
      return box
    })
    // Add unique keys
    .map((box, idx) => ({ ...box, key: idx }))
    // Add to top-most elements the global angle
    .map(box => {
      if (box.parent) {
        return box
      } else {
        return {
          ...box,
          angle: _angle,
        }
      }
    })
    // Add transform matrices to all elements
    .map(box => {
      const trans = transform(
        translate(box.x, box.y),
        rotateDEG(box.angle)
      )
      return {
        ...box,
        transform: trans
      }
    })
    // Transform matrices, regarding all parents
    .map((box, idx, everything) => {
      const parents = findAllParents(box, everything)
      const rotation = parents.reduce((acc, parent) => acc + parent.angle, box.angle)
      const matrices = parents.map(parent => parent.transform)
      const matrix = matrices.length > 0 ? transform(matrices) : identity()
      const pos = applyToPoint(matrix, { x: box.x, y: box.y })

      return {
        ...box,
        worldX: pos.x,
        worldY: pos.y,
        worldAngle: rotation,
      }
    })
    // Finally
    .map((box, idx) => <Box key={idx} {...box} />)

  ReactDOM.render(
    <Container>
      {renderedBoxes}
    </Container>,
    document.getElementById('container')
  )
}

setInterval(() => {
  _angle += 10
  render()
}, 500)
