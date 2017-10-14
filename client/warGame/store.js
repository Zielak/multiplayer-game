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
  testScore,
} from './reducers'

const cardsApp = combineReducers({
  players,
  host,
  containers,
  cards,
  gameState,
  testScore,
})

export default createStore(cardsApp)