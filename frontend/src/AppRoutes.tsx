import { createBrowserRouter } from "react-router";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage";

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    index: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default AppRoutes;