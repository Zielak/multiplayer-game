import { Container } from 'pixi.js'
// import PropTypes from 'prop-types'
import checkPropTypes from 'prop-types/checkPropTypes'

/**
 *
 *
 * @class Component
 * @extends {Container}
 */
class Component extends Container {

  /**
   * Creates an instance of Component.
   * @param {any} props
   * @memberof Component
   */
  constructor(props = {}) {
    super()
    this._props = { ...props }
    this._updateScheduled = false
  }

  _generatePropsProxy() {
    const myself = this
    this._propsProxy = new Proxy(this._props, {
      set: (target, prop, value, receiver) => {
        if (receiver[prop] === value) {
          return true
        }
        const newProps = { ...receiver }
        newProps[prop] = value
        checkPropTypes(myself.propTypes, newProps, 'prop', myself._componentName)
        receiver = newProps
        myself._scheduleUpdate(myself, receiver)
        return true
      }
    })
  }

  _scheduleUpdate(myself, receiver) {
    if (!this._updateScheduled) {
      this._updateScheduled = true
      console.log('update scheduled for later')
      setTimeout(() => {
        console.log('componentDidUpdate!')
        myself.componentDidUpdate.apply(myself, receiver)
        this._updateScheduled = false
      }, 0)
    }
  }

  get props() {
    if (!this._propsProxy) {
      this._generatePropsProxy()
    }
    return this._propsProxy
  }

  set props(newProps) {
    for (const prop in newProps) {
      this.props[prop] = newProps[prop]
    }
  }

  get _componentName() {
    return 'Component'
  }

  get idx() {
    return this.props.idx
  }
  get id() {
    return this.props.id
  }
  get type() {
    return this.props.type
  }

  componentDidUpdate(props) { } // eslint-disable-line no-unused-vars

}

export default Component
