import {Routes, Route} from "react-router-dom"
import { publicRoutes } from "../data/routes"

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(route => 
                <Route key={route.path} path={route.path} element={<route.component/>}/>    
            )}
        </Routes>
    )
}

export default AppRouter