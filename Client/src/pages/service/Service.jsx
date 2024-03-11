import React from 'react'
import "./style.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Service = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


  return (
    <div id='service' className='container-max'>
      <h2 className='heading'>OUR SERVICES</h2>

      <Carousel responsive={responsive} className='mycarousel'>
        <div className='box'>
          <img src="https://wp.assets.sh/uploads/sites/8783/2021/03/special-1.jpg" alt="" />
          <h2 >SPECIAL CUT</h2>
          <p>The modern round brilliant cut was revolutionary but remained largely unchallenged until the turn of this century. Now, when the consumer is more informed like never before, they need differentiated product that have exceptional brilliance, beauty, unique story to tell.</p>
          <p className="read-more">READ MORE</p>
        </div>
        <main className='box'>
          <img src="https://img.freepik.com/free-vector/seller-concept-professional-worker-supermarket-shop-store-stocktacking-merchandising-cash-accounting-calculations-client-service-payment-operation-vector-illustration_613284-3114.jpg" alt="" />
          <h2>RETAIL SUPPORT</h2>
          <p>The Traceability pratik sarvaiya i am a good student Report has the real time data of the origin of the diamond, the contribution of the master artisans step by step, the certification and other all major processes down the line until it reaches the consumer.</p>
          <p className="read-more">READ MORE</p>
        </main>
        <main className='box'>
          <img src="https://www.ashokcharan.com/Marketing-Analytics/images/image523-retailer-support.png" alt="" />
          <h2>BESPOKE</h2>
          <p>The modern round brilliant cut was revolutionary but remained largely unchallenged until the turn of this century. Now, when the consumer is more informed like never before, they need differentiated product that have exceptional brilliance, beauty, unique story to tell.</p>
          <p className="read-more">READ MORE</p>
        </main>
        <main className='box'>
          <img src="https://cdn.siasat.com/wp-content/uploads/2021/07/E-Auction.jpg" alt="" />
          <h2>STEIN AUCTION</h2>
          <p>The modern round brilliant cut was revolutionary but remained largely unchallenged until the turn of this century. Now, when the consumer is more informed like never before, they need differentiated product that have exceptional brilliance, beauty, unique story to tell.</p>
          <p className="read-more">READ MORE</p>
        </main>
        <main className='box'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKze5xYsRuQHH3aepuHu85KZcN30OFkRKOAA&usqp=CAU" alt="" />
          <h2>BAGGING & FLUTING</h2>
          <p>The modern round brilliant cut was revolutionary but remained largely unchallenged until the turn of this century. Now, when the consumer is more informed like never before, they need differentiated product that have exceptional brilliance, beauty, unique story to tell.</p>
          <p className="read-more">READ MORE</p>
        </main>

      </Carousel>







    </div>

  )
}
export default Service
