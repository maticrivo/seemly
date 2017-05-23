import 'isomorphic-fetch'
import io from 'socket.io-client'

const dashboard = (style = {}) => (DashboardComponent) => {
  return class Dashboard extends React.Component {
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
        <DashboardComponent {...this.state} style={{
          display: 'grid',
          gridGap: '10px',
          padding: '10px',
          height: '100vh',
          width: '100vw',
          ...style
        }} />
      )
    }
  }
}

export default dashboard
