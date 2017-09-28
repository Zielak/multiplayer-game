import test from 'ava'
import * as utils from '../../../rooms/cardsGame/utils'

test('exists', t => {
  t.deepEqual(utils.exists(), false, `literally nothing passed to function`)

  t.deepEqual(utils.exists(undefined), false, `just undefined`)

  t.deepEqual(utils.exists(null), true, `purposefully left empty`)

  const o = {
    stillNothing: undefined,
    emptyString: '',
    something: 1243
  }
  t.deepEqual(utils.exists(o.nothing), false, `not defined property of object`)
  t.deepEqual(utils.exists(o.stillNothing), false, `defined 'undefined' in object`)
  t.deepEqual(utils.exists(o.emptyString), true, `empty string`)
  t.deepEqual(utils.exists(o.something), true, `emptysome number`)
})
