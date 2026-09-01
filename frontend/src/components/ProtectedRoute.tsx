import { Outlet } from "react-router";

// interface ProtectedRouteProps {
//   children: React.ReactNode
// }

const ProtectedRoute = () => {
  return (
    <div>
      <Outlet />  
    </div>
  )
};

export default ProtectedRoute;