import { createBrowserRouter } from "react-router";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import QuizPage from "./pages/Quiz/QuizPage";

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
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
        children: [
          {
            path: 'quiz',
            element: <QuizPage />,
          }
        ]
      }
    ]
  }
]);

export default AppRoutes;