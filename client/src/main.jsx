import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx"

import Home from "./pages/Home.jsx"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import Profile from "./pages/Profile.jsx"
import Welcome from "./pages/Welcome.jsx"
import MLB from "./pages/MLB.jsx"
import NBA from "./pages/NBA.jsx"
import NFL from "./pages/NFL.jsx"
import NHL from "./pages/NHL.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: < App/>,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/profile/:id",
                element: <Profile />
            },
            {
                path: "/welcome",
                element: <Welcome />
            },
            {
                path: "/mlb",
                element: <MLB />
            },
            {
                path: "/nba",
                element: <NBA />
            },
            {
                path: "/nfl",
                element: <NFL />
            },
            {
                path: "/nhl",
                element: <NHL />
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
)