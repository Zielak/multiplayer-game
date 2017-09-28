import test from 'ava'
import {
  getAllParents
} from '../../../client/cardsGame/utils'
import uuid from 'uuid/v4'

test.beforeEach('prepare elements', t => {
  t.context.elements = []
  const elements = t.context.elements
  elements.push({
    name: 'root', id: uuid()
  })
  elements.push({
    name: 'parentA', id: uuid(), parent: elements[0].id
  })
  elements.push({
    name: 'parentB', id: uuid(), parent: elements[0].id
  })
  elements.push({
    name: 'childOfA', id: uuid(), parent: elements[1].id
  })
  elements.push({
    name: 'childOfB', id: uuid(), parent: elements[2].id
  })
  elements.push({
    name: 'nestedChildOfA', id: uuid(), parent: elements[3].id
  })
})

test('returns empty array for root', t => {
  t.deepEqual(getAllParents(t.context.elements, t.context.elements[0]).length, 0)
})

test('1 element for parentA', t => {
  t.deepEqual(
    getAllParents(t.context.elements, t.context.elements[1]).length, 1,
    `didn't had exactly one parent element`
  )

  t.deepEqual(
    getAllParents(t.context.elements, t.context.elements[1]),
    [t.context.elements[0]],
    `didn't return root element`
  )
})

test('1 element for parentB', t => {
  t.deepEqual(
    getAllParents(t.context.elements, t.context.elements[2]).length, 1,
    `didn't had exactly 1 parent element`
  )

  t.deepEqual(
    getAllParents(t.context.elements, t.context.elements[2])[0],
    t.context.elements[0],
    `didn't return root element`
  )
})

test('2 element for childOfA', t => {
  t.deepEqual(
    getAllParents(t.context.elements, t.context.elements[3]).length, 2,
    `didn't had exactly 2 parent elements`
  )
  t.deepEqual(
    getAllParents(t.context.elements, t.context.elements[3])[0],
    t.context.elements[0],
    `first element wasn't root`
  )
  t.deepEqual(
    getAllParents(t.context.elements, t.context.elements[3])[1],
    t.context.elements[1],
    `second element wasn't parentA`
  )
})

test('2 element for childOfB', t => {
  t.deepEqual(
    getAllParents(t.context.elements, t.context.elements[4]).length, 2,
    `didn't had exactly 2 parent elements`
  )
  t.deepEqual(
    getAllParents(t.context.elements, t.context.elements[4])[0],
    t.context.elements[0],
    `first element wasn't root`
  )
  t.deepEqual(
    getAllParents(t.context.elements, t.context.elements[4])[1],
    t.context.elements[2],
    `second element wasn't parentB`
  )
})

test('nestedChildOfA', t => {

  t.deepEqual(
    getAllParents(t.context.elements, t.context.elements[5]).length, 3,
    `didn't had exactly 3 parent elements`
  )

  t.deepEqual(
    getAllParents(t.context.elements, t.context.elements[5])[0],
    t.context.elements[0],
    `first element wasn't root`
  )

  t.deepEqual(
    getAllParents(t.context.elements, t.context.elements[5])[1],
    t.context.elements[1],
    `second element wasn't parentA`
  )
  
  t.deepEqual(
    getAllParents(t.context.elements, t.context.elements[5])[2],
    t.context.elements[3],
    `third element wasn't childOfA`
  )
})
