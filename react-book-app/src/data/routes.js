import Login from "../pages/Login"
import Registration from "../pages/Registration"
import User from "../pages/User"

export const authRoutes = [
    
]

export const publicRoutes = [
    {
        path: "login",
        component: Login
    },
    {
        path: "registration",
        component: Registration
    },
    {
        path: "user",
        component: User
    }
]