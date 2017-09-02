let currentPlayerIdx = 0
let players = []
let reversed = false

const init = (options = {}) => {
  currentPlayerIdx = options.currentPlayerIdx !== undefined ? options.currentPlayerIdx : 0
  players = options.players ? options.players.slice(0) : []
  reversed = options.reversed !== undefined ? options.reversed : false
}

const setPlayers = (array) => {
  players = array.slice(0)
}

/**
 * Picks next player to play
 * 
 * @returns {Player} current player
 */
const next = (current, reversed, players) => {
  if(!reversed){
    if(++current > players.length - 1){
      current = 0
    }
  }else{
    if(--current < 0){
      current = players.length - 1
    }
  }
  return players[current]
}

/**
 * Picks previous player to play
 * 
 * @returns {Player} current player
 */
const previous = (current, reversed, players) => {
  if(reversed){
    if(++current > players.length - 1){
      current = 0
    }
  }else{
    if(--current < 0){
      current = players.length - 1
    }
  }
  return players[current]
}

const shuffle = (array, current) => {
  let i = array.length
  if (i === 0) return
  while (--i) {
    const j = Math.floor(Math.random() * (i + 1))
    const tempi = array[i]
    const tempj = array[j]
    array[i] = tempj
    array[j] = tempi
    // Keep the current player the same
    if(i === current){
      current = j
    }
  }
  return current
}

module.exports = class PlayersTurn {
  constructor(options){
    init(options)
  }
  setPlayers(array){
    return setPlayers(array)
  }
  get players(){
    return players.slice(0)
  }
  next(){
    return next(currentPlayerIdx, reversed, players)
  }
  previous(){
    return previous(currentPlayerIdx, reversed, players)
  }
  shuffle(){
    return shuffle(players, currentPlayerIdx)
  }
  reverse(){
    reversed = !reversed
    return reversed
  }
}
