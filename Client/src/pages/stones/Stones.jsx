import React, { useEffect } from 'react'
import "./style.css"
import Header from '../../common/Header/Header'
import Footer from '../../common/Footer/Footer'
import { useState } from 'react'
import axios from 'axios'
import { BsCartPlus } from "react-icons/bs"
import { NavLink } from "react-router-dom"
const Stones = ({ data }) => {
  return (
    <>
      <Header />
      <div id='stones'>
        <h2 className='heading'>MRP STONES</h2>

        <main>
          <div className="filter">
          </div>
          <div className="diamonds">

            {
              data.map((item, index) => {
                return (<div className='diamond-card' key={index}>
                  <iframe src={item.threesixty} width="300px" height="300px" alt="Error"></iframe>
                  <div className="card-body">
                    <NavLink to={`/stones/${item._id}`}>
                      <h5>{item.title}</h5>
                      <hr />
                      <p style={{ textAlign: 'center', fontWeight: '600', color: "green" }}>{item.price} $</p>
                      <div className="mid">
                        <p>T:{item.table}</p>  <p>D:{item.depth}</p>  <p>R:{item.ratio}</p>
                      </div>
                    </NavLink>
                    <hr />
                    <button className='addToCart'><BsCartPlus />Add To Cart</button>
                  </div>
                </div>)
              })
            }
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Stones
