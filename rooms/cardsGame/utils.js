module.exports = {
  float: (min, max) => Math.floor(
    Math.random() * (max - min + 1) + min
  ),
  default: (value, def) => {
    return typeof value !== 'undefined' ? value : def
  },
  exists: (value) => {
    return typeof value !== undefined
  }
}