import React from 'react'
import PropTypes from 'prop-types'

import { PlayersList } from '../components'
import { Table } from '../cardsGame'

require('./game.scss')

class WarGame extends React.Component {

  render() {
    return (
      <div className='game'>
        <div className='flex header'>
          <div>
            <h1>WarGame</h1>
          </div>
          <div>
            <button onClick={() => this.props.testDealHandler()}>
              Test Deal
            </button>
          </div>
        </div>
        <Table
          players={this.props.players}
          cards={this.props.cards}
          containers={this.props.containers}
          eventHandlers={{
            cardPicked: this.props.cardPickedHandler,
            containerPicked: this.props.containerPickedHandler,
          }}
        ></Table>
        <PlayersList
          title='Players'
          players={this.props.players}
          host={this.props.host}
        ></PlayersList>
      </div>
    )
  }
}

WarGame.propTypes = {
  testDealHandler: PropTypes.func,
  cardPickedHandler: PropTypes.func,
  containerPickedHandler: PropTypes.func,

  players: PropTypes.object,
  cards: PropTypes.array,
  containers: PropTypes.array,

  host: PropTypes.string,
}

export default WarGame
