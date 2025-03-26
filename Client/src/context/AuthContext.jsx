import { useState, createContext } from "react";

export authContext = createContext()

export authContexProvider = ({children}) =>{



    return (
        <authContext.Provider value={}>{children}</authContext.Provider>
    )
}