import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "../style.css"
import axios from 'axios';
import { AiFillDelete, AiOutlineSearch } from "react-icons/ai"
import { toast } from 'react-toastify';
import { deleteUser, getUserById, getalluser } from '../../../../redux/user/userApi';
import { Badge, Chip, Pagination, Typography } from '@mui/material';
import { RiDeleteBinFill } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import EditCustomer from './EditCustomer';
import { confirmAlert } from 'react-confirm-alert';
import Loader from '../../../../common/Loader/Loader';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FiUser } from 'react-icons/fi';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
// axios.defaults.baseURL = "http://localhost:4001"
const Customer = () => {

  const pageSize = 5
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpen, setOpen] = useState(false)
  const [singleUser, setSingleUser] = useState()
  const { error } = useSelector((state) => state.user)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    axios.get('users', { withCredentials: true })
      .then((r) => {
        setUsers(r.data.user)
        setLoading(false)
      })
  }, [isOpen, refresh])

  const handleDrawer = (id) => {
    setOpen(!isOpen)
    if (typeof id === 'string') {

      dispatch(getUserById(id))
    }

  }


  const handleDispatch = (id) => {
    setLoading(true)
    dispatch(deleteUser(id))

    if (!error) {
      setLoading(false)
      toast.success("Status Change Succesfully")
      setRefresh(!refresh)
    }
    else {
      setLoading(false)
      toast.error(error)
    }
  }
  const handleDelete = (id, active) => {
    confirmAlert({
      title: `Confirm to ${active ? 'block' : 'active'}`,
      message: `Are you sure you want to ${active ? 'block' : 'active'} this user?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDispatch(id)
        },
        {
          label: 'No',
        }
      ]
    });

    // setRefresh(!refresh)
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const renderPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return Array.isArray(users) &&
      users
        ?.filter(val => search == "" ? val : val.name?.toLowerCase().includes(search.toLowerCase()))
        .slice(startIndex, endIndex).map((item, index) => (
          // <Typography key={index} variant="body1" gutterBottom>
          <li className="table-row" key={index}>
            <div className="col col-1" >{index + 1}</div>
            <div className="col col-2" >{item.name}</div>
            <div className="col col-3" >{item.email}</div>
            <div className="col col-4" >{item.phone}</div>
            <div className="col col-5" >{item.gender}</div>
            <div className="col col-6" >{item.isAdmin ? "Admin" : "user"}</div>
            <div className="col col-7" >{item.active ? <span style={{ color: 'green', fontWeight: '600' }}>Active</span> : <span style={{ color: 'red', fontWeight: '600' }}>Block</span>}</div>
            <div className="col col-8 "   >

              <MdOutlineEdit onClick={() => handleDrawer(item._id)} />

              <FaEye onClick={() => handleDelete(item._id, item.active)} />

            </div>
          </li>
          // </Typography>
        ));
  };

  return (
    <>

      {
        loading ? <Loader /> :

          <div id='customer' className='content-admin' >
            <h2 className='admin-header'>Users</h2>

            <div className="container">
              <div className="headerwithsearch" style={{ marginTop: '1rem' }}>
                <div>
                  <Badge badgeContent={users?.length} color='success' >
                    <FiUser size={25} />
                  </Badge>
                </div>

                <div className="searchwithref">


                  <div className="inputwitlogo">
                    <AiOutlineSearch />
                    <input type="search" placeholder='Search Customer' onChange={(e) => setSearch(e.target.value)} />
                  </div>
                  <button className="rbtn" type="button" onClick={()=>setRefresh(!refresh)}>
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
                  <div className="col col-2">User Name</div>
                  <div className="col col-3">Email</div>
                  <div className="col col-4">Phone</div>
                  <div className="col col-5">Gender</div>
                  <div className="col col-6">Role</div>
                  <div className="col col-7">Status</div>
                  <div className="col col-8">Actions</div>
                </li>

                {
                  renderPageData()
                }

              </ul>
              <div className="pagination">
                <Pagination count={Math.ceil(users?.length / pageSize)} color="primary" onChange={handlePageChange} />
              </div>
            </div>

            <EditCustomer isOpen={isOpen} handleDrawer={handleDrawer} singleUser={singleUser} />

          </div>

      }
    </>
  )
}

export default Customer
