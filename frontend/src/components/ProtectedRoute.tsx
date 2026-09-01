import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const userLoginString = localStorage.getItem('userLoginSuccess');

  return (
    <div>
      {userLoginString ? <Outlet /> : <Navigate to='/login' replace />}
    </div>
  )
};

export default ProtectedRoute;