import test from 'ava'
// import sinon from 'sinon'
import Component from '../../../client/cardsGame/component'

test('gets proper value via props proxy', t => {
  const comp = new Component({ test: 'test1' })
  t.is(comp.props.test, 'test1')
  t.is(comp._props.test, 'test1')
})

test.skip('adds prop via proxy', t => {
  const comp = new Component({ test: 'test1' })
  comp.props.aaa = 'aaa'

  t.is(comp.props.aaa, 'aaa')
  t.is(comp.props.test, 'test1')
})
