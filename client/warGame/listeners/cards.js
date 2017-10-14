import store from '../store'

export default room => {
  room.listen('cards/:idx', (change) => {
    store.dispatch({
      type: 'cards.' + change.operation,
      data: {
        idx: parseInt(change.path.idx),
        card: change.value,
      }
    })
  })

  room.listen('cards/:idx/:attribute', (change) => {
    console.log(`card ${change.path.idx} changed attribute ${change.path.attribute} to ${change.value} (${change.operation})`)
    store.dispatch({
      type: 'cards.update',
      data: {
        idx: parseInt(change.path.idx),
        attribute: change.path.attribute,
        value: change.value,
      }
    })
  })
}