import React, { useEffect } from 'react'
import "./style.css"
import { useState } from 'react'
import axios from 'axios'
import { BsCartPlus } from "react-icons/bs"

import { NavLink } from "react-router-dom"
const Stones = ({ data }) => {

  return (
    <div id='stones'>

      <h2 className='heading'>MRP STONES</h2>


      <main>
        <div className="filter">
        </div>
        <div className="diamonds">

          {
            data.map((item, index) => {
              return (<div className='diamond-card' key={index}>
                <iframe src={item[360]} width="300px" height="300px"></iframe>
                <div className="card-body">
                  <NavLink to={`/stones/${item.stockid}`}>
                    <h5>{item.title}</h5>
                    <hr />
                    <p style={{ textAlign: 'center', fontWeight: '600', color: "green" }}>{item.price} $</p>
                    <div className="mid">
                      <p>T:{item.Table}</p>  <p>D:{item.Depth}</p>  <p>R:{item.Ratio}</p>
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
  )
}

export default Stones
