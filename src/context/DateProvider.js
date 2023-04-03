import { createContext, useContext, useState } from "react";

const DateContext = createContext()
const UpdateDateContext = createContext()

export function useDate(){
    return useContext(DateContext)
}

export function useSetDate(){
    return useContext(UpdateDateContext)
}

export default function DateProvider({ children }) {
    const CurrentMonth = (new Date()).toISOString().slice(5, 7)
    const CurrentYear = (new Date()).toISOString().slice(0, 4)
    const [date, setDate] = useState({month: CurrentMonth, year: CurrentYear} )



    return (
        <DateContext.Provider value={date}>
            <UpdateDateContext.Provider value={setDate}>
                {children}
            </UpdateDateContext.Provider>
        </DateContext.Provider>
    )
}