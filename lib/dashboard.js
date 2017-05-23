const Dashboard = ({ children, style = {} }) => (
  <div className='dashboard' style={style}>
    { children }

    <style jsx>{`
      .dashboard {
        display: grid;
        grid-gap: 10px;
        padding: 10px;
        height: 100vh;
        width: 100vw;
      }
    `}</style>
  </div>
)

export default Dashboard
