import React, { useEffect, useState } from 'react'
import "./style.css"
import Header from '../../common/Header/Header'
import Footer from '../../common/Footer/Footer'


import { BsCartPlus } from "react-icons/bs"
import { NavLink, useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-hot-toast'




const Stones = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()

  const handleAddtoCart = (product) => {
    const productId = product._id
    const token = localStorage.getItem("token")
    if (token) {
      axios.post("/cart/add", { productId, quantity }, { headers: { "Authorization": `Bearer ${token}` } })
        .then((r) => {
          console.log("res", r.data)
        })
    }
    else {
      navigate('/login')
      toast.error("Pleae Login/Register first !!")
    }

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


                    <iframe src={item.threesixty} loading="lazy" width="300px" height="300px" alt="Error" ></iframe>


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
