
module.exports.players = (state, action) => {
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
    return {
      ...state,
      list: [...state.list, action.data.player]
    }
  case 'players.remove':
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

module.exports.containers = (state = [], action) => {
  switch (action.type) {
  case 'containers.add':
    return [
      ...state,
      action.data.container
    ]
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
      return {
        ...container,
        children: container.children.map((childId, idx) =>
          action.data.childIdx === idx ? action.data.value : childId
        )
      }
    })
  case 'containers.removeChild':
    return state.map((container, idx) => {
      if (idx !== action.data.idx) {
        return container
      }
      return {
        ...container,
        children: [
          ...container.children.slice(0, action.data.childIdx),
          ...container.children.slice(action.data.childIdx + 1)
        ]
      }
    })
  default:
    return state
  }
}

module.exports.cards = (state = [], action) => {
  switch (action.type) {
  case 'cards.add':
    return [
      ...state,
      action.data.card
    ]
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

module.exports.host = (state = null, action) => {
  action.type === 'host.add'
  switch (action.type) {
  case 'host.add':
  case 'host.replace':
    return action.data
  default:
    return state
  }
}

module.exports.gameState = (state = {}/*, action*/) => {
  if (state === undefined) {
    return {
      started: false,
    }
  } else {
    return state
  }
}

module.exports.testScore = (state = 0, action) => {
  if (action.type === 'testScore.replace' || action.type === 'testScore.add') {
    return action.data
  } else {
    return state
  }
}
