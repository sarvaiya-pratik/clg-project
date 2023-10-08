import React, { useEffect, useState } from 'react'
import "./style.css"
import { AiOutlineSearch } from 'react-icons/ai'
import axios from "axios"
import toast from 'react-hot-toast'
// axios.defaults.baseURL = "http://localhost:4001"
const Order = ({ slider }) => {
  const [user, setUser] = useState()
  const [checkboxes, setCheckboxes] = useState();
  const [search, setSearch] = useState("")
  const [active, setActive] = useState(true)

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
    axios.get("/order")
      .then((r) => {
        setUser(r.data);
      })
  }, [])

  useEffect(() => {
    setCheckboxes(initialCheckboxes)
    console.log("run")
  }, [user])



  const handleUpdateActive = (_id) => {
    axios.put(`/order/active/${_id}`)
      .then((r) => {
        console.log(r.data)
        if(r.data.code == 200){
        toast.success(r.data.message)
        document.location.reload()
        }
      })
  }

  const handleUpdateInactive = (_id) => {
    axios.put(`/order/inactive/${_id}`)
      .then((r) => {
        console.log(r.data)
        if(r.data.code == 200){
          toast.success(r.data.message)
          document.location.reload()
        }
       
      })
  }
  // const handleDetele = (_id) => {
  //   if (window.confirm("Are you sure delete this user ?")) {
  //     axios.delete(`http://localhost:4001/order/${_id}`)
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
            <button className="rbtn" type="button" onClick={handleRefresh}>
              <svg viewBox="0 0 16 16" className="bi bi-arrow-repeat" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
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
            <div className="col col-2">Date</div>
            <div className="col col-3">Customer Name</div>
            <div className="col col-8">City</div>
            <div className="col col-4"> Purchased</div>
            <div className="col col-5">Qty</div>
            <div className="col col-6">Price</div>
            <div className="col col-7">status</div>
          </li>



          {

checkboxes ?
  checkboxes.filter((val) => search == "" ? val : val.label.fname.toLowerCase().includes(search.toLowerCase()) || val.label.pname.toLowerCase().includes(search.toLowerCase()) || val.label.createdAt.toLowerCase().includes(search.toLowerCase())|| val.label.city.toLowerCase().includes(search.toLowerCase()))
    .map((item, index) => {
      return (
        <li className="table-row" key={index}>
          <div className="col col-1" >{index + 1}</div>
                  <div className="col col-2" >{item.label.createdAt.slice(0, 10)}</div>
                  <div className="col col-3" >{item.label.fname + " " + item.label.lname}</div>
                  <div className="col col-8" >{item.label.city}</div>
                  <div className="col col-4" >{item.label.pname}</div>
                  <div className="col col-5" >{item.label.qty}</div>
                  <div className="col col-6" >{item.label.price}</div>
          <div className="col col-7 deletecustomer" style={{ display: "flex" }}  >

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
            orderData ?
            orderData.filter((val)=>search == ""? val : val.fname.toLowerCase().includes(search.toLocaleLowerCase()))
            .sort((a,b)=>a.fname.localeCompare(b.fname))
              .map((item, index) => {
         
               
                return (<li className="table-row" key={index}>
                  <div className="col col-1" >{index + 1}</div>
                  <div className="col col-2" >{item.createdAt.slice(0, 10)}</div>
                  <div className="col col-3" >{item.fname + " " + item.lname}</div>
                  <div className="col col-8" >{item.city}</div>
                  <div className="col col-4" >{item.pname}</div>
                  <div className="col col-5" >{item.qty}</div>
                  <div className="col col-6" >{item.price}</div>
                  <div className="col col-7 "  >
                        {
                          item.active ? <button className='active-role'onClick={()=>handleUpdateActive(item._id)} >Confirm</button> : <button className='inactive-role' onClick={()=>handleUpdateInactive(item._id)}>Pending</button>
                        }

                      </div>
                </li>)

              })

              : ""
         } */}
        </ul>
      </div>
    </div>
  )
}

export default Order
