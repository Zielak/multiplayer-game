module.exports = class ClientsList {
  
  constructor(element, room){
    this.element = element
    this.room = room

    this.init()
  }

  init(){
    this.room.listen('clients/:number', (change) => {
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
    
    this.room.onUpdate.addOnce(state => {
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
}