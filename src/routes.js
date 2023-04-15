import React from "react";
import LoginPage from "./views/loginPage";
import ReactTable from "./views/Table";
import Components from "./views/terox";

const routes = [
    {
        name: "Login",
        path: "/login",
        component: LoginPage,
    },
    {
        name: "LogTable",
        path: "/table",
        component: ReactTable,
    },
    {
        name: "components",
        path: "/components",
        component: Components,
    },
    {
        name: "Dashboard",
        path: "/",
        // component: ReactTable,
    },
];


export default routes;