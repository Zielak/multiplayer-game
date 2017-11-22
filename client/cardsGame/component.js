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
  constructor(props) {
    super()
    this.props = props
  }

  set props(value) {
    const newProps = Object.assign({}, value)
    this.willReceiveProps(newProps)
    this.props = newProps
    this.didReceiveProps(newProps)
  }

  willReceiveProps(props) { } // eslint-disable-line no-unused-vars
  didReceiveProps(props) { } // eslint-disable-line no-unused-vars

}

export default Component
