import { createContext,useState } from "react";

export const FirebaseContext = createContext(null)
export const AuthContext = createContext('')

function Context ({children}) {
    const [user,setUser] = useState('')
    console.log('contextttttt',user)
    return(
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}   

export default Context