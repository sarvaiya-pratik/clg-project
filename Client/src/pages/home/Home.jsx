import React from 'react'
import "./style.css"
import img1 from "./bg/img1.jpg"
import img2 from "./bg/img2.jpg"

import { useThemeHook } from '../../Global-Component/ThemeProvide'
const Home = ({setLoginUser}) => {
  const theme = useThemeHook()
  return (
    <div id="home">

       <div className="top-bg">
    
       </div>
       <div className='heading-banner'>
            <h2>WELCOME TO</h2>
            <h3>MRP DIAMOND EXPORTS</h3>
         </div>
    </div>
  )
}

export default Home
