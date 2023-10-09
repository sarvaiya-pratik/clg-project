import { React, createContext, useContext, useState} from 'react'

export const RefreshContext = createContext(undefined)
 const RefreshContextProvider = ({children}) => {
const [refresh,setRefresh] = useState(true)
console.log("refesher"+refresh)
  return (
   <RefreshContext.Provider value={[refresh,setRefresh]}>
   {children}
   </RefreshContext.Provider>
  )
}

export default RefreshContextProvider

export const UseRefresher = () => {
    return useContext(RefreshContext)
}

