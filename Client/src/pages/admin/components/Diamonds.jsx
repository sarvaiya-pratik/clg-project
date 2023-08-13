import React from 'react'
import "./style.css"
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios'

const Diamonds = ({slider,data}) => {
  
  const handleDetele = (_id)=>{
    if (window.confirm("Are you sure delete this user ?")) {
      axios.post("http://localhost:4001/v1/deleteproduct", { _id })
        .then((r) => {
          toast.success(r.data.message)
          window.location.reload();
        })
    }
    else {
      toast.error("canceled")
    }


  }


  return (
    <>
    <div id='diamonds' className='content-admin' style={{ marginLeft: slider && '20%' }}>
      <h2>Diamonds</h2>
    <div className="container">
        <h2>List of Diamonds</h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">NO</div>
            <div className="col col-2">Diamond Name</div>
            <div className="col col-3">Catagory</div>
            <div className="col col-4">Shape</div>
            <div className="col col-5">Carat</div>
            <div className="col col-6">Price</div>
            <div className="col col-7"></div>
          </li>

          {
            data ?
              data.map((item, index) => {
                return (
                  <li className="table-row" key={index}>
                    <div className="col col-1" >{index + 1}</div>  
                    <div className="col col-2" >{item.title}</div> 
                    <div className="col col-3" >{item.catagory}</div>
                    <div className="col col-4" >{item.shape}</div>
                    <div className="col col-5" >{item.carat}</div>
                    <div className="col col-6" >{item.price}</div>
                    <div className="col col-7 deletecustomer" onClick={() => handleDetele(item._id)}  ><AiFillDelete /></div>
                  </li>
                )
              }) : ""
          }


        </ul>
      </div>
    </div>
    </>
  )
}

export default Diamonds
