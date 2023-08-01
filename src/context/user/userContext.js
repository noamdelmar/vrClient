import React, { useState } from "react";

const UserContext = React.createContext({
    user: null,
    setUser: () => { }
})

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

const useMainContext = () => {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error('useContext must be used eithin a ContextProvider')
    }
    return context
}

export { useMainContext, ContextProvider }