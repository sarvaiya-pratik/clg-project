import { Badge, Pagination } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FiPlus } from 'react-icons/fi'
import { MdOutlineEdit } from 'react-icons/md'
import { RiDeleteBinFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteFeedback, getRateAndReview } from '../../../../redux/feedback/FeedbackApi'
import { BiMessage } from 'react-icons/bi'
import "../style.css"
import Loader from '../../../../common/Loader/Loader'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';

const Feedback = () => {

  const pageSize = 5
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const [refresh, setRefresh] = useState(true)

  const { reviews, loading, error } = useSelector((state) => state.feedback)

  const dispatch = useDispatch()

  const [isOpen, setOpen] = useState(false)

  const handleDispatch = (id) => {
    dispatch(deleteFeedback(id))
    if (!error && !loading) {
      toast.success("Deleted Succesfully")
    }
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  useEffect(() => {
    dispatch(getRateAndReview())
  }, [isOpen, dispatch, refresh])

  const handleDrawer = (pid) => {
    setOpen(!isOpen)
    if (typeof pid === "string") {

      // dispatch(getProductById(pid))
    }

  }

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to delete this product ?',
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
  }

  const renderPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return Array.isArray(reviews) &&
      reviews
        ?.filter(val => search == "" ? val : val.title.toLowerCase().includes(search.toLowerCase()))
        .slice(startIndex, endIndex).map((item, index) => (

          <li className="table-row" key={index}>
            <div className="col col-1" >{index + 1}</div>
            <div className="col col-2" >{item?.product?.title}</div>
            <div className="col col-3" >{item?.description}</div>
            <div className="col col-4" >{item?.title}</div>
            <div className="col col-5" >{item?.ratting}</div>
            <div className="col col-6" >{item.userName}</div>
            <div className="col col-7">

              {/* <MdOutlineEdit onClick={() => handleDrawer(item._id)} /> */}

              <RiDeleteBinFill onClick={() => handleDelete(item._id)} />

            </div>
          </li>
        ));
  };
  return (
    <>
      {
        loading ? <Loader /> :
          <>



            <div id='feedback' className='content-admin' >
            
                <h2 className='admin-header'>Feedback</h2>
               
             
            
              <div className="container">
                <div className="headerwithsearch" style={{ marginTop: '1rem' }}>
                  <div>
                    <Badge badgeContent={reviews?.length} color='success' >
                      <BiMessage size={25} />
                    </Badge>
                  </div>
                  <div className="searchwithref">


                    <div className="inputwitlogo">
                      <AiOutlineSearch />
                      <input type="search" placeholder='Search Diamond' onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <button class="rbtn" type="button" onClick={() => setRefresh(!refresh)}>
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
                    <div className="col col-2">Product Name</div>
                    <div className="col col-3">Description</div>
                    <div className="col col-4">Title</div>
                    <div className="col col-5">Rattig</div>
                    <div className="col col-6">User</div>
                    <div className="col col-7">Actions</div>
                  </li>

                  {
                    renderPageData()
                  }

                </ul>
                <div className="pagination">
                  <Pagination size='large' count={Math.ceil(reviews?.length / pageSize)} color="primary" onChange={handlePageChange} />
                </div>
              </div>

              {/* <EditDiamond handleDrawer={handleDrawer} isOpen={isOpen} /> */}
            </div>
          </>
      }
    </>
  )
}

export default Feedback  