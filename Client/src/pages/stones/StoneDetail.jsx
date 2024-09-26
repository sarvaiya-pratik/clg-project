import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BsCartPlus } from "react-icons/bs"

import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../../redux/product/productApi'
import "./style.css"
import { Chip } from '@mui/material'
import { FaRightLeft, FaStar } from 'react-icons/fa6'
import DoneIcon from '@mui/icons-material/Done';
import { addCartToUser } from '../../redux/cart/cartApi'
import RelatedStones from './RelatedStones'
import { MdDoubleArrow } from "react-icons/md";

const StoneDetail = () => {

  const { pid } = useParams()
  const navigate = useNavigate()

  var product = useSelector((state) => state.product.products)
  var loading = useSelector((state) => state.product.loading)

  const user = useSelector((state) => state.user.users)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getProductById(pid))
  }, [])

  const handleAddtoCart = (productId) => {
    if (user) {

      dispatch(addCartToUser({ productId, quantity: 1 }))
      toast.success("Added to cart succesfully !")
    }
    else {
      toast.error("Please Register First !")
      navigate('/login')
    }
  }
  return (<>

    <div id='sotneDetail'>
      <section className='daimond-details'>
        {/* <h2 className='heading'>Diamond Details</h2> */}
        <div className="details">

          {
            product?.imgUrl?.startsWith('http://res.cloudinary.com') ?
              <img src={product.imgUrl} width="300px" height="300px"  ></img> :
              <iframe src={product.imgUrl} width="300px" height="300px"></iframe>
          }

          <div className="right">
            <div className="box">

              <h4>{product?.title} <Chip color='success' size='small' label={product?.catagory?.toUpperCase()} /></h4>
              <h4>₹ {product.price}</h4>
              <Chip label="Free Delivery" color='default' size='small' style={{ width: '100px' }} />
              {/* <p className='badge'>{product?.catagory?.toUpperCase()}</p> */}
            </div>
            <div className="s-box">

              <h4>Product Details</h4>
              <div className="os">
                <div className="label">
                  <p>Shape  </p>
                  <p>{product?.shape?.category}</p>
                </div>
                <div className="label">
                  <p>Carat</p>
                  <p>{product?.carat}</p>
                </div>
                <div className="label">
                  <p>Colour</p>
                  <p>{product?.colour}</p>
                </div>
                <div className="label">
                  <p>Clarity</p>
                  <p>{product?.clarity}</p>
                </div>
                <div className="label">
                  <p>Cut</p>
                  <p>{product?.cut}</p>
                </div>
                <div className="label">
                  <p>Polish</p>
                  <p>{product?.polish}</p>
                </div>
                <div className="label">
                  <p>Symmetry</p>
                  <p>{product?.symmetry}</p>
                </div>
                <div className="label">
                  <p>Fluorescence</p>
                  <p>{product?.fluorescence}</p>
                </div>
                <div className="label">
                  <p>Table</p>
                  <p>{product?.table}%</p>
                </div>
                <div className="label">
                  <p>Depth</p>
                  <p>{product?.depth}%</p>
                </div>
                <div className="label">
                  <p>Ratio</p>
                  <p>{product?.ratio}%</p>
                </div>
                <div className="label">
                  <p>Crown angle</p>
                  <p>{product?.crownangle}°</p>
                </div>
                <div className="label">
                  <p>Crown height</p>
                  <p>{product?.crownheight}%</p>
                </div>
              </div>
            </div>

            <span>
              <button className="add-to-cart" onClick={() => handleAddtoCart(product?._id)}><BsCartPlus size={20} /> Add To Cart</button>
              <button className="buy-now" onClick={() => handleAddtoCart(product?._id)}><MdDoubleArrow />Buy Now</button>

            </span>
            {/* {
              product.quantity > 0 ?
              <button className='addToCart' onClick={() => handleAddtoCart(product?._id)}><BsCartPlus />Add To Cart</button>
                :
                <button className='Unavailble'><BsCartPlus />Not Availbale</button>
            } */}
          </div>
        </div>
      </section>


      <section className='feedback'>
        <div className="feedback_heading">
          <h3>Rattings & Reviews </h3>
        </div>

        <div className="box-container">

          {
            product?.reviews?.length >= 1 ?
              product?.reviews?.map((item) => {
                return (<>
                  <div className="box">
                    <div className="first">
                      <label htmlFor="">{item.ratting}<FaStar /></label>
                      <span>{item.title}</span>
                    </div>
                    <div className="second">
                      <p>{item.description}</p>
                    </div>

                    <div className="third">
                      <span>{item.userName} <span style={{ color: 'green' }}><DoneIcon /></span></span>
                    </div>
                  </div>
                </>)
              })
              : <div className="box">
                <h4>Not Available</h4>
              </div>

          }

        </div>


      </section>
      <RelatedStones />


    </div>
  </>)






}

export default StoneDetail
