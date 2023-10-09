import React, { useEffect, useState } from 'react'
import "./style.css"
import { AiFillDelete, AiOutlineReload, AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'
import toast from "react-hot-toast"
// axios.defaults.baseURL = "http://localhost:4001"
import { NavLink } from "react-router-dom"
import { FiPlus } from "react-icons/fi"

const Diamonds = ({ slider, data }) => {
  const [user, setUser] = useState()
  const [checkboxes, setCheckboxes] = useState();
  const [search, setSearch] = useState("")
  const [refresh, setRefresh] = useState(true)

  const initialCheckboxes = user ? user.map((userName, index) => ({
    id: index, // You can use a unique ID here, e.g., user ID if available
    label: userName,
    checked: userName.active,
  })) : ""  

  const handleCheckboxChange = (e, id,_id) => {
    console.log("bbbb")
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
    );
    setCheckboxes(updatedCheckboxes);
    console.log("mmm", e.target.checked)
    if (e.target.checked == false) {
      handleUpdateActive(_id)
    }
    else {
      handleUpdateInactive(_id)
    }
  };

  useEffect(() => {
    axios.get("/product")
      .then((r) => {
        setUser(r.data);
      })
  }, [refresh])

  useEffect(() => {
    setCheckboxes(initialCheckboxes)
    console.log("run")
  }, [user])


  const handleUpdateActive = (_id) => {
    axios.put(`/product/active/${_id}`,)
      .then((r) => {
        console.log(r.data)
        toast.success(r.data.message)
        setRefresh(!refresh)
      })
  }

  const handleUpdateInactive = (_id) => {
    axios.put(`/product/inactive/${_id}`,)
      .then((r) => {
        console.log(r.data)
        toast.success(r.data.message)
       setRefresh(!refresh)
      })
  }

  // const handleDetele = (_id) => {
  //   if (window.confirm("Are you sure delete this user ?")) {
  //     axios.delete(`/product/${_id}`)
  //       .then((r) => {
  //         toast.success(r.data.message)
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 2000)
  //       })
  //   }
  //   else {
  //     toast.error("canceled")
  //   }

  // }

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  return (
    <>
      <div id='diamonds' className='content-admin' style={{ marginLeft: slider && '20%' }}>
        <div className="headingWithAdd">
          <h2>Diamonds</h2>
          <NavLink to="/admins/addproduct">
            <button className='btnAddDiamond' style={{ marginBottom: '8px' }}>
              <div class="sign">
                <FiPlus />
              </div>
              <div class="text">Add</div>
            </button>
          </NavLink>
        </div>

        <div className="container">
          <div className="headerwithsearch" style={{ marginTop: '1rem' }}>
            <h2> List of Diamonds</h2>
            <div className="searchwithref">


              <div className="inputwitlogo">
                <AiOutlineSearch />
                <input type="search" placeholder='Search Diamond' onChange={(e) => setSearch(e.target.value)} />
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
              <div className="col col-2">Diamond Name</div>
              <div className="col col-3">Catagory</div>
              <div className="col col-4">Shape</div>
              <div className="col col-5">Carat</div>
              <div className="col col-6">Price</div>
              <div className="col col-7">Status</div>
            </li>
            {

checkboxes ?
  checkboxes.filter((val) => search == "" ? val : val.label.title.toLowerCase().includes(search.toLowerCase()))
    .map((item, index) => {
      return (
        <li className="table-row" key={index}>
          <div className="col col-1" >{index + 1}</div>
          <div className="col col-2" >{item.label.title}</div>
          <div className="col col-3" >{item.label.catagory}</div>
          <div className="col col-4" >{item.label.shape}</div>
          <div className="col col-5" >{item.label.carat}</div>
          <div className="col col-6" >{item.label.price}</div>
          <div className="col col-7 deletecustomer"   >

            <label className="switch">
              <input type="checkbox" checked={item.checked} onChange={(e) => handleCheckboxChange(e, item.id,item.label._id)} />
              <div className="slider"></div>
              <div className="slider-card">
                <div className="slider-card-face slider-card-front"></div>
                <div className="slider-card-face slider-card-back"></div>
              </div>
            </label>

          </div>
        </li>
      )
    }) : ""
}
            {/* {
              data ?
                data.filter(e => search == "" ? e : e.title.toLowerCase().includes(search.toLowerCase()))
                  .sort((a, b) => {
                    return a.title.localeCompare(b.title);
                  })
                  .map((item, index) => {
                    return (
                      <li className="table-row" key={index}>
                        <div className="col col-1" >{index + 1}</div>
                        <div className="col col-2" >{item.title}</div>
                        <div className="col col-3" >{item.catagory}</div>
                        <div className="col col-4" >{item.shape}</div>
                        <div className="col col-5" >{item.carat}</div>
                        <div className="col col-6" >{item.price}</div>
                        <div className="col col-7 deletecustomer"  >
                        {
                          item.active ? <button className='active-role'onClick={()=>handleUpdateActive(item._id)} >Available</button> : <button className='inactive-role' onClick={()=>handleUpdateInactive(item._id)}>Unavailable</button>
                        }

                      </div>
                      </li>
                    )
                  }) : ""
            } */}


          </ul>
        </div>
      </div>
    </>
  )
}

export default Diamonds
