import { appendIdx } from '../../../shared/utils'

export default (target, room) => {
  room.listen('cards/:idx', (change) => {
    target.emit('cards.' + change.operation, {
      idx: parseInt(change.path.idx),
      card: appendIdx(change.value, parseInt(change.path.idx)),
    })
  })

  room.listen('cards/:idx/:attribute', (change) => {
    // console.log(`card ${change.path.idx} changed attribute ${change.path.attribute} to ${change.value} (${change.operation})`)
    target.emit('cards.update', {
      idx: parseInt(change.path.idx),
      attribute: change.path.attribute,
      value: change.value,
    })
  })
}
