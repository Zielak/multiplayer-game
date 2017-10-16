module.exports = (success = true, description = '') => {
  const o = { success, description }
  o.valueOf = function valueOf() {
    this.success
  }
}
