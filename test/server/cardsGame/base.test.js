import test from 'ava'
import { Base } from '../../../app/cardsGame'

test.beforeEach('prepares some dummie children', t => {
  t.context.things = new Base({ name: 'root' })
  t.context.human = new Base({ type: 'human', name: 'Darek' })
  t.context.fruityBag = new Base({ type: 'bag', name: 'fruits' })
  t.context.veggieBag = new Base({ type: 'bag', name: 'vegetables' })
  const children = [
    t.context.human,
    t.context.fruityBag,
    t.context.veggieBag,
    new Base({ type: 'vegetable', name: 'radish' }),
    new Base({ type: 'vegetable', name: 'potato' }),
    new Base({ type: 'fruit', name: 'banana' }),
  ]
  t.context.fruityBag.addChild(new Base({
    type: 'fruit', name: 'apple'
  }))
  t.context.fruityBag.addChild(new Base({
    type: 'fruit', name: 'orange'
  }))
  t.context.veggieBag.addChild(new Base({
    type: 'vegetable', name: 'carrot'
  }))
  t.context.veggieBag.addChild(new Base({
    type: 'vegetable', name: 'garlic'
  }))
  t.context.veggieBag.addChild(new Base({
    type: 'vegetable', name: 'potato'
  }))
  children.forEach(el => t.context.things.addChild(el))
})

test.afterEach('clears all objects from Base', () => {
  Base._clear()
})

test('testing data', t => {
  t.is(t.context.things.children.length, 6, `confirm it's 6 root elements`)
})

test('constructor', t => {
  t.notThrows(() => {
    new Base()
  }, `doesn't throw`)
})

test('parent is updated with new child', t => {
  const parent = new Base({
    name: 'parent',
    onUpdate: self => {
      t.deepEqual(self.id, parent.id, `ids don't match!`)
      t.deepEqual(self, parent, `self context is not correct`)
      t.true(self.children.length === 1, `children array didn't update`)
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

test('filterByType', t => {
  t.is(t.context.things.filterByType('bag').length, 2, `only 2 bags here`)
  t.is(t.context.things.filterByType('fruit').length, 3, `there should be 3 fruits, one not in the bag`)
  t.is(t.context.things.filterByType('vegetable').length, 5, `there should be 5 vegetables, 2 not in the bag`)

  const fruityBag = t.context.fruityBag
  t.is(fruityBag.filterByType('fruit').length, 2, `2 fruits in the fruity bag`)
  t.is(fruityBag.filterByType('vegetable').length, 0, `no vegetables in this bag`)

  const veggieBag = t.context.veggieBag
  t.is(veggieBag.filterByType('vegetable').length, 3, `3 vegetables in the bag`)
  t.is(veggieBag.filterByType('fruit').length, 0, `no fruits in this bag`)
})
