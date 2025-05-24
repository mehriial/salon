import MainLayout from "@/components/layout/mainLayout";
import Company from "@/pages/company";
import Employees from "@/pages/employees";
import Home from "@/pages/home";
import LoginPage from "@/pages/login";
import Profile from "@/pages/profile";
import RegisterPage from "@/pages/register";
import Settings from "@/pages/settings";
import Transaction from "@/pages/transaction";
import { Navigate } from "react-router-dom";


export const routes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'company',
        element: <Company />,
      },
      {
        path: 'transaction',
        element: <Transaction />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'employees',
        element: <Employees />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
