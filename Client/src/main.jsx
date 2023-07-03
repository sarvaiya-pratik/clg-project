import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import { ThemeProvide } from './Global-Component/ThemeProvide.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
 

<ThemeProvide>

    <App />

</ThemeProvide>
 
    
)
