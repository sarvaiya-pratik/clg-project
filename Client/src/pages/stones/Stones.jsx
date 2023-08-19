import React, { Suspense, useEffect } from 'react'
import "./style.css"
import Header from '../../common/Header/Header'
import Footer from '../../common/Footer/Footer'

import axios from 'axios'
import { BsCartPlus } from "react-icons/bs"
import { NavLink } from "react-router-dom"
import { useCart } from "react-use-cart"

const ImgDiamond = React.lazy(() => import("./ImgDiamond"))
const Stones = ({ data }) => {

  const { addItem } = useCart()
  const handleAddtoCart = (product) => {
    addItem(product)
  }
  
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
                return (


                  <div className='diamond-card' key={index}>
                    {/* <Suspense fallback={<h2 style={{zIndex:'111'}}>Hii this is loading</h2>}>
                      <ImgDiamond sixty={item.threesixty}/>
                      </ Suspense> */}
                

                      <iframe  src={item.threesixty} loading="lazy" width="300px" height="300px" alt="Error" ></iframe>

      
                    {/* <video src={item.threesixty} width="300px" height="300px" /> */}
                    <div className="card-body">
                      <NavLink to={`/stones/${item._id}`}>
                        <h5>{item.title}</h5>
                        <hr />
                        <p style={{ textAlign: 'center', fontWeight: '600', color: "green" }}>{item.price} $</p>
                        <div className="mid">
                          <p>T:{item.table}%</p>  <p>D:{item.depth}%</p>  <p>R:{item.ratio}%</p>
                        </div>
                      </NavLink>
                      <hr />
                      <button className='addToCart' onClick={() => handleAddtoCart(item)}><BsCartPlus />Add To Cart</button>
                    </div>
                  </div>

                )
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
