import PropTypes from 'prop-types'
import {
  Game//, Table
} from '../cardsGame/index'

require('./game.scss')

class WarGame extends Game {

  constructor({ players, cards, containers, host }) {
    super()
    this.players = players
    this.cards = cards
    this.containers = containers
    this.host = host
  }

  render() {
    // return (
    //   <div className='game'>
    //     <div className='flex header'>
    //       <div>
    //         <h1>WarGame</h1>
    //       </div>
    //       <div>
    //         <button onClick={() => this.props.testDealHandler()}>
    //           Test Deal
    //         </button>
    //       </div>
    //     </div>
    //     <Table
    //       players={this.props.players}
    //       cards={this.props.cards}
    //       containers={this.props.containers}
    //       eventHandlers={{
    //         cardPicked: this.props.cardPickedHandler,
    //         containerPicked: this.props.containerPickedHandler,
    //       }}
    //     ></Table>
    //     <PlayersList
    //       title='Players'
    //       players={this.props.players}
    //       host={this.props.host}
    //     ></PlayersList>
    //   </div>
    // )
  }
}

WarGame.propTypes = {
  testDealHandler: PropTypes.func,

  players: PropTypes.object,
  cards: PropTypes.array,
  containers: PropTypes.array,

  host: PropTypes.string,
}

export default WarGame
