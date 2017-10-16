const actionStatusFactory = require('../utils/actionStatusFactory')

module.exports = {
  'game.start': (client, state) => {
    if(client.id !== state.host){
      return actionStatusFactory(false, `Client '${client.id}' is not a host: '${state.host}'`)
    }else if (state.clients.length < 1){
      return actionStatusFactory(false, `Not enough clients: only '${state.clients.length}' clients in the room`)
    }else{
      return actionStatusFactory()
    }
  },
  'testScore.increase': () => actionStatusFactory(true),
  'testScore.decrease': () => actionStatusFactory(true),
}
