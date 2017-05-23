import 'isomorphic-fetch'
import io from 'socket.io-client'
import get from 'lodash/get'

import Dashboard from '../lib/dashboard'
import Title from '../widgets/Title'

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    let apiUrl
    if (req) {
      apiUrl = `http${req.headers.secure ? 's' : ''}://${req.headers.host}`
    } else {
      apiUrl = `${window.location.protocol}//${window.location.host}`
    }

    const res = await fetch(`${apiUrl}/api/widgets`)
    const data = await res.json()
    return { data }
  }

  constructor (props) {
    super(props)

    this.state = props.data

    this.recieveData = this.recieveData.bind(this)
  }

  componentDidMount () {
    this.socket = io('http://localhost:3000/')

    this.socket.on('refresh', () => { window.location.reload() })
    this.socket.on('data', this.recieveData)
  }

  recieveData ({ widget, data }) {
    this.setState({
      [widget]: data
    })
  }

  render () {
    return (
      <Dashboard>
        <Title
          title={get(this.state, 'title.data.title', 'Welcome to Seemly')}
          subtitle={get(this.state, 'title.data.subtitle', 'Extremly flexible and easy to use dashboard')}
        />
      </Dashboard>
    )
  }
}
