const React = require('react')
const PropTypes = require('prop-types')
const ReactDOM = require('react-dom')
const Redux = require('redux')

const ClientsList = require('./clientsList')

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const store = Redux.createStore(counter)

class Lobby {

  constructor(room){
    room.listen('clients/:number', (change) => {
      console.log('clients list: ', change)
      switch(change.operation){
        case 'add':
          this.add(change.path.number, change.value)
          break
        case 'replace':
          this.replace(change.path.number, change.value)
          break
        case 'remove':
          this.remove(change.path.number)
      }
    })
    
    room.onUpdate.addOnce(state => {
      state.clients.forEach((el, idx) => this.add(idx, el), this)
    })
  }

  add(key, name){
    const p = document.createElement('p')
    p.innerHTML = name
    p.id = 'client_'+key
    this.element.appendChild(p)
  }

  replace(key, name){
    const el = document.getElementById('client_'+key)
    el.innerHTML = name
    el. id = 'client_'+key
  }

  remove(key){
    document.getElementById('client_'+key).remove()
  }

  render() {
    return (
      <div className="flex">
        <div>
          <h3>Messages</h3>

          <form id="form">
            <input type="text" id="input" value="" />
            <input type="submit" value="send" />
          </form>

          <div id="messages"></div>
        </div>
        <ClientsList clients={this.state.clients}></ClientsList>
      </div>
    )
  }
}

module.exports = Lobby
