/**
 * Each Card or Container in game should have a set of consitions
 * Conditions define how the game plays during player's round
 */

module.exports = class Conditions extends Map {

  constructor(set, context){
    super()
    Object.keys(set).forEach(key => {
      this.set(key, set[key])
    })

    this.context = context || null
  }

  call(key, args = undefined){
    if(this.has(key) && typeof this.get(key) === 'function'){
      return this.get(key).apply(this.context, args)
    }else{
      throw new Error(`There's no valid condition called ${key}.`)
    }
  }

}