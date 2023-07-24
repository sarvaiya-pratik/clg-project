import React from 'react'
import "./style.css"
import ThreeSixty from "react-360-view";
import data from "./data.json"
import {BsCartPlus} from "react-icons/bs"

import { NavLink } from "react-router-dom"
const Stones = () => {

  return (
    <div id='stones'>
    
        <h2 className='heading'>MRP STONES</h2>
      

      <main>
        <div className="filter">
        </div>
        <div className="diamonds">
          {/* <iframe  src="https://loupe360.com/diamond/584371722/video" frameborder="0" width="300px" height="300px"></iframe> */}
          {
            data.map((item, index) => {
              return (<div className='diamond-card' key={index}>
                <iframe src={item[360]}  width="300px" height="300px"></iframe>
                <div className="card-body">
                  <NavLink to={`/stones/${item.stockid}`}>
                    <h5>{item.title}</h5>
                  </NavLink>
                  <hr />
                  <p style={{textAlign:'center',fontWeight:'600',color:"goldenrod"}}>{item.price} $</p>
                  <div className="mid">
                    <p>T:{item.Table}</p>  <p>D:{item.Depth}</p>  <p>R:{item.Ratio}</p>
                  </div>
                  <hr />
                  <button className='addToCart'><BsCartPlus/>Add To Cart</button>
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
