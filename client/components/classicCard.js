const React = require('react')
const PropTypes = require('prop-types')

require('./classicCard.scss')

class ClassicCard extends React.Component {
  
  render() {
    const face = <div className='face'>
      
    </div>
    const back = <div className='back'>
      
    </div>
    return (
      <div className='ClassicCard'>
        {this.props.faceUp ? face : back}
      </div>
    )
  }
  
}

ClassicCard.propTypes = {
  name: PropTypes.string,
  suit: PropTypes.string,
  rank: PropTypes.string,
  
  faceUp: PropTypes.bool,
  rotated: PropTypes.number,
  marked: PropTypes.bool,
}

module.exports = ClassicCard
