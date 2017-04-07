import Widget from '../lib/widget';

const Title = ({ title, style = {} }) => (
  <Widget style={style}>
    <h1>{title}</h1>
  </Widget>
);

export default Title;
