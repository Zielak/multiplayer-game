// import {
//   findAllParents,
// } from '../../shared/utils.js'

import { applyToPoint } from 'transformation-matrix'

export const worldTransform = (parentTransform, localTransform) => {
  return applyToPoint(parentTransform, {
    x: localTransform.x,
    y: localTransform.y,
  })
}

export const worldTransformCSS = (parentTransform, localTransform) => {
  const position = worldTransform(parentTransform.transform, localTransform)
  return {
    left: `${position.x + 50}%`,
    top: `${position.y + 50}%`,
    '--angle': `${parentTransform.angle + localTransform.angle}deg`,
  }
}
