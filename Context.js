import {useState, createContext} from "react"

const UserContext = createContext(null)

const [user, setUser] = useState({})

export default function UserContextProvider({children}) {
    return (
        <UserContext.Provider value={{user, setUser}}>
                      
        </UserContext.Provider>
    )
}