import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BsCartPlus } from "react-icons/bs"
import Header from '../../common/Header/Header'
import Footer from '../../common/Footer/Footer'

const StoneDetail = ({ data }) => {

  const { id } = useParams()
  return (<>
  <Header/>
    {
      
      data.map((i) => {
        if (i._id == id) {
          return (<>
            <div id='sotneDetail' key={i._id}>
              <h2 className='heading'>Diamond Details</h2>
              <div className="details">
                <iframe src={i.threesixty} width='320px' height='320px' ></iframe>
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
                    <div className="label">
                      <h6>Pavilion angle</h6>
                      <p>{i.pavilionangle}°</p>
                    </div>
                    <div className="label">
                      <h6>Pavilion depth</h6>
                      <p>{i.paviliondepth}%</p>
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


<Footer/>
  </>
  )
}

export default StoneDetail
