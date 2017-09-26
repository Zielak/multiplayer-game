
export const getElementById = (everything, id) => everything.find(el => el.id === id)

// TODO: test it
export const getAllParents = (everything, target) => {
  if (target.parent) {
    const parents = []
    let parent = getElementById(everything, target.parent)
    while (parent) {
      parents.unshift( getElementById(everything, parent.id) )
      parent = parent.parent
    }
    return parents
  } else {
    return []
  }
}

export const rad2deg = (angle) => {
  //  discuss at: http://locutus.io/php/rad2deg/
  // original by: Enrique Gonzalez
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: rad2deg(3.141592653589793)
  //   returns 1: 180
  return angle * 57.29577951308232 // angle / Math.PI * 180
}

export const deg2rad = (angle) => {
  //  discuss at: http://locutus.io/php/deg2rad/
  // original by: Enrique Gonzalez
  // improved by: Thomas Grainger (http://graingert.co.uk)
  //   example 1: deg2rad(45)
  //   returns 1: 0.7853981633974483
  return angle * 0.017453292519943295 // (angle / 180) * Math.PI;
}

export const translatePoint = (point, offset) => {
  return {
    x: point.x + offset.x,
    y: point.y + offset.y,
  }
}

export const rotatePoint = (point, origin, angle) => {
  angle -= 90

  const x1 = point.x - origin.x
  const y1 = point.y - origin.y

  const x2 = x1 * Math.cos(deg2rad(angle)) - y1 * Math.sin(deg2rad(angle))
  const y2 = x1 * Math.sin(deg2rad(angle)) + y1 * Math.cos(deg2rad(angle))

  return {
    x: x2 + origin.x,
    y: y2 + origin.y,
  }
}
