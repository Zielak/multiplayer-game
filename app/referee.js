
const _ = {
  actionStatusFactory: (success = true, description = '') => {
    return { success, description }
  },
  
  canClientPerformThisAction: (client, action, state) => {
    switch (action) {
    case 'game.start':
      if(client.id !== state.host){
        return _.actionStatusFactory(false, `Client '${client.id}' is not a host: '${state.host}'`)
      }else if (state.clients.length < 1){
        return _.actionStatusFactory(false, `Not enough clients: only '${state.clients.length}' clients in the room`)
      }else{
        return _.actionStatusFactory()
      }
    case 'testScore.increase': return _.actionStatusFactory(true)
    case 'testScore.decrease': return _.actionStatusFactory(true)
    case '':
      if(client.id === state.currentPlayer.id){
        return _.actionStatusFactory()
      }else{
        return _.actionStatusFactory(false, `Client is not current player`)
      }
    default:
      return _.actionStatusFactory(false, `Unknown action "${action}"`)
    }
  }
}

module.exports = _
