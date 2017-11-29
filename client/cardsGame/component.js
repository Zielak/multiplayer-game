import { Container } from 'pixi.js'

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

    const willReceiveProps = this.willReceiveProps.bind(this)
    const didReceiveProps = this.didReceiveProps.bind(this)

    this.props = new Proxy(this._props, {
      set: (target, prop, value) => {
        const newProps = { ...target }
        newProps[prop] = value
        willReceiveProps(newProps)
        target[prop] = value
        didReceiveProps(target)
        return true
      }
    })

    // TODO: ? what if whole props will be overriden?
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

  // set props(value) {
  //   const newProps = Object.assign({}, value)
  //   this.willReceiveProps(newProps)
  //   this._props = newProps
  //   this.didReceiveProps(newProps)
  // }

  willReceiveProps(props) { } // eslint-disable-line no-unused-vars
  didReceiveProps(props) { } // eslint-disable-line no-unused-vars

}

export default Component
