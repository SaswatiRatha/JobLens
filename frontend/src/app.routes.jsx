import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import Reports from "./features/interview/pages/Reports";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/interview",
        element: <Interview />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
