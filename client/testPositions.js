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
  return result.reverse()
}

const Box = props => <div style={{
  '--x': props.worldX + '%',
  '--y': props.worldY + '%',
  '--angle': props.worldAngle + 'deg',
}} className="box">
  <div><strong>{props.name}</strong></div>
  <div style={{ fontSize: '14px' }}>{props.angle}°<br />({props.x}, {props.y})</div>
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
  { name: 'B', x: 50, y: 25, angle: 45 },
  { name: 'C', x: 25, y: 70, angle: 270 },
  { name: 'D', x: 80, y: 15, angle: 0 },

  { name: 'B1', y: 20, parent: 'B' },
  { name: 'B1A', x: 13, parent: 'B1' },
  
  { name: 'C-down', y: 16, parent: 'C' },
  { name: 'C-up', y: -16, parent: 'C' },
  { name: 'C-left', x: -16, parent: 'C' },
  { name: 'C-right', x: 16, parent: 'C' },
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
          angle: box.angle + _angle,
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
