import React from "react";
import LoginPage from "./views/loginPage";
import ReactTable from "./views/Table";

const routes = [
    {
        name: "Login",
        path: "/",
        component: LoginPage,
    },
    {
        name: "LogTablein",
        path: "/table",
        component: ReactTable,
    },
];


export default routes;