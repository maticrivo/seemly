const Widget = ({ children, style = {} }) => (
  <div className="widget" style={style}>
    { children }

    <style jsx>{`
      .widget {
        grid-column: 1 / span 1;
        grid-row: 1 / span 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid red;
      }
    `}</style>
  </div>
);

export default Widget;
