const colyseus = require('colyseus')

module.exports = class ChatRoom extends colyseus.Room {

  onInit(options) {
    this.setState({
      messages: [],
      clients: [],
    })
    console.log('ChatRoom created!', options)
  }

  onJoin(client) {
    this.state.messages.push(`${client.id} joined.`)
    this.state.clients.push(client.id)
  }

  onLeave(client) {
    this.state.messages.push(`${client.id} left.`)
    this.state.clients.splice(
      this.state.clients.indexOf(client.id), 1
    )
  }

  onMessage(client, data) {
    this.state.messages.push(data.message)
    console.log('ChatRoom:', client.id, data)
  }

  onDispose() {
    console.log('Dispose ChatRoom')
  }

}
