import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './index.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import {AuthContextProvider, useAuthContext } from './context/authContext';

const App = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <Outlet />
      {user ? <Navigate to="/" /> : <Navigate to="/login" />}
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <RouterProvider router={appRouter} />
    <Toaster /> 
  </AuthContextProvider>
);
