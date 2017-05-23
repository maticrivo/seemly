import moment from 'moment-timezone'

import widget from '../../lib/widget'

@widget
class Clock extends React.Component {
  constructor (props) {
    super(props)

    this.clockTick = this.clockTick.bind(this)

    this.state = {
      now: moment()
    }
  }

  componentDidMount () {
    this.interval = setInterval(this.clockTick, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  clockTick () {
    this.setState({
      now: moment()
    })
  }

  render () {
    const { now } = this.state
    const { timeFormat, dateFormat, showDate, timezone } = this.props
    const time = timezone ? now.tz(timezone) : now

    return (
      <div style={this.props.style}>
        {showDate && <h2>{time.format(dateFormat)}</h2>}
        <h1>{time.format(timeFormat)}</h1>
      </div>
    )
  }
}

export default Clock
