import React, {lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestrauntMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";


const Grocery = lazy(() => import("./components/Grocery"));
const About = lazy(() => import("./components/About"));



const AppLayout = () => {
    const [userName, setuserName] = useState();

    useEffect(() => {
        const data = {
            name: "Sumit Kumar Mishra",
        };
        setuserName(data.name);
    },[]);

    return (
        <UserContext.Provider value = {{loggedInUser: userName, setuserName}}>
        <div className="app">
            <Header />
            <Outlet/>
            </div>
        </UserContext.Provider>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                path: "/",
                element: <Body/>
            },
            {
                path: "/about",
                element: <Suspense fallback = {<h1>Loading...</h1>} >
                    <About />
                </Suspense>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/grocery",
                element: <Suspense fallback = {<h1>Loading...</h1>} >
                    <Grocery />
                </Suspense>
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu/>
            },
        ],
        errorElement: <Error/>
    },
    
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router = {appRouter}/>);