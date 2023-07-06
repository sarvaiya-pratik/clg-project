import React from 'react'
import "./style.css"

const Home = ({setLoginUser}) => {
  return (
    <div id="home">
        <h2>Welcome to Home page</h2>
        <button onClick={()=>setLoginUser("")}>Logout</button>
    </div>
  )
}

export default Home
