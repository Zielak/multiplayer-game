const utils = require('../utils')

module.exports = function () {
  return {
    execute: (object, target) => {
      // TODO: Some event would be nice here...
      const targetParent = typeof target === 'string' ?
        utils.getById(target) :
        utils.getById(target.id)
      
      targetParent
      
      console.log('Moved', object.id, 'to', target.id)
    }
  }
}
