import React from "react";
import SamplePage from "./sample";

const routes = [
    {
        path: "/",
        component: ()=><div>Home Page</div>,
        title: "home",
    },
    {
        path: "/sample",
        component: SamplePage,
        title: "sample",
    },
  
];


export default routes;