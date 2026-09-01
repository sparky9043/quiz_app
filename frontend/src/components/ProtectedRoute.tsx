import { Navigate, Outlet } from "react-router";
import type { UserLoginSuccessObject } from "../types/user";

let token: string;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
}

const ProtectedRoute = () => {
  const userLoginString = localStorage.getItem('userLoginSuccess');

  if (!userLoginString) {
    return <Navigate to='/login' replace />
  }

  const userLoginJSON = JSON.parse(userLoginString) as UserLoginSuccessObject;
  setToken(userLoginJSON.token);

  return (
    <div>
      <Outlet />
    </div>
  )
};

export default ProtectedRoute;