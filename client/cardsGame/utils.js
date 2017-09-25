
export const getElementById = (everything, id) => everything.find(el => el.id === id)

// TODO: test it
export const getAllParents = (everything, element) => {
  if (element.parent) {
    const found = getElementById(everything, element.parent)
    if (found) {
      return [...getAllParents(everything, found)]
    } else {
      return []
    }
  } else {
    return []
  }
}

export const translatePoint = (point, x, y) => {
  return {
    x: point.x + x,
    y: point.y + y,
  }
}

export const rotatePoint = (point, origin, angle) => {
  const x1 = point.x - origin.x
  const y1 = point.y - origin.y

  const x2 = x1 * Math.cos(angle) - y1 * Math.sin(angle)
  const y2 = x1 * Math.sin(angle) + y1 * Math.cos(angle)

  return {
    x: x2 + origin.x,
    y: y2 + origin.y,
  }
}
