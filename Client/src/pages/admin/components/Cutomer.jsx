import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./style.css"
import axios from 'axios';
import { AiFillDelete, AiOutlineSearch } from "react-icons/ai"
import { toast } from 'react-hot-toast';
import { getalluser } from '../../../redux/user/userApi';

// axios.defaults.baseURL = "http://localhost:4001"
const Cutomer = ({ slider }) => {


  const [search, setSearch] = useState("")
  const user = useSelector((state) => state.user.users)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getalluser())
  }, [])

  return (
    <div id='customer' className='content-admin' >
      <h2>Customers</h2>

      <div className="container">
        <div className="headerwithsearch" style={{ marginTop: '1rem' }}>
          <h2> List of Customer</h2>
          <div className="searchwithref">


            <div className="inputwitlogo">
              <AiOutlineSearch />
              <input type="search" placeholder='Search Customer' onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button className="rbtn" type="button" >
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
            <div className="col col-2">Customer Name</div>
            <div className="col col-3">Email</div>
            <div className="col col-4">Phone</div>
            <div className="col col-5">status</div>
          </li>
          {

            user ? user.map((item, index) => {

              return (
                <li className="table-row" key={index}>
                  <div className="col col-1" >{index + 1}</div>
                  <div className="col col-2" >{item.name}</div>
                  <div className="col col-3" >{item.email}</div>
                  <div className="col col-4" >{item.phone}</div>
                  <div className="col col-5 deletecustomer" style={{ display: "flex" }}  >

                    <label className="switch">
                      <input type="checkbox" />
                      <div className="slider"></div>
                      <div className="slider-card">
                        <div className="slider-card-face slider-card-front"></div>
                        <div className="slider-card-face slider-card-back"></div>
                      </div>
                    </label>

                  </div>
                </li>
              )
            })
              : ""


          }

          {/* {
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
                      <div className="col col-5 deletecustomer" style={{ display: "flex" }}  >
                       

                        <label className="switch">
                          <input type="checkbox" checked={check} onChange={(e) => setCheck(e.target.checked)} />
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
          } */}


        </ul>
      </div>



    </div>
  )
}

export default Cutomer
