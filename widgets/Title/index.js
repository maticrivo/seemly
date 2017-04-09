import Widget from '../../lib/widget';

const Title = ({ title, subtitle, style = {} }) => (
  <Widget style={style}>
    <h1>{title}</h1>
    {subtitle && <h2>{subtitle}</h2>}
  </Widget>
);

export default Title;
