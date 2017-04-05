const io = require('socket.io-client');

export default class extends React.Component {
  static async getInitialProps({ req }) {
    return req
      ? { userAgent: req.headers['user-agent'] }
      : { userAgent: navigator.userAgent };
  }

  componentDidMount() {
    this.socket = io();
  }

  render() {
    return (<div>
      Hello World {this.props.userAgent}
    </div>);
  }
}
