import { createContext, useContext, useState } from "react";

const LoadingContext = createContext()
const UpdateLoadingContext = createContext()

export function useLoading(){
    return useContext(LoadingContext)
}

export function useToggleLoading(){
    return useContext(UpdateLoadingContext)
}

export default function LoadingProvider({ children }) {

    const [loading, setLoading] = useState(false)

    function toggleLoading() {
        setLoading(l => !l)
    }


    return (
        <LoadingContext.Provider value={loading}>
            <UpdateLoadingContext.Provider value={toggleLoading}>
                {children}
            </UpdateLoadingContext.Provider>
        </LoadingContext.Provider>
    )
}