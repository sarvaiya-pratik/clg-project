import React, { useEffect, useRef } from 'react'
import "./style.css"
import topbg from "./bg/video-diamond.mp4"
import { FaHandHoldingHeart, FaHandHoldingMedical, FaHandHoldingWater, FaHandHoldingUsd } from "react-icons/fa"
import { motion } from "framer-motion"
import { Cursor, Typewriter } from "react-simple-typewriter"
import About from '../about/About'
import Service from '../service/Service'
import Header from "../../common/Header/Header"
import Footer from "../../common/Footer/Footer"
import LocomotiveScroll from 'locomotive-scroll'

const Home = () => {

  const scrollRef = useRef(null)

  // useEffect(()=>{
  //   const scroll = new LocomotiveScroll({
  //     el:scrollRef.current,
  //     smooth:true,
  //   })
  // })


  const mypara = "STEIN GEMS is a prominent online diamond company specializing in the sale of exquisite diamonds. Our collection boasts a diverse array of diamond shapes, catering to varied preferences. To enhance your shopping experience, we offer 360-degree images that enable you to effortlessly examine our diamonds from every angle. We pride ourselves on providing flexible payment options, encompassing both secure online transactions and the convenience of cash on delivery. Our website's core focus revolves around facilitating seamless online transactions for uncut diamonds. "
  const words = mypara.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02 },
    }),
  }
  const child = {
    visible: {
      opacity: 1,
      x: 0,
    },
    hidden: {
      opacity: 0,
      x: 100,
    }
  }

  return (
    <>

      <div id="home" ref={scrollRef} className='scroll-container container-max' >
        {/* backgroud with title   */}
        <div className="top-bg">
          <video type="video/mp4" muted autoPlay loop ><source src={topbg}></source></video>
        </div>

        <div className='heading-banner' >
          <Typewriter
            words={[`${localStorage.getItem('uname') ? localStorage.getItem('uname').toUpperCase() : ""}${localStorage.getItem("uname") ? "," : ""} WELCOME TO STEIN GEMS`]}
            loop
            deleteDelay='100%'
          />
          <Cursor cursorColor='white' />
        </div>
        {/* End : backgroud with title  */}


        {/*Section : Facts of STEIN  */}

        <div className='second-banner'>
          <div className="main">
            <motion.div className="left">
              <motion.h2 initial={{ x: -200 }} whileInView={{ x: 0 }}>
                FACTS OF STEIN
              </motion.h2>
              <motion.p variants={container} initial="hidden" animate="visible">
                {
                  words.map((val, index) => {
                    return <motion.span variants={child} key={index}>{val}</motion.span>
                  })
                }
              </motion.p>

            </motion.div>
            <div className="right">
              <div className="box">
                <FaHandHoldingMedical />
                <h3>ELEGANCE</h3>
              </div>
              <div className="box">
                <FaHandHoldingWater />
                <h3>EXCELLENCE</h3>
              </div>
              <div className="box">
                < FaHandHoldingUsd />
                <h3>VALUE</h3>
              </div>

              <div className="box">
                <FaHandHoldingHeart />
                <h3>TRUST</h3>
              </div>
            </div>
          </div>
        </div>

        {/* End : facts of MRP  */}

      </div>
      <About />
      <Service />

    </>
  )
}
export default Home

