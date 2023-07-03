import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import "./app.css"
import Header from "./common/Header/Header"
import Footer from "./common/Footer/Footer"
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import Fature from "./pages/fature/Fature"
import Login from "./pages/login/Login"
import Signup from "./pages/sign-up/Signup"
function App() {
  

  return (
    <>
    <Router>
    <Header/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/fature" element={<Fature/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>

        </Routes>

     <Footer/>

    </Router>
        
    </>
  )
}

export default App
