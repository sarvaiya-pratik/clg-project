import React, { useEffect, useState } from 'react'
import "./style.css"
import { BsCartPlus } from "react-icons/bs"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getproductall } from '../../redux/product/productApi'
import Spinner from '../login/Spinner'
import { addCartToUser } from '../../redux/cart/cartApi'
import { toast } from 'react-toastify'
import Loader from '../../common/Loader/Loader'
const Stones = () => {

  const [search, setSearch] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  var product = useSelector((state) => state.product.products)
  var loading = useSelector((state) => state.product.loading)

  useEffect(() => {
    dispatch(getproductall())
  }, [])

  const user = useSelector((state) => state.user.users)

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
            <div className="diamonds">
              {
                product ? product
                  .filter(val => search == "" ? val : val.title.toLowerCase().includes(search.toLowerCase()))
                  .map((product, index) => {
                    return (

                      <div className='diamond-card' key={index}>
                        {
                          product.imgUrl.startsWith('imguri') ?
                            <img src={`http://localhost:4001/img/${product.threesixty}`} width="300px" height="300px"  ></img> :
                            <iframe src={product.imgUrl} width="300px" height="300px"></iframe>

                        }
                        <div className="card-body">
                          <NavLink to={`/stones/${product._id}`}>
                            <h5>{product.title}</h5>
                            <hr />
                            <p style={{ textAlign: 'center', fontWeight: '600', color: "green" }}>{product.price} $</p>
                            <div className="mid">
                              <p>T:{product.table}%</p>  <p>D:{product.depth}%</p>  <p>R:{product.ratio}%</p>
                            </div>
                          </NavLink>
                          <hr />
                          <button className='addToCart' onClick={() => handleAddToCart(product._id)}><BsCartPlus />Add To Cart</button>
                        </div>
                      </div>

                    )
                  }) : <h2>Product not found</h2>}


            </div>
          </main>
        </div>
      }

    </>
  )

}
export default Stones
