import LoginPage from "./views/logIn";
import SignUp from "./views/signUp";

const routes = [
    {
        name: "SignUp",
        path: "/signup",
        component: SignUp,
    },
    {
        name: "login",
        path: "/login",
        component: LoginPage,
    },
];


export default routes;