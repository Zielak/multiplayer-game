import test from 'ava'
import {Base} from '../../../rooms/cardsGame'

test.beforeEach('clears all objects from Base', () => {
  Base._clear()
})

test('constructor', t => {
  t.notThrows(()=>{
    new Base()
  }, `doesn't throw`)
})

test('parent is updated with new child', t => {
  const parent = new Base({
    name: 'parent',
    onUpdate: self => {
      t.deepEqual(self.id, parent.id, `ids don't match!`)
      t.deepEqual(self, parent, `self context is not correct`)
      t.true( self.children.length === 1, `children array didn't update` )
    }
  })
  t.true(parent.children.length === 0, `children array isn't empty`)
  const child = new Base({
    name: 'child',
    parent: parent,
  })
  t.true(parent.children.length === 1, `children array doesn't have only 1 child`)
  t.deepEqual(parent.children[0], child.id, `first child id doesn't match`)
})
