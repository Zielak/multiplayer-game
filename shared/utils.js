
/**
 * Gets you random number in provided range
 */
const float = (min = 0, max = 1) => Math.floor(
  Math.random() * (max - min + 1) + min
)

/**
 * Returns `def` if the `value` really is undefined
 */
const def = (value, def) => typeof value !== 'undefined' ? value : def

/**
 * Check if the value exists
 */
const exists = (value) => typeof value !== 'undefined'

const noop = () => { }

const getElementById = (everything, id) => everything.find(el => el.id === id)

const getParent = (child, everything) => everything.filter(el => {
  return el && el.id === child.parent
})[0]

const arrayWithoutElement = (element, everything) => everything.filter(el => el.id !== element.id)

const findAllParents = (child, everything) => {
  const result = []
  if (child.parent) {
    const newParent = getParent(child, everything)
    if (!newParent) {
      return result
    }
    result.unshift(newParent)
    if (newParent.parent) {
      result.unshift(...findAllParents(newParent, arrayWithoutElement(newParent, everything)))
    }
  }
  return result
}

const rad2deg = (angle) => {
  //  discuss at: http://locutus.io/php/rad2deg/
  // original by: Enrique Gonzalez
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: rad2deg(3.141592653589793)
  //   returns 1: 180
  return angle * 57.29577951308232 // angle / Math.PI * 180
}

const deg2rad = (angle) => {
  //  discuss at: http://locutus.io/php/deg2rad/
  // original by: Enrique Gonzalez
  // improved by: Thomas Grainger (http://graingert.co.uk)
  //   example 1: deg2rad(45)
  //   returns 1: 0.7853981633974483
  return angle * 0.017453292519943295 // (angle / 180) * Math.PI;
}

module.exports = {
  float,
  def,
  exists,
  noop,
  getElementById,
  getParent,
  arrayWithoutElement,
  findAllParents,
  rad2deg,
  deg2rad,
}
