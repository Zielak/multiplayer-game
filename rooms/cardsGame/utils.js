const Base = require('./base')

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
const exists = (value) => typeof value !== undefined

/**
 * Get element by ID from the Base class
 */
const getById = (id) => Base.get(id)

const noop = () => {}

module.exports = {
  float,
  def,
  exists,
  getById,
  noop,
}