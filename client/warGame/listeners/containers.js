import store from '../store'

export default room => {
  room.listen('containers/:idx', (change) => {
    // console.log('container changed: ', change)
    store.dispatch({
      type: 'containers.' + change.operation,
      data: {
        idx: parseInt(change.path.idx),
        container: change.value,
      }
    })
  })

  room.listen('containers/:idx/:attribute', (change) => {
    // console.log(`container ${change.path.id} changed attribute ${change.path.attribute} to ${change.value} (${change.operation})`)
    store.dispatch({
      type: 'containers.update',
      data: {
        idx: parseInt(change.path.idx),
        attribute: change.path.attribute,
        value: change.value,
      }
    })
  })

  room.listen('containers/:idx/children/:childIdx', (change) => {
    // console.log(`container ${change.path.idx} child change ${change.path.childIdx} (${change.operation})`)
    store.dispatch({
      type: `containers.${change.operation}Child`,
      data: {
        idx: parseInt(change.path.idx),
        childIdx: parseInt(change.path.childIdx),
        value: change.value,
      }
    })
  })
}
