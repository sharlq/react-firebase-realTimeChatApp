import React from 'react'

const store = React.createCtonext()
export const useStore = () => {
    return useContext(store)
}

const StoreProvider = ({children}) => {


    values={

    }
    return (
        <Context.Provider values={values}>
            {children}
        </Context.Provider>
    )
}

export default StoreProvider
