import widget from '../../lib/widget'

@widget
class Title extends React.Component {
  render () {
    return (
      <div style={this.props.style}>
        <h1>{this.props.title}</h1>
        {this.props.subtitle && <h2>{this.props.subtitle}</h2>}
      </div>
    )
  }
}

export default Title
