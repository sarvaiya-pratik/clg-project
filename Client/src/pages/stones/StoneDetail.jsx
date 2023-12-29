import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BsCartPlus } from "react-icons/bs"
import Header from '../../common/Header/Header'
import Footer from '../../common/Footer/Footer'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const StoneDetail = () => {

  const { id } = useParams()

  const navigate = useNavigate()

  var product = useSelector((state) => state.product.products)
  var loading = useSelector((state) => state.product.loading)

  useEffect(() => {

  }, [])

  const handleAddtoCart = () => {

  }
  return (<>

    {
      product ?
        product.map((i) => {
          if (i._id == id) {
            return (<>
              <div id='sotneDetail' key={i._id}>
                <h2 className='heading'>Diamond Details</h2>
                <div className="details">
                  {
                    i.imgUrl.startsWith('imguri') ?
                      <img src={`http://localhost:4001/img/${i.imgUrl}`} width="300px" height="300px"  ></img> :
                      <iframe src={i.imgUrl} width="300px" height="300px"></iframe>

                  }
                  <div className="right">
                    <h3>{i.title}</h3>
                    <p className='badge'>{i.catagory.toUpperCase()}</p>

                    <div className="os">
                      <div className="label">
                        <h6>Shape</h6>
                        <p>{i.shape}</p>
                      </div>
                      <div className="label">
                        <h6>Carat</h6>
                        <p>{i.carat}</p>
                      </div>
                      <div className="label">
                        <h6>Colour</h6>
                        <p>{i.colour}</p>
                      </div>
                      <div className="label">
                        <h6>Clarity</h6>
                        <p>{i.clarity}</p>
                      </div>
                      <div className="label">
                        <h6>Cut</h6>
                        <p>{i.cut}</p>
                      </div>
                      <div className="label">
                        <h6>Polish</h6>
                        <p>{i.polish}</p>
                      </div>
                      <div className="label">
                        <h6>Symmetry</h6>
                        <p>{i.symmetry}</p>
                      </div>
                      <div className="label">
                        <h6>Fluorescence</h6>
                        <p>{i.fluorescence}</p>
                      </div>

                      <div className="label">
                        <h6>Table</h6>
                        <p>{i.table}%</p>
                      </div>
                      <div className="label">
                        <h6>Depth</h6>
                        <p>{i.depth}%</p>
                      </div>
                      <div className="label">
                        <h6>Ratio</h6>
                        <p>{i.ratio}%</p>
                      </div>
                      <div className="label">
                        <h6>Crown angle</h6>
                        <p>{i.crownangle}°</p>
                      </div>
                      <div className="label">
                        <h6>Crown height</h6>
                        <p>{i.crownheight}%</p>
                      </div>


                    </div>

                    <button className='addToCart' onClick={() => handleAddtoCart(i)}><BsCartPlus />Add To Cart</button>
                  </div>
                </div>

              </div>
            </>)
          }
        }) : ""
    }



  </>
  )
}

export default StoneDetail
