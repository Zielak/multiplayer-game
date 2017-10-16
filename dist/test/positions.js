
const rad2deg = (angle) => {
  return angle * 57.29577951308232 // angle / Math.PI * 180
}

const deg2rad = (angle) => {
  return angle * 0.017453292519943295 // (angle / 180) * Math.PI;
}

const translatePoint = (point, offset) => {
  return {
    x: point.x + offset.x,
    y: point.y + offset.y,
  }
}

const rotatePoint = (point, origin, angle = 0) => {
  angle -= 90

  const x1 = point.x - origin.x
  const y1 = point.y - origin.y

  const x2 = x1 * Math.cos(deg2rad(angle)) - y1 * Math.sin(deg2rad(angle))
  const y2 = x1 * Math.sin(deg2rad(angle)) + y1 * Math.cos(deg2rad(angle))

  return {
    x: x2 + origin.x,
    y: y2 + origin.y,
  }
}




const Box = props => (
  <div className="box" style={{
    '--x': props.x + '%',
    '--y': props.y + '%',
    '--angle': props.angle + 'deg',
  }}>
    <p><strong>{props.name}</strong></p>
    <div style={{fontSize: '12px'}}>angle: {props.angle}<br/>x: {props.x}<br/>y: {props.y}</div>
  </div>
)

const Container = props => (
  <div>
    <div>container here</div>
    {props.children}
  </div>
)

const boxes = [
  { name: 'A', x: 5, y: 10, angle: 0 },
  { name: 'B', x: 50, y: 70, angle: 0 },
  { name: 'C', x: 20, y: 80, angle: 0 },
  { name: 'D', x: 60, y: 25, angle: 0 },

  { name: 'B1', y: 10, parent: 'B' },
]
  .map(box => {
    // Provide defaults
    box.x = typeof box.x === 'undefined' ? 0 : box.x
    box.y = typeof box.y === 'undefined' ? 0 : box.y
    box.angle = typeof box.angle === 'undefined' ? 0 : box.angle
    return box
  })
  .map((box, idx) => ({ ...box, key: idx }))
  .map(box => <Box {...box} />)

ReactDOM.render(
  <Container>
    {boxes}
  </Container>,
  document.getElementById('container')
)