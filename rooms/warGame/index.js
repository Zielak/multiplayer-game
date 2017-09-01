const colyseus = require('colyseus')

const isValidMessage = text => {
  return (''+text).length > 0
}

module.exports = class WarGame extends colyseus.Room {

  onInit(options) {
    this.setState({
      clients: [],
      maxClients: options.maxClients,
      host: options.host,
    })
    console.log('ChatRoom created!', options)
  }

  requestJoin(options) {
    return this.clients.length < this.state.maxClients
  }

  onJoin(client) {
    this.state.messages.push({
      text: `${client.id} joined.`
    })
    this.state.clients.push(client.id)
  }

  onLeave(client) {
    this.state.messages.push({
      text: `${client.id} left.`
    })
    this.state.clients.splice(
      this.state.clients.indexOf(client.id), 1
    )
  }

  onMessage(client, data) {
    if(isValidMessage(data.message)){
      this.state.messages.push({
        text: data.message,
        client: client.id
      })
      console.log('WarGame:', client.id, data.message)
    }
  }

  onDispose() {
    console.log('Dispose WarGame')
  }

}
