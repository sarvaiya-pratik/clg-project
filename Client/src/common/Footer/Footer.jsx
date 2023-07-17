import React from 'react'
import "./style.css"

import { GrLocation } from "react-icons/gr"
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai"
import { TbDeviceLandlinePhone } from "react-icons/tb"
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import {motion} from "framer-motion"
const Footer = () => {

  return (
<>


<motion.hr whileInView={{marginLeft:'0'}}  style={{margin:'0',color:'black',marginLeft:'100%',transition:'all 1s'}} />
    <div class="wave-container">
      <div id="footer">

        <div className="address">
          <h2>MRP DIAMONDS</h2>
          <div className="box">
            <GrLocation />
            <p>NEAR GIRDHAR CIRCLE VESU SURAT - 395678</p>
          </div>
          <div className="box">
            <AiOutlinePhone />
            <p>91+ 9328361924</p>
          </div>
          <div className="box">
            <TbDeviceLandlinePhone />
            <p>91+ 0228-5678</p>
          </div>
          <div className="box">
            <AiOutlineMail />
            <p><a href="">mrpdiamond45@gmail.com</a></p>
          </div>
        </div>

        <div className="social">
          <h2>SOCIAL MEDIA</h2>
          <div className="box">
            <FaFacebook />
            <p><a href="">Facebook</a></p>
          </div>
          <div className="box">
            <FaInstagram />
            <p><a href="">Instagram</a></p>
          </div>
          <div className="box">
            <FaTwitter />
            <p><a href="">Twitter</a></p>
          </div>
          <div className="box">
            <FaLinkedin />
            <p><a href="">Liked In</a></p>
          </div>
        </div>
      </div>
      <p style={{textAlign:'center',fontSize:'1.1 rem'}}>&copy; 2023 MRP DIAMONDS All right reserved</p>


      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
    </div>
    </>
  )
}

export default Footer
