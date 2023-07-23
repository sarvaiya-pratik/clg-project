import React from 'react'
import { useParams } from 'react-router-dom'
import data from "./data.json"

const StoneDetail = () => {
  const param = useParams();

  const dd = data.filter((f) => f.stockid.toString() === param.id);

  console.log(param.id)
  console.log(dd)
  return (
    <div id='sotneDetail'>

      <h2 className='text-center'>Diamond Details</h2>
      <div className="details">
        <iframe src={dd[0][360]} width='320px' height='320px' ></iframe>
        <div className="right">
          <h3>{dd[0].title}</h3>
          <p className='badge'>{dd[0].catagory.toUpperCase()}</p>

            <div className="os">
              <div className="label">
                <h6>Shape</h6>
                <p>{dd[0].shape}</p>
              </div>
              <div className="label">
                <h6>Carat</h6>
                <p>{dd[0].Carat}</p>
              </div>
              <div className="label">
                <h6>Colour</h6>
                <p>{dd[0].Colour}</p>
              </div>
                <div className="label">
                  <h6>Clarity</h6>
                  <p>{dd[0].Clarity }</p>
                </div>
                <div className="label">
                  <h6>Cut</h6>
                  <p>{dd[0].Cut}</p>
                </div>
                <div className="label">
                  <h6>Polish</h6>
                  <p>{dd[0].Polish}</p>
                </div>
                <div className="label">
                  <h6>Symmetry</h6>
                  <p>{dd[0].Symmetry}</p>
                </div>
                <div className="label">
                  <h6>Fluorescence</h6>
                  <p>{dd[0].Fluorescence}</p>
                </div>
                <div className="label">
                  <h6>Measurements</h6>
                  <p>{dd[0].Measurements}</p>
                </div>
                <div className="label">
                  <h6>Table</h6>
                  <p>{dd[0].Table}</p>
                </div>
                <div className="label">
                  <h6>Depth</h6>
                  <p>{dd[0].Depth}</p>
                </div>
                <div className="label">
                  <h6>Ratio</h6>
                  <p>{dd[0].Ratio}</p>
                </div>
                <div className="label">
                  <h6>Crown angle</h6>
                  <p>{dd[0]['Crown-angle']}</p>
                </div>
                <div className="label">
                  <h6>Crown height</h6>
                  <p>{dd[0]['Crown height']}</p>
                </div>
                <div className="label">
                  <h6>Pavilion angle</h6>
                  <p>{dd[0]['Pavilion angle']}</p>
                </div>
                <div className="label">
                  <h6>Pavilion depth</h6>
                  <p>{dd[0]['Pavilion depth']}</p>
                </div>
                <div className="label">
                  <h6>Girdle</h6>
                  <p>{dd[0]['Girdle']}</p>
                </div>
                <div className="label">
                  <h6>Culet</h6>
                  <p>{dd[0]['Culet']}</p>
                </div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default StoneDetail
