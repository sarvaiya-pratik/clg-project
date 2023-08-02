import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { BsCartPlus } from "react-icons/bs"

const StoneDetail = ({ data }) => {


  const { id } = useParams()
  return (<>
    {
      data.map((i) => {
        if (i.stockid == id) {
          return (<>
            <div id='sotneDetail' key={i.stockid}>
              <h2 className='heading'>Diamond Details</h2>
              <div className="details">
                <iframe src={i[360]} width='320px' height='320px' ></iframe>
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
                      <p>{i.Carat}</p>
                    </div>
                    <div className="label">
                      <h6>Colour</h6>
                      <p>{i.Colour}</p>
                    </div>
                    <div className="label">
                      <h6>Clarity</h6>
                      <p>{i.Clarity}</p>
                    </div>
                    <div className="label">
                      <h6>Cut</h6>
                      <p>{i.Cut}</p>
                    </div>
                    <div className="label">
                      <h6>Polish</h6>
                      <p>{i.Polish}</p>
                    </div>
                    <div className="label">
                      <h6>Symmetry</h6>
                      <p>{i.Symmetry}</p>
                    </div>
                    <div className="label">
                      <h6>Fluorescence</h6>
                      <p>{i.Fluorescence}</p>
                    </div>
                    <div className="label">
                      <h6>Meaurements</h6>
                      <p>{i.Measurements}</p>
                    </div>
                    <div className="label">
                      <h6>Table</h6>
                      <p>{i.Table}</p>
                    </div>
                    <div className="label">
                      <h6>Depth</h6>
                      <p>{i.Depth}</p>
                    </div>
                    <div className="label">
                      <h6>Ratio</h6>
                      <p>{i.Ratio}</p>
                    </div>
                    <div className="label">
                      <h6>Crown angle</h6>
                      <p>{i.Crownangle}</p>
                    </div>
                    <div className="label">
                      <h6>Crown height</h6>
                      <p>{i.crownheight}</p>
                    </div>
                    <div className="label">
                      <h6>Pavilion angle</h6>
                      <p>{i.pavilionangle}</p>
                    </div>
                    <div className="label">
                      <h6>Pavilion depth</h6>
                      <p>{i.paviliondepth}</p>
                    </div>
                    <div className="label">
                      <h6>Girdle</h6>
                      <p>{i.Girdle}</p>
                    </div>
                    <div className="label">
                      <h6>Culet</h6>
                      <p>{i.Culet}</p>
                    </div>
                  </div>

                  <button className='addToCart'><BsCartPlus />Add To Cart</button>
                </div>
              </div>

            </div>
          </>)
        }
      })
    }



  </>
  )
}

export default StoneDetail
