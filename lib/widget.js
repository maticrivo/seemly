const Widget = ({ children, style = {} }) => (
  <div className='widget' style={style}>
    { children }

    <style jsx>{`
      .widget {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid red;
      }
    `}</style>
  </div>
)

export default Widget
