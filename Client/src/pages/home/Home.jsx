import React from 'react'
import "./style.css"
import topbg from "./bg/video-diamond.mp4"
import {FaHandHoldingHeart,FaHandHoldingMedical,FaHandHoldingWater,FaHandHoldingUsd} from "react-icons/fa"



const Home = ({ setLoginUser }) => {

  return (
    <div id="home">

      <div className="top-bg">
        <video type="video/mp4" src={topbg} playsInline autoPlay loop mute ></video>
      </div>

      <div className='heading-banner'>
        <p>WELCOME TO</p>
        <p>MRP DIAMOND EXPORTS</p>
      </div>

      <div className='second-banner'>
        <div className="main">
            <div className="left">
              <h2>FACTS OF MRP</h2>
              <p>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, adipisci distinctio. Minima, tempora exercitationem! adipisicing elit. Illo quaerat odit labore sint voluptatibus expedita repellat cupiditate nulla beatae, nisi in voluptas quasi hic sit ipsum error dolorem accusantium consequatur, incidunt soluta. Quo, quaerat?</p>
            </div>
            <div className="right">
              <div className="box">
                  <FaHandHoldingMedical/>
                  <h3>ELEGANCE</h3>
              </div>
              <div className="box">
                  <FaHandHoldingWater/>
                  <h3>EXCELLENCE</h3>
              </div>
              <div className="box">
                  <FaHandHoldingHeart/>
                  <h3>VALUE</h3>
              </div>
              <div className="box">
                  <FaHandHoldingUsd/>
                  <h3>TRUST</h3>
              </div>
              
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home

