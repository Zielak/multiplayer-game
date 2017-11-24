import { Application } from 'pixi.js'
import Table from './table/table'

class Game {
  constructor() {
    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container.
    this.app = new Application(Game.width, Game.height)

    // The application will create a canvas element for you that you
    // can then insert into the DOM.
    document.body.appendChild(this.app.view)

    this.table = new Table()
    this.stage.addChild(this.table)
  }

  get stage() {
    return this.app.stage
  }
}

Game.width = 600
Game.height = 600

export default Game
