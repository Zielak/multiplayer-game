const React = require('react')
const PropTypes = require('prop-types')

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
      this.props.clients.map((client, idx) => {
        return this.renderClient(client, idx)
      })
    )
  }

  renderClient(props, key) {
    return (
      <div key={key} name={props.name} id={`client_${props.idx}`}>
        {props.idx}. {props.name}
      </div>
    )
  }

}

ClientsList.propTypes = {
  clients: PropTypes.array
}

module.exports = ClientsList
