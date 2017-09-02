const React = require('react')
const PropTypes = require('prop-types')

class ClientsList extends React.Component {

  render() {
    return (
      <div className="">
        <h3>{this.props.title}</h3>
        {this.renderList()}
      </div>
    )
  }

  renderList() {
    return (
      this.props.clients.map((client) => {
        return <div key={client.idx}>
          {client.idx}. {client.name}
        </div>
      })
    )
  }

}

ClientsList.propTypes = {
  clients: PropTypes.array,
  title: PropTypes.string,
}

module.exports = ClientsList
