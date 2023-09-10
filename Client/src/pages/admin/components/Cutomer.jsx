import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from 'axios';
import { AiFillDelete, AiOutlineSearch } from "react-icons/ai"
import { toast } from 'react-hot-toast';
axios.defaults.baseURL = "http://localhost:4001"
const Cutomer = ({ slider }) => {

  const [user, setUser] = useState()
  const [search, setSearch] = useState("")
  const [active, setActive] = useState(true)

  useEffect(() => {
    axios.get("/user")
      .then((r) => {
        setUser(r.data);
      })
  }, [])

  console.log(active)
  const handleUpdateActive = (_id) => {
    
    axios.put(`/user/active/${_id}`,)
      .then((r) => {
        console.log(r.data)
        toast.success(r.data.message)
        document.location.reload()
      })
  }
  const handleUpdateInactive = (_id) => {
    
    axios.put(`/user/inactive/${_id}`,)
      .then((r) => {
        console.log(r.data)
        toast.success(r.data.message)
        document.location.reload()
      })
  }


  // const handleDetele = (_id) => {
  //   if (window.confirm("Are you sure delete this user ?")) {
  //     axios.delete(`/user/${_id}`)
  //       .then((r) => {
  //         toast.success(r.data.message)
  //         window.location.reload();
  //       })
  //   }
  //   else {
  //     toast.error("canceled")
  //   }
  // }
  const handleRefresh = () => {
    window.location.reload()
  }
  return (
    <div id='customer' className='content-admin' style={{ marginLeft: slider && '20%' }}>
      <h2>Customers</h2>

      <div className="container">
        <div className="headerwithsearch" style={{ marginTop: '1rem' }}>
          <h2> List of Customer</h2>
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
            <div className="col col-3">Email</div>
            <div className="col col-4">Phone</div>
            <div className="col col-5">status</div>
          </li>

          {
            user ?
              user.filter(val => search == "" ? val : val.name.toLowerCase().includes(search.toLowerCase()))
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item, index) => {
                  return (
                    <li className="table-row" key={index}>
                      <div className="col col-1" >{index + 1}</div>
                      <div className="col col-2" >{item.name}</div>
                      <div className="col col-3" >{item.email}</div>
                      <div className="col col-4" >{item.phone}</div>
                      <div className="col col-5 deletecustomer"  >
                        {/* <div className="deleteBtn">
                          <button class="bin">🗑</button>
                          <div class="div">
                            <small>
                              <i></i>
                            </small>
                          </div>
                        </div> */}
                        {
                          item.active ? <button className='active-role'onClick={()=>handleUpdateActive(item._id)} >Active</button> : <button className='inactive-role' onClick={()=>handleUpdateInactive(item._id)}>Inactive</button>
                        }

                      </div>
                    </li>
                  )
                }) : ""
          }


        </ul>
      </div>



    </div>
  )
}

export default Cutomer
