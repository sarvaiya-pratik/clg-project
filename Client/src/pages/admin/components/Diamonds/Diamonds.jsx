import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { RiDeleteBinFill } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import axios from 'axios'
import { toast } from "react-toastify"
import { NavLink } from "react-router-dom"
import { FiPlus } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductById, getProductById, getproductall } from '../../../../redux/product/productApi'
import { Badge, Checkbox, Pagination } from '@mui/material'
import { confirmAlert } from 'react-confirm-alert';
import Loader from '../../../../common/Loader/Loader';
import EditDiamond from './EditDiamond';
import logo from './diamond_logo.png'
import { CiExport } from "react-icons/ci";
import { useExcelDownloder } from 'react-xls';
import { saveAs } from 'file-saver';
import "../style.css"
import * as XLSX from 'xlsx';
import 'react-confirm-alert/src/react-confirm-alert.css';



const Diamonds = () => {

  const pageSize = 5
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(true)
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const error = useSelector((state) => state.product.error)
  const [product, setProduct] = useState([])
  const dispatch = useDispatch()
  const [isOpen, setOpen] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    axios.get('/products', { withCredentials: true })
      .then((r) => {
        setProduct(r.data.products)
        setLoading(false)
      })

    axios.post("/products/export", { selectedCheckboxes })
      .then((r) => {
        setData(r.data.product)
      })

  }, [isOpen, dispatch, refresh, selectedCheckboxes])


  const handleDispatch = (id) => {
    setLoading(true)
    dispatch(deleteProductById(id))
    console.log("Deleted")
    if (!error) {
      setLoading(false)
      toast.success("Delete Succesfully")
      setRefresh(!refresh)
    }
    else {
      setLoading(true)
      toast.error(error)
    }
  }

  const handleDrawer = (pid) => {
    setOpen(!isOpen)
    if (typeof pid === "string") {
      dispatch(getProductById(pid))
    }
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
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

  const handleCheckboxChange = (id) => {
    setSelectedCheckboxes((prevSelected) => {
      const isSelected = prevSelected.includes(id);
      if (isSelected) {
        return prevSelected.filter((item) => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handelAllCheckBox = () => {
    setSelectedCheckboxes((prevSelected) =>
      prevSelected.length === product.length
        ? []
        : product.map((item) => item._id)
    );
  }

  const downloadExcelFile = () => {
    console.log("FF")
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(dataBlob, 'diamonds.xlsx');
  };

  const renderPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return Array.isArray(product) &&
      product
        ?.filter(val => search == "" ? val : val.title.toLowerCase().includes(search.toLowerCase()))
        .slice(startIndex, endIndex).map((item, index) => (

          <li className="table-row" key={index}>
            <div className="col col-1"> <Checkbox onChange={() => handleCheckboxChange(item._id)} checked={selectedCheckboxes.includes(item._id)} /> </div>
            <div className="col col-2" >{index + 1}</div>
            <div className="col col-3" >{item.title}</div>
            <div className="col col-4" >{item.catagory}</div>
            <div className="col col-5" >{item?.shape?.category}</div>
            <div className="col col-6" >{item.carat}</div>
            <div className="col col-7" >{item.price}</div>
            <div className="col col-8" >{item.quantity}</div>
            <div className="col col-9">

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

          <div id='diamonds' className='content-admin' >
            <div className="headingWithAdd">
              <h2 className=''>Diamonds</h2>
              <NavLink to="/admin/addproduct">
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
                <div>
                  <Badge badgeContent={product?.length} color='success' >
                    <img src={logo} width='30px' height='30px' />
                    {/* <BiSolidDiamond size={25}/> */}
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


                  <div className='export-btn' onClick={downloadExcelFile}>
                    <button class="button" >
                      <span class="button-decor"></span>
                      <div class="button-content">
                        <div class="button__icon">
                          {selectedCheckboxes.length}
                        </div>
                        <span class="button__text"><CiExport  style={{ fontWeight: 600 }} /> Exports</span>
                      </div>
                    </button></div>
                </div>
              </div>
              <ul className="responsive-table">
                <li className="table-header">
                  <div className="col col-1"><Checkbox onChange={handelAllCheckBox}
                  style={{color:'white'}}
                    checked={selectedCheckboxes.length === product.length} />
                  </div>
                  <div className="col col-2">NO</div>
                  <div className="col col-3">Diamond Name</div>
                  <div className="col col-4">Catagory</div>
                  <div className="col col-5">Shape</div>
                  <div className="col col-6">Carat</div>
                  <div className="col col-7">Price</div>
                  <div className="col col-8">Quantity</div>
                  <div className="col col-9">Actions</div>
                </li>

                {
                  renderPageData()
                }

              </ul>
              <div className="pagination">
                <Pagination size='large' count={Math.ceil(product?.length / pageSize)} color="primary" onChange={handlePageChange} />
              </div>
            </div>
            <EditDiamond handleDrawer={handleDrawer} isOpen={isOpen} />
          </div>
      }
    </>
  )
}

export default Diamonds
