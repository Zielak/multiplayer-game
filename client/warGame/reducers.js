import { Player } from '../cardsGame/index'
import { Container } from 'pixi.js' // eslint-disable-line no-unused-vars

/**
 * @param {Container} stage 
 */
module.exports.players = (stage) => (state, action) => {
  let newList
  if (state === undefined) {
    return {
      list: [],
      reversed: false,
      currentPlayerIdx: 0,
      currentPlayer: null,
    }
  }
  switch (action.type) {
  case 'players.add':
    newList = [...state.list]
    newList[action.data.idx] = new Player(action.data.player)
    stage.addChild(newList[action.data.idx])
    return {
      ...state,
      list: [...newList]
    }
  case 'players.remove':
    stage.removeChild(state.list[action.data.idx])
    return {
      ...state,
      list: [
        ...state.list.slice(0, action.data.idx),
        ...state.list.slice(action.data.idx + 1)
      ]
    }
  case 'players.replace':
    return {
      ...state,
      list: state.list.map(player => {
        if (action.data.idx !== player.idx) {
          stage.removeChild(state.list[action.data.idx])
          return player
        }
        return {
          ...player,
          name: action.data.player.name
        }
      })
    }
  // case 'players.update':
  //   return {
  //     ...state,
  //     list: state.list.map(player => {
  //       if(player.id === action.data.player.id){
  //         return {
  //           ...player,
  //           ...action.data.player
  //         }
  //       } else {
  //         return player
  //       }
  //     })
  //   }
  case 'players.reversed':
    return {
      ...state,
      reversed: action.data.player
    }
  default:
    return state
  }
}

/**
 * @param {Container} stage 
 */
module.exports.containers = (stage) => (state = [], action) => {
  stage
  let newState
  switch (action.type) {
  case 'containers.add':
    newState = [...state]
    newState[action.data.idx] = action.data.container
    return [...newState]
  case 'containers.remove':
    return [
      ...state.slice(0, action.data.idx),
      ...state.slice(action.data.idx + 1)
    ]
  case 'containers.replace':
    return state.map(container => {
      if (action.data.idx !== container.idx) {
        return container
      }
      return {
        ...container
      }
    })
  case 'containers.update':
    return state.map((container, idx) => {
      if (idx !== action.data.idx) {
        return container
      }
      const newContainer = { ...container }
      newContainer[action.data.attribute] = action.data.value
      return newContainer
    })
  case 'containers.addChild':
    return state.map((container, idx) => {
      if (idx !== action.data.idx) {
        return container
      }
      newState = [...container.children]
      newState[action.data.childIdx] = action.data.value
      return {
        ...container,
        children: [...newState],
      }
    })
  case 'containers.removeChild':
    return state.map((container, idx) => {
      if (idx !== action.data.idx) {
        return container
      }
      newState = [...container.children]
      newState[action.data.childIdx] = action.data.value
      return {
        ...container,
        children: newState,
        // children: [
        //   ...container.children.slice(0, action.data.childIdx),
        //   ...container.children.slice(action.data.childIdx + 1)
        // ]
      }
    })
  default:
    return state
  }
}

/**
 * @param {Container} stage 
 */
module.exports.cards = (stage) => (state = [], action) => {
  stage
  let newState
  switch (action.type) {
  case 'cards.add':
    newState = [...state]
    newState[action.data.idx] = action.data.card
    return newState
  case 'cards.remove':
    return [
      ...state.slice(0, action.data.idx),
      ...state.slice(action.data.idx + 1)
    ]
  case 'cards.replace':
    return state.map(card => {
      if (action.data.idx !== card.idx) {
        return card
      }
      return {
        ...action.data.card
      }
    })
  case 'cards.update':
    return state.map((card, idx) => {
      if (idx !== action.data.idx) {
        return card
      }
      const newCard = { ...card }
      newCard[action.data.attribute] = action.data.value
      return newCard
    })
  default:
    return state
  }
}

/**
 * @param {Container} stage 
 */
module.exports.host = (stage) => (state = null, action) => {
  stage
  action.type === 'host.add'
  switch (action.type) {
  case 'host.add':
  case 'host.replace':
    return action.data
  default:
    return state
  }
}

/**
 * @param {Container} stage 
 */
module.exports.gameState = (stage) => (state = {}/*, action*/) => {
  stage
  if (state === undefined) {
    return {
      started: false,
    }
  } else {
    return state
  }
}
