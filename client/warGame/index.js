const React = require('react')
const PropTypes = require('prop-types')

const {PlayersList} = require('../components')
const {Table} = require('../cardsGame')

// require('./styles.scss')

class Cards extends React.Component {

  render() {
    return (
      <div>
        <div className="flex">
          <div>
            <button onClick={()=>this.props.initGameHandler()}>
              Maybe START?
            </button>
          </div>
          <div>
            <button onClick={()=>this.props.testScoreHandler(1)}>
              + 1
            </button>
            <button onClick={()=>this.props.testScoreHandler(-1)}>
              - 1
            </button>
            {this.props.testScore}
          </div>
          <PlayersList
            title='Players'
            players={this.props.players}
            host={this.props.host}
          ></PlayersList>
        </div>
        <Table
          players={this.props.players}
          cards={this.props.cards}
          containers={this.props.containers}
        ></Table>
      </div>
    )
  }
}

Cards.propTypes = {
  initGameHandler: PropTypes.func,
  testScoreHandler: PropTypes.func,

  players: PropTypes.object,
  cards: PropTypes.array,
  containers: PropTypes.array,

  host: PropTypes.string,
  testScore: PropTypes.number,
}

module.exports = Cards
