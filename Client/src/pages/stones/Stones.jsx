import React, { useCallback, useEffect, useState } from 'react'
import "./style.css"
import { BsCartPlus } from "react-icons/bs"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getproductall } from '../../redux/product/productApi'
import { addCartToUser } from '../../redux/cart/cartApi'
import { toast } from 'react-toastify'
import Loader from '../../common/Loader/Loader'
import { Button, Checkbox, FormControlLabel, FormGroup, Pagination, Paper, Slider, Typography } from '@mui/material'
import axios from 'axios'

const Stones = () => {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filterValue, setFilterValue] = React.useState([0, 10000])

  const [checkedItems, setCheckedItems] = useState({
    all: true,
    Oval: false,
    Heart: false,
    Pear: false,
    Round: false,
    Emerald: false,
    Rose: false,
    Marquise: false,
    Asscher: false
  });

  const pageSize = 9
  const product = useSelector((state) => state.product.products)
  const loading = useSelector((state) => state.product.loading)
  const user = useSelector((state) => state.user.users)
  const [listCategory, setListCategory] = useState([]);
  const [data, setData] = useState(product)
  const [handleRangePriceCalled, setHandleRangePriceCalled] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    axios.get('/products/category/all').then((r) => {
      setListCategory(r.data?.category);

    }).catch((err) => {
      console.log(err)
    });
  }, []);

  const handleSort = (e) => {
    if (e.target.value == "lowest") {
      setData(product.slice().sort((a, b) => a.price - b.price))
    }
    else if (e.target.value == "highest") {
      setData(product.slice().sort((a, b) => b.price - a.price))
    }
    else if (e.target.value == "AtoZ") {
      setData(product.slice().sort((a, b) => a.title.localeCompare(b.title)))
    }
    else if (e.target.value == "ZtoA") {
      setData(product.slice().sort((a, b) => b.title.localeCompare(a.title)))
    }
    else {
      setData(product)
    }
  }

  const handleCheckboxChange = (name) => (event) => {
    const updatedCheckedItems = { ...checkedItems, [name]: event.target.checked };

    if (name === 'all' && event.target.checked) {
      Object.keys(updatedCheckedItems).forEach((key) => {
        if (key !== 'all') {
          updatedCheckedItems[key] = false;
        }
      });
    }

    else if (name !== 'all') {
      updatedCheckedItems.all = false
    }

    setCheckedItems(updatedCheckedItems);
  };

  useEffect(() => {
    const selectedCategories = Object.keys(checkedItems).filter((key) => checkedItems[key]);

    if (selectedCategories.length === 0) {
      //  if no product shapes selected then show all the products
      setData(product);
    }
    else if (selectedCategories[0] == "all") {
      setData(product)
    }
    else {
      //  if any category selected then show selected products
      const filteredProducts = product.filter((item) => selectedCategories.includes(item?.shape?.category));
      setData(filteredProducts);
    }
  }, [checkedItems, product]);


  useEffect(() => {
    dispatch(getproductall())
  }, [])

  useEffect(() => {
    setData(product)
  }, [product])

  const handleChange = (event, newValue) => {
    setFilterValue(newValue);
  }

  // const handleRangePrice = () => {
  //   const filteredByPrice = product.filter((item) => item.price >= filterValue[0] && item.price <= filterValue[1]);
  //   setData(filteredByPrice)
  // }

  const handleRangePrice = useCallback(() => {
    const filteredByPrice = product.filter((item) => item.price >= filterValue[0] && item.price <= filterValue[1]);
    setData(filteredByPrice)
    setHandleRangePriceCalled(!handleRangePriceCalled);
  }, [data, filterValue, handleRangePriceCalled])

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  function valuetext(value) {
    return `${value}`;
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [checkedItems, currentPage, handleRangePriceCalled])

  const renderPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return Array.isArray(data) &&
      data
        ?.filter(val => search == "" ? val : val.title.toLowerCase().includes(search.toLowerCase()))
        .slice(startIndex, endIndex).map((item, index) => (
          <Typography key={index} variant="body1" gutterBottom>
            <div className='diamond-card' style={{ cursor: 'pointer' }}>

              {
                item.imgUrl.startsWith('http://res.cloudinary.com') ?
                  <img src={item.imgUrl} width="250px" height="250px"  ></img> :
                  <iframe src={item.imgUrl} width="250px" height="250px"></iframe>
              }

              <div className="card-body" >
                <NavLink to={`/stones/${item._id}`}>
                  <h5>{item.title}</h5>
                  <hr />
                  <p style={{ textAlign: 'center', fontWeight: '600', color: "green" }}>{item.price} $</p>
                  <div className="mid">
                    <p>T:{item.table}%</p>  <p>D:{item.depth}%</p>  <p>R:{item.ratio}%</p>
                  </div>
                </NavLink>
                <hr />
                {/* <p>Available</p> */}
                {
                  item.quantity > 0 ?
                    <button className='addToCart' onClick={() => handleAddToCart(item._id)}><BsCartPlus />Add To Cart</button>
                    :
                    <button className='Unavailble'><BsCartPlus />Not Availbale</button>
                }
              </div>
            </div>
          </Typography>
        ));
  };

  const handleAddToCart = (productId) => {
    if (user) {
      dispatch(addCartToUser({ productId, quantity: 1 }))
      toast.success("Added to cart succesfully !")
    }
    else {
      toast.error("Please Register First !")
      navigate('/login')
    }
  }

  return (
    <>
      {loading ? <Loader /> :
        <div id='stones'>
          <h2 className='heading'>MRP STONES</h2>

          <main>
            <div className="searchbox" >
              <input type="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
              <button type="submit" value="search">&nbsp;</button>
            </div>

            <div className="main-container">

              <div className="filter-slide">
                <h2>Filters</h2>

                <div className="category">
                  <h3>Shapes</h3>

                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={checkedItems.all} onChange={handleCheckboxChange('all')} />}
                      label="All"
                    />

                    {
                      listCategory?.map((i) =>
                        <FormControlLabel
                          control={<Checkbox checked={checkedItems[i?.category]} onChange={handleCheckboxChange(i.category)} />}
                          label={i?.category}
                        />
                      )
                    }


                  </FormGroup>

                </div>

                <div className="price">
                  <h3>Price Range</h3>
                  <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={filterValue}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={0}
                    max={10000}
                  />
                  <div className='apply'>
                    <span>{filterValue[0]} - {filterValue[1]}</span> <Button onClick={handleRangePrice}>Apply</Button>
                  </div>
                </div>
              </div>

              <div className="diamond-container">
                <div className="top-side">
                  <h5><span>{data?.length}</span> Products Available</h5>
                  <select name="yes" id="" onChange={handleSort}>
                    <option value="normal" defaultChecked>Sort here..</option>
                    <option value="lowest">Price (lowest)</option>
                    <option value="highest">Price (highest)</option>
                    <option value="AtoZ">Name (a - z)</option>
                    <option value="ZtoA">Name (z - a)</option>
                  </select>
                </div>

                <Paper className='diamonds' elevation={2}  >
                  {
                    renderPageData()
                  }

                </Paper>

                {/* </div> */}

                <div className="pagination">

                  <Pagination size='large'
                    //  count={10} 
                    count={Math.ceil(product?.length / pageSize)}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange} />
                </div>
              </div>

            </div>

          </main>
        </div>
      }

    </>
  )

}
export default Stones
