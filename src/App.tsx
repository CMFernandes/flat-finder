import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"


import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthContextProvider } from "./context/authContext/AuthContextProvider"

import SignUp from "./pages/SignUpForm";
import Login from "./pages/LoginForm";
import Flats from "./pages/Home";
import FlatForm from "./pages/FlatForm";
import MyFlats from "./pages/MyFlats";
import { FlatsContextProvider } from "./context/flatsContext/FlatsContextProvider";
import useAuthContext from "./hooks/useAuthContext";
import { CircularProgress } from "@mui/material";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import FavouriteFlats from "./pages/FavouriteFlats";
import FlatView from "./pages/FlatView";
import Unauthorized from "./pages/Unauthorized";
import NotFoundPage from "./pages/NotFoundPage";
import { JSX } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main:"rgb(255, 90, 95)",
    },
    
    text: {
      primary: "rgb(72, 72, 72)",
      secondary:"rgb(118, 118, 118)"
    
    },
    background: {
      default: "#fff",
    }
  },
});

const PrivateRoute = ({element }: { element: JSX.Element }) => {
  const {hasLoggedIn, isLoading} = useAuthContext();

  if (isLoading) {
    return <CircularProgress color="primary" />
  }

  return hasLoggedIn ? element : <Navigate to="/login" />;
}

const AdminRoute = ({element}: { element: JSX.Element }) => {
  const {currentUser, isLoading} = useAuthContext();

  if (isLoading) {
    return <CircularProgress color="primary" />
  }

  if(currentUser?.role === "user" || currentUser === null) {
    return <Navigate to="/unauthorized" />
  }else {
    return element
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/flats",
        element: <Flats />,
      },
      {
        path: "/flat/:flatId",
        element: <FlatView />,
      },
      {
        path: "/flat-form",
        element: <PrivateRoute element={<FlatForm />} />
      },
      {
        path: "/my-flats",
        element: <PrivateRoute element={<MyFlats />} />
      },
      {
        path: "/profile/:userId",
        element: <PrivateRoute element={<Profile />} />
      },
      {
        path: "/favourite-flats",
        element: <PrivateRoute element={<FavouriteFlats />} />
      },
      {
        path: "/dashboard",
        element: <AdminRoute element={<AdminDashboard />}/>
      },
      {
        path:"/unauthorized",
        element: <Unauthorized />
      },
      {
        path: "*",
        element: <NotFoundPage />, 
      },
    ]
  }
])

function App() {
  return (
    <AuthContextProvider>
      <FlatsContextProvider>
        <ThemeProvider theme={theme}>
          < RouterProvider router={router} />
        </ThemeProvider>
      </FlatsContextProvider>
    </AuthContextProvider>
  )
}

export default App
