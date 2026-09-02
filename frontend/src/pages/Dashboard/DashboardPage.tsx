import { Outlet, useLocation } from "react-router";
import DashboardNav from "./DashboardNav";

const DashboardPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const dashboardComponents = () => <>  
    <h1>Dashboard</h1>
  </>

  return (
    <div>
      <DashboardNav />
      {currentPath == '/dashboard' ? dashboardComponents() : <Outlet />}
    </div>
  )
};

export default DashboardPage;