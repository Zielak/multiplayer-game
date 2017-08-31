const React = require('react')
const PropTypes = require('prop-types')
// const ReactDOM = require('react-dom')

class ClientsList extends React.Component {

  render() {
    return (
      <div className="">
        <h3>Clients</h3>
        {this.renderList()}
      </div>
    )
  }

  renderList() {
    return (
      this.props.clients.map((client) => {
        return this.renderClient(client)
      })
    )
  }

  renderClient(props) {
    return (
      <div name={props.name} id={`client_${props.key}`}>
        {props.key}. {props.name}
      </div>
    )
  }

}

ClientsList.propTypes = {
  clients: PropTypes.array
}

module.exports = ClientsList
