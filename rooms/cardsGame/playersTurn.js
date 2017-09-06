const utils = require('./utils')

module.exports = class PlayersTurn {
  constructor(options = {}){
    this.currentPlayerIdx = utils.default(options.currentPlayerIdx, 0)
    this._players = options.players ? options.players.slice(0) : []
    this.reversed = utils.default(options.reversed, false)
  }
  setPlayers(array){
    this._players = array.slice(0)
    this.currentPlayerIdx = 0
    return this
  }
  get players(){
    return this._players.slice(0)
  }

  get currentPlayer(){
    return this._players[this.currentPlayerIdx]
  }
  
  /**
   * Picks next player to play
   * 
   * @returns {Player} current player
   */
  next(){
    if(!this.reversed){
      if(++this.currentPlayerIdx > this.players.length - 1){
        this.currentPlayerIdx = 0
      }
    }else{
      if(--this.currentPlayerIdx < 0){
        this.currentPlayerIdx = this.players.length - 1
      }
    }
    return this.players[this.currentPlayerIdx]
  }

  /**
   * Picks previous player to play
   * 
   * @returns {Player} current player
   */
  previous(){
    if(this.reversed){
      if(++this.currentPlayerIdx > this.players.length - 1){
        this.currentPlayerIdx = 0
      }
    }else{
      if(--this.currentPlayerIdx < 0){
        this.currentPlayerIdx = this.players.length - 1
      }
    }
    return this.players[this.currentPlayerIdx]
  }

  shuffle(){
    let i = this.players.length
    if (i === 0) return
    while (--i) {
      const j = Math.floor(Math.random() * (i + 1))
      const tempi = this.players[i]
      const tempj = this.players[j]
      this.players[i] = tempj
      this.players[j] = tempi
      // Keep the current player the same
      if(i === this.currentPlayerIdx){
        this.currentPlayerIdx = j
      }
    }
    return this
  }

  reverse(){
    this.reversed = !this.reversed
    return this.reversed
  }
}
