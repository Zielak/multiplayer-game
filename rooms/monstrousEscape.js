const colyseus = require('colyseus')
const Cards = require('./cards/index')

module.exports = class MonstrousEscape extends colyseus.Room {

  onInit(options) {
    this.setState({
      players: [],
    })
    console.log('MonstrousEscape created!', options)
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
    console.log('MonstrousEscape:', client.id, data)
  }

  onDispose() {
    console.log('Dispose MonstrousEscape')
  }

}
