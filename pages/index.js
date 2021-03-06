import get from 'lodash/get'

import dashboard from '../lib/dashboard'
import Title from '../widgets/Title'

@dashboard()
class Index extends React.Component {
  render () {
    return (
      <div style={this.props.style}>
        <Title
          title={get(this.props, 'title.data.title', 'Welcome to Seemly')}
          subtitle={get(this.props, 'title.data.subtitle', 'Extremly flexible and easy to use dashboard')}
        />
      </div>
    )
  }
}

export default Index
