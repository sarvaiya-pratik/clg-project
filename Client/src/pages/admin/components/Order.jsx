import React, { useEffect, useState } from 'react'
import "./style.css"
import { AiOutlineSearch } from 'react-icons/ai'
import axios from "axios"

const Order = ({ slider }) => {
  const [orderData, setOrderData] = useState()
  const [search, setSearch] = useState("")
  const [cart, setCart] = useState()

  useEffect(() => {
    console.log("run Cart")
    axios.get("/cart", { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
      .then((r) => {
        setCart(r.data)
        // setLoad(false)
      })


    axios.get("http://localhost:4001/order")
      .then((r) => {
        setOrderData(r.data.order)
      })

  }, [])


  console.log("order detail ", orderData)

  const handleDetele = (_id) => {
    if (window.confirm("Are you sure delete this user ?")) {
      axios.delete(`http://localhost:4001/order/${_id}`)
        .then((r) => {
          toast.success(r.data.message)
          window.location.reload();
        })
    }
    else {
      toast.error("canceled")
    }
  }
  const handleRefresh = () => {
    window.location.reload()
  }


  console.log("cart ", cart)
  return (
    <div id='order' className='content-admin' style={{ marginLeft: slider && '20%' }}>
      <h2>Orders</h2>

      <div className="container">
        <div className="headerwithsearch" style={{ marginTop: '1rem' }}>
          <h2> List of Orders</h2>
          <div className="searchwithref">

            <div className="inputwitlogo">
              <AiOutlineSearch />
              <input type="search" placeholder='Search Customer' onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button class="rbtn" type="button" onClick={handleRefresh}>
              <svg viewBox="0 0 16 16" class="bi bi-arrow-repeat" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
                <path d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" fill-rule="evenodd"></path>
              </svg>
              Refresh
            </button>
          </div>
        </div>


        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">NO</div>
            <div className="col col-2">Customer Name</div>
            <div className="col col-3">Product name</div>
            <div className="col col-4"> Qty</div>
            <div className="col col-5">City</div>
            <div className="col col-6">Del</div>
          </li>
          {
            cart ?
              orderData.map((item, index) => {
                let cartData = cart.find((cartItem) => cartItem.userId == item.userId);
                //  console.log("oitem",cartData)

                return (cartData ? <li className="table-row" key={index}>
                  <div className="col col-1" >{index + 1}</div>
                  <div className="col col-2" >{item.fname + " " + item.lname}</div>
                  <div className="col col-3" >{cartData.name}</div>
                  <div className="col col-4" >{cartData.quantity}</div>
                  <div className="col col-5" >{item.city}</div>
                  <div className="col col-6 deletecustomer" onClick={() => handleDetele(item._id)}  >
                    <div className="deleteBtn">
                      <button class="bin">🗑</button>
                      <div class="div">
                        <small>
                          <i></i>
                        </small>
                      </div>
                    </div>
                  </div>
                </li> : null)



              })

              : ""

          /* {
            orderData ?
              orderData.filter(val => search == "" ? val : val.fname.toLowerCase().includes(search.toLowerCase()))
                .sort((a, b) => a.fname.localeCompare(b.fname))
                .map((item, index) => {
                  return (
                    <li className="table-row" key={index}>
                      <div className="col col-1" >{index + 1}</div>
                      <div className="col col-2" >{item.fname + " " + item.lname}</div>
                      <div className="col col-3" >{item.email}</div>
                      <div className="col col-4" >{item.city}</div>
                      <div className="col col-5 deletecustomer" onClick={() => handleDetele(item._id)}  >
                        <div className="deleteBtn">
                          <button class="bin">🗑</button>
                          <div class="div">
                            <small>
                              <i></i>
                            </small>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                }) : ""
          } */}


        </ul>
      </div>
    </div>
  )
}

export default Order
