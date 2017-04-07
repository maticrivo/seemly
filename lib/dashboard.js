const Dashboard = ({ children, style = {} }) => (
  <div className="dashboard" style={style}>
    { children }

    <style jsx>{`
      .dashboard {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        grid-gap: 10px;
        height: 100vh;
        width: 100vw;
        padding: 10px;
      }
    `}</style>
  </div>
);

export default Dashboard;
