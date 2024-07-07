import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@mui/material'
import MUITheme from './utils/MUITheme.js'
import Login from './pages/main/Login.jsx';
import About from './pages/main/About.jsx';
import Volunteer from './pages/main/Volunteer.jsx';
import Home from './pages/main/Home.jsx';
import Institution from './pages/main/Institution.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import HomePage from './pages/dashboard/HomePage.jsx';
import Verification from './pages/dashboard/Verification.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/about',
        element:<About/>
      },
      {
        path: '/register',
        element:<Volunteer/>
      },
      {
        path: '/institution',
        element: <Institution/>
      }
    ]
  },
  {
    path:'/dashboard',
    element: <Dashboard/>,
    children: [
      {
        path:'/dashboard/',
        element: <HomePage/>
      },
      {
        path:'/dashboard/verification',
        element: <Verification/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={MUITheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
)
