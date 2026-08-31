import { createBrowserRouter } from "react-router";
import Home from "./pages/Home/Home";

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    index: true,
  },
]);

export default AppRoutes;