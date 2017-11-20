import {
  combineReducers,
  createStore
} from 'redux'

import {
  players,
  host,
  containers,
  cards,
  gameState,
} from './reducers'

export default (stage) => createStore(
  combineReducers({
    players: players(stage),
    host: host(stage),
    containers: containers(stage),
    cards: cards(stage),
    gameState: gameState(stage),
  })
)
