import React from 'react'
import "./style.css"
import topbg from "./bg/video-diamond.mp4"
import { FaHandHoldingHeart, FaHandHoldingMedical, FaHandHoldingWater, FaHandHoldingUsd } from "react-icons/fa"
import { motion } from "framer-motion"
import { useTypewriter, Cursor, Typewriter } from "react-simple-typewriter"

const Home = ({ setLoginUser }) => {

const mypara = "Lorem ipsum, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, quisquam provident? Iure totam tempora beatae magnam. dolor sit amet Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, eum! consectetur adipisicing elit. Voluptatibus consequatur quae nulla."
const words =mypara.split("")

const container ={
  hidden:{opacity:0},
  visible:(i =1 )=>({
    opacity:1,
    transition : {staggerChildren : 0.02},
  }), 
}
const child={
  visible:{
    opacity:1,
    x:0,
  },
  hidden:{
    opacity:0,
    x:100,
  }
}
  return (
    <div id="home">

      <div className="top-bg">
        <video type="video/mp4" src={topbg} playsInline autoPlay loop mute ></video>
      </div>

      <div className='heading-banner'>
        <Typewriter
          words={["WELCOME TO MRP DIAMONDS"]}
          loop
          deleteDelay='100%'
        />


      </div>

      <div className='second-banner'>
        <div className="main">
          <motion.div className="left">
            <motion.h2 initial={{ x: -200 }} whileInView={{ x: 0 }}  >FACTS OF MRP</motion.h2>

            <motion.p 
            variants={container}
            initial="hidden"
            animate="visible"
            >
              {/* <p>Lorem ipsum dolor sit fuga incidunt nostrum possimus, sequi hic facere nihil magni laboriosam eligendi laborum ut nemo assumenda reprehenderit asperiores similique ipsam! Nisi voluptatem sunt possimus reprehenderit vel nesciunt similique harum non fuga necessitatibus at illum, enim ipsum? In consequatur quae dolorum eos deleniti ex laudantium ad unde harum tempore vero suscipit et, incidunt quo quam doloribus? Nulla?</p> */}

           {
            words.map((val,index)=>{
             return <motion.span variants={child} key={index}>{val}</motion.span>
            })
           }
            </motion.p>



          </motion.div>
          <div className="right">
            <div className="box"  
            
      
            >
              <FaHandHoldingMedical />
              <h3>ELEGANCE</h3>
            </div>
            <div className="box">
              <FaHandHoldingWater />
              <h3>EXCELLENCE</h3>
            </div>
            <div className="box">
              <FaHandHoldingHeart />
              <h3>VALUE</h3>
            </div>
            <div className="box">
              <FaHandHoldingUsd />
              <h3>TRUST</h3>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

