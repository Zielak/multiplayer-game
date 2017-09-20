module.exports = class Player {
  
  constructor(options = {}){
    this.name = options.name
    this.id = options.id
    
    // Defaults
    this.score = 0
    // Infinite time left for testing
    this.timeleft = "Infinity"
  }

}