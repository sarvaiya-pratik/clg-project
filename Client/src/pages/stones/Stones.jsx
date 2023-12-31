import React, { useEffect, useState } from 'react'
import "./style.css"
import Header from '../../common/Header/Header'
import Footer from '../../common/Footer/Footer'
import { BsCartPlus } from "react-icons/bs"
import { NavLink, useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { UseRefresher } from '../../context/RefreshContextProvider'

const Stones = () => {
  const [data, setData] = useState()
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState("")
  // const [refresh, setRefresh] = useState(true)
  const navigate = useNavigate()

  const [refresh,setRefresh] = UseRefresher()

  useEffect(() => {
    axios.get("/product")
      .then((r) => {
        setData(r.data)
      })
  },[refresh])
  const handleAddtoCart = (product) => {
    const productId = product._id
    const token = localStorage.getItem("token")
    if (token) {

      axios.post("/cart/add", { productId, quantity }, { headers: { "Authorization": `Bearer ${token}` } })
        .then((r) => {
          setRefresh(!refresh)
          toast.success("Added")
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
            <input type="search" placeholder='Search Diamonds' onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="diamonds">

            {
              data ? data.filter(val => val.active == true)
                .filter(val => search == "" ? val : val.title.toLowerCase().includes(search.toLowerCase()))
                .map((item, index) => {
                  return (
                    <div className='diamond-card' key={index}>
                      <iframe src={item.threesixty} width="300px" height="300px" ></iframe>
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
                : ""
            }
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Stones
