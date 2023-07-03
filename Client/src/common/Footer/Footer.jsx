import React from 'react'
import "./style.css"
import { useThemeHook } from '../../Global-Component/ThemeProvide'

const Footer = () => {
  const theme = useThemeHook()
  return (
    
    <div id='footer'  className={`text-center ${theme?"bg-dark text-light":"bg-light text-dark"}`}>

      <h6>Copyright &copy; 2023 All Rights Reserved</h6>

    </div>
  )
}

export default Footer
