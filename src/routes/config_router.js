import React from 'react'
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
// import Header from '../components/Header';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import ManageUser from '../components/ManageUser';
import ManageJob from '../components/ManageJob';
// import ManagementPage from '../pages/ManagementPage';
// import ManageMovie from '../components/ManageMovie';
// import ManageUser from '../components/ManageUser';
// import DetailPage from '../pages/DetailPage';
// import TheatrePage from '../pages/TheatrePage';
// import ListSeat from '../components/ListSeat';
// import AppPage from '../pages/AppPage';

// import DetailPage from '../pages/DetailPage';
// import TheaterPage from '../pages/TheaterPage';
// import ListSeats from '../components/ListSeats';

function useRouteCustom() {

    const routes=useRoutes([
      {
        path:"/",
        element:<HomePage/>,

        children:[
        {
            path:"users",
            element:<ManageUser/>
        },
        {
            path:"jobs",
            element:<ManageJob/>
        },
        {
          path:"*",
          element:<ManageUser/>
      }
         ]
      },
    //   {
    //     path:"/management",
    //     element:<ManagementPage/>,
    //     children:[
    //             {
    //               path:"user",
    //               element:<ManageMovie/>
    //             },
    //             {
    //               path:"movie",
    //               element:<ManageUser/>
    //             },
    //             {
    //               path:"*",
    //               element:<ManageUser/>
    //             }
    //         ]

    //   },
    //   {
    //     path:"/detail/:tenPhim",
    //     element:<DetailPage/>
    //   },
    //   {
    //     path:"/theatre",
    //     element:<TheatrePage/>,
    //     children:[
    //             {
    //               path:"book_ticket/:maLichChieu",
    //               element:<ListSeat/>
    //             }
    //         ]
    //   },
    //   {
    //     path:"/apps",
    //     element:<AppPage/>,
    //   },
      // {
      //   path:"/film",
      //   element:<ErrorPage/>
      // },
   
    //   {
    //     path:"/theater",
    //     element:<TheaterPage/>,
    //     children:[
    //       {
    //         path:"book_ticket/:maLichChieu",
    //         element:<ListSeats/>
    //       }
    //   ]
    //   },
      // {
      //   path:"/management",
      //   element:<ManagementPage/>,
      // },
      {
        path:"*",
        element:<ErrorPage/>
      }
  ])
  return  routes;
}

export default useRouteCustom