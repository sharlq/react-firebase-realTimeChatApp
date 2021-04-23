import React from 'react'
import {auth} from "../../firebase"
const store = React.createCtonext()
export const useStore = () => {
    return useContext(store)
}

const StoreProvider = ({children}) => {

const signup =() => {
    return auth.GoogleAuthProvider()
}
    values={
        signup
    }
    return (
        <Context.Provider values={values}>
            {children}
        </Context.Provider>
    )
}

export default StoreProvider
