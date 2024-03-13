import React, { useEffect, useState } from 'react'
import "../style.css"
import { AiOutlineSearch } from 'react-icons/ai'
import axios from "axios"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, getOrderById, getOrders } from '../../../../redux/order/orderApi'
import { RiDeleteBinFill } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { Badge, Pagination } from '@mui/material'
import EditOrder from './EditOrder'
import { confirmAlert } from 'react-confirm-alert'
import Loader from '../../../../common/Loader/Loader'
import 'react-confirm-alert/src/react-confirm-alert.css';
import MoveToInboxSharpIcon from '@mui/icons-material/MoveToInboxSharp';
import { BiStore } from 'react-icons/bi'
const Order = () => {

  const pageSize = 5
  const [search, setSearch] = useState("")
  const [refresh, setRefresh] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpen, setOpen] = useState(false)
  const [order, setOrder] = useState([])
  const { error } = useSelector((state) => state.order)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }


  const handleDrawer = (id) => {
    setOpen(!isOpen)
    if (typeof id === 'string') {

      dispatch(getOrderById(id))
    }

  }

  const handleDispatch = (id) => {
    setLoading(true)
    dispatch(deleteOrder(id))

    if (!error) {
      setLoading(false)
      toast.success("Delete Succesfully")
      setRefresh(!refresh)
    }
    else {
      setLoading(false)
      toast.error(error)
    }
  }
  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to delete this user ?',
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

  useEffect(() => {

    axios.get('/order', { withCredentials: true })
      .then((r) => {
        setOrder(r.data.order)
      })
  }, [refresh])


  const renderPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return Array.isArray(order) &&
      order
        ?.filter(val => search == "" ? val : val?.orderStatus?.toLowerCase()?.includes(search.toLowerCase()))
        .slice(startIndex, endIndex).map((item, index) => (
          <li className="table-row" key={index}>
            <div className="col col-1" >{item?.razorpay_order_id}</div>
            <div className="col col-2" >{item?.userId?.name}</div>
            <div className="col col-3" >{item?.createAt?.slice(0, 10)}</div>
            <div className="col col-4" >{item?.orderStatus}</div>
            <div className="col col-5" >
              {item.orderItems.map((i) => {
                return <> <li style={{ listStyleType: 'none' }}>💎{i.productName}</li>  </>
              })}
            </div>
            <div className="col col-6" >{
              item.orderItems.map((i) => {
                return <> <li style={{ listStyle: "none" }}>{i.quantity}</li>  </>
              })
            }</div>
            <div className="col col-7">{item.totalPrice} </div>
            <div className="col col-8" >{ }


              <MdOutlineEdit onClick={() => handleDrawer(item._id)} />

              <RiDeleteBinFill onClick={() => handleDelete(item._id)} />

            </div>
          </li>
        ));
  };


  return (

    <>
      {
        loading ? <Loader /> :


          <div id='order' className='content-admin' >
            <h2 className='admin-header'>Orders</h2>

            <div className="container">
              <div className="headerwithsearch" style={{ marginTop: '1rem' }}>
                <Badge badgeContent={order?.length} color='success' >
                  <BiStore size={25} />
                </Badge>
                <div className="searchwithref">

                  <div className="inputwitlogo">
                    <AiOutlineSearch />
                    <input type="search" placeholder='Search Customer' onChange={(e) => setSearch(e.target.value)} />
                  </div>
                  <button className="rbtn" type="button" onClick={() => setRefresh(!refresh)}>
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
                  <div className="col col-1">Order ID</div>
                  <div className="col col-2">Customer</div>
                  <div className="col col-3">Date</div>
                  <div className="col col-4">Status</div>
                  <div className="col col-5"> Purchased</div>
                  <div className="col col-6">Qty</div>
                  <div className="col col-7">Price</div>
                  <div className="col col-8">Actions</div>
                </li>

                {
                  renderPageData()
                }
              </ul>
              <div className="pagination" style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination size='large' color="primary" count={Math.ceil(order?.length / pageSize)} onChange={handlePageChange} />
              </div>
            </div>

            <EditOrder isOpen={isOpen} handleDrawer={handleDrawer} setRefresh={setRefresh} />
          </div>
      }
    </>
  )
}

export default Order
