import { Badge, Chip } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsCartPlus } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../../redux/product/productApi'

const RelatedStones = () => {

    // const product = useSelector((state) => state.product.products)

    const { pid } = useParams()
    // const [product, setProducts] = useState()
    var product = useSelector((state) => state.product.products)

    const [realtedProduct,setRelatedProduct] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get('/products', { withCredentials: true })
            .then((r) => {
                const temp = r.data.products.filter((e)=>e.shape.category == product.shape.category)
                const related = temp.filter((e)=>e._id !== product._id)
                setRelatedProduct(related)
            })
    })
    useEffect(() => {
       
        dispatch(getProductById(pid))
      }, [pid])
    
      const handleClick = (id) =>{
        navigate(`/stones/${id}`)
        const body = document.querySelector('#root');

        body.scrollIntoView({
            behavior: 'smooth'
        }, 500)
      }
    return (
        <>
            <div id="releated-stones">
                <h3>
                    Related Products
                </h3>

                <section>
                    {
                        Array.isArray(realtedProduct) ? realtedProduct.map((item) => {
                            return (

                                <div className="d-card" onClick={()=>handleClick(item._id)}>
                                    {
                                        item?.imgUrl?.startsWith('http://res.cloudinary.com') ?
                                            <img src={item.imgUrl} width="250px" height="250px"  ></img> :
                                            <iframe src={item.imgUrl} width="250px" height="250px"></iframe>
                                    }
                                    <div className="description">

                                    <h6>{item.title.slice(0,28)}{item.title.length >28 ? "..": ""}</h6>
                                    <h4>₹ {item.price}</h4>
                                    <Chip size='small' label="Free Delivery" color='default' />
                                    </div>
                                </div>
                            )
                        })
                            : ""
                    }


                </section>


            </div>
        </>
    )
}

export default RelatedStones