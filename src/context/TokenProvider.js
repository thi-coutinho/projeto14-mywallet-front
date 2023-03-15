import { createContext, useContext, useState } from "react";

const TokenContext = createContext()
const UpdateTokenContext = createContext()

export function useToken(){
    return useContext(TokenContext)
}

export function useSetToken(){
    return useContext(UpdateTokenContext)
}

export default function TokenProvider({ children }) {
    const localToken = localStorage.getItem("token")
    const name = localStorage.getItem("name")
    const [token, setToken] = useState({token: localToken || undefined, name: name || undefined} )



    return (
        <TokenContext.Provider value={token}>
            <UpdateTokenContext.Provider value={setToken}>
                {children}
            </UpdateTokenContext.Provider>
        </TokenContext.Provider>
    )
}