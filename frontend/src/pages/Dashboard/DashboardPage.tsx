import { Link, Outlet, useLocation } from "react-router";

const DashboardPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const dashboardComponents = () => <>  
    <h1>Dashboard</h1>
  </>

  return (
    <div>
      <nav>
        <li>
          <Link to='quiz'>Quiz</Link>
        </li>
      </nav>
      {currentPath == '/dashboard' ? dashboardComponents() : <Outlet />}
    </div>
  )
};

export default DashboardPage;