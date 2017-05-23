import get from 'lodash/get'

import dashboard from '../lib/dashboard'

import Title from '../widgets/Title'
import Clock from '../widgets/Clock'

@dashboard({
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr',
  gridGap: '5px',
  padding: '5px'
})
class Demo extends React.Component {
  render () {
    return (
      <div style={this.props.style}>
        <Title
          title={get(this.props, 'title.data.title', 'Welcome to Seemly')}
          subtitle={get(this.props, 'title.data.subtitle', 'Extremly flexible and easy to use dashboard')}
          style={{
            gridColumn: '1 / span 2',
            gridRow: '1 / span 1'
          }}
        />
        <Clock
          timeFormat={get(this.props, 'clock.data.timeFormat', 'HH:mm:ss')}
          dateFormat={get(this.props, 'clock.data.dateFormat', 'MMMM Do YYYY')}
          timezone={get(this.props, 'clock.data.timezone')}
          showDate
          style={{
            gridColumn: '1 / span 1',
            gridRow: '2 / span 1',
            textAlign: 'center'
          }}
        />

        {this.props.children}
      </div>
    )
  }
}

export default Demo
