import React from 'react'
import "./style.css"

import { GrLocation } from "react-icons/gr"
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai"
import { TbDeviceLandlinePhone } from "react-icons/tb"
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { motion } from "framer-motion"
const Footer = () => {

  return (
    <>

      <motion.hr whileInView={{ marginLeft: '0' }} style={{ margin: '0', color: 'black', marginLeft: '100%', transition: 'all 1s' }} />
      <div className="wave-container">
        <div id="footer">
          <div className="address">
            <h2>MRP DIAMONDS</h2>
            <div className="box">
              <GrLocation />
              <p>NEAR GIRDHAR CIRCLE NEAR VED VESU SURAT - 395678</p>
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
              <p><a href="mailto:">mrpdiamond45@gmail.com</a></p>
            </div>
          </div>

          <div className="social">
            <h2>FOLLOW US !</h2>
            <div className="up">
              <a href="">
                <button className="card1">
                  <FaFacebook className='facebook' style={{ color: " #3b5998" }} />
                </button>
              </a>
              <a href="">
                <button className="card2">
                  <FaTwitter className='twitter' style={{ color: '#00acee' }} />
                </button>
              </a>


            </div>
            <div className="down">

              <a href="">
                <button className="card3">
                  <FaLinkedin className='linkedin' style={{ color: '#0A66C2' }} />
                </button>
              </a>

              <a href="">
                <button className="card4">
                  <FaInstagram className='instagram' style={{ color: "#E1306C" }} />
                </button>
              </a>

            </div>
          </div>
          <div className="feedback">

            <h2>FEEDBACK !</h2>
            <div className="subscribe">
              <p>Write here...</p>
              <input placeholder="Give your feedback !" className="subscribe-input" name="email" type="text" />
              <br />
              <div className="submit-btn">SUBMIT</div>
            </div>
          </div>
        </div>





        <p style={{ textAlign: 'center', fontSize: '1.1 rem' }}>&copy; 2023 MRP DIAMONDS All right reserved</p>


        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </>
  )
}

export default Footer
