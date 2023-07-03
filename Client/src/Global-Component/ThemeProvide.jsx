import React from 'react'
import { createContext,useContext,useState,useEffect } from 'react'

const ThemeContext = createContext()

const ThemeProvide = ({children}) => {

    const [theme,setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || false)

  
    useEffect(()=>{
        localStorage.setItem('theme',JSON.stringify(theme))
    },[theme])

    const setThemeMode = (mode)=>{
        setTheme(mode)
    }
  return (
    <ThemeContext.Provider value={{theme,setThemeMode}}>
        {children}
    </ThemeContext.Provider>
  )
}

export const useThemeHook = ()=>{
    const {theme} = useContext(ThemeContext)
    return theme;
}

export { ThemeProvide,ThemeContext}

