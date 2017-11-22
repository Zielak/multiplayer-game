import { Application } from 'pixi.js'
import {
  combineReducers,
  createStore,
  Store // eslint-disable-line no-unused-vars
} from 'redux'

import Table from './table/table'

class Game {
  constructor({ reducers }) {
    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container.
    this.app = new Application(600, 600)

    // The application will create a canvas element for you that you
    // can then insert into the DOM.
    document.body.appendChild(this.app.view)

    this.table = new Table()

    this.store = createStore(combineReducers(
      Object.keys(reducers).map(key => reducers[key](this))
    ))
  }

  get stage() {
    return this.app.stage
  }
}

export default Game
