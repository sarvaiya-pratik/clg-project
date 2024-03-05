import React, { useEffect, useState } from 'react'
import "./review.css"
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Rating, TextField } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../../redux/feedback/FeedbackApi';
import { getProductById } from '../../../redux/product/productApi';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify'
const Feedback = () => {

    const { pid } = useParams()
    const [ratting, setratting] = useState(0);
    const [hover, setHover] = useState(-1);

    const product = useSelector((state) => state.product.products)

    const [review, setReview] = useState()
    const user = useSelector((state) => state.user.users);

    const { loading, error, rattings, reviews } = useSelector((state) => state.feedback)

    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductById(pid))
    }, [])

    const navigate = useNavigate()


    function getLabelText(ratting) {
        return `${ratting} Star${ratting !== 1 ? 's' : ''}, ${labels[ratting]}`;
    }

    const handleChange = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!ratting) {
            toast.error('Ratting must be required', { toastId: 'error1', position: 'top-right', })
        }
        else if (!review?.description) {

            toast.error('Description must be required', { toastId: 'error2', position: 'top-right' })
        }
        const formdata = review
        formdata.ratting = ratting

        dispatch(createReview({ formdata, pid }))

        if (!error && !loading) {
            toast.success("Rate & Review Submited", { toastId: 'success1', position: 'top-center' })
            navigate("/profile/orders")
        }




    }
    return (
        <>

            <div id='review'>
                <section className='top'>
                    <div className='review-heading'>Ratings & Reviews</div>
                    <div className='box'>

                        <h5>{product?.title}</h5>
                        <iframe src={product?.imgUrl} width="80px" height="80px" frameborder="0"></iframe>

                    </div>
                </section>
                <section className='bottom'>
                    <div className="left">
                        <li style={{ fontWeight: '700', fontSize: '18px' }}>What makes a good review</li>
                        <li>
                            <h5>Have you used this product?</h5>
                            <p>Your review should be about your experience with the product.</p>
                        </li>
                        <li>
                            <h5>Why review a product?</h5>
                            <p>Your valuable feedback will help fellow shoppers decide!</p>
                        </li>
                        <li style={{ borderBottom: 'none' }}>
                            <h5>How to review a product?</h5>
                            <p>Your review should include facts. An honest opinion is always appreciated. If you have an issue with the product or service please contact us from the help centre.</p>
                        </li>

                    </div>
                    <div className="right">
                        <div className="first">
                            <h4>Rate this product</h4>
                            <Box sx={{ display: 'flex' }}>
                                <Rating
                                    name="hover-feedback"
                                    ratting={ratting}
                                    precision={0.5}
                                    getLabelText={getLabelText}
                                    onChange={(event, newratting) => {
                                        setratting(newratting);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {ratting !== null && (
                                    <Box sx={{ ml: 2, color: 'blueviolet' }}>{labels[hover !== -1 ? hover : ratting]}</Box>
                                )}
                            </Box>
                        </div>
                        <div className="second">
                            <h4>Review this product</h4>
                            <form action="" onSubmit={handleSubmit} >
                                <TextField
                                    id="outlined-basic"
                                    label="Description"
                                    variant="outlined"
                                    name="description"
                                    onChange={handleChange}
                                    multiline
                                    minRows={4}
                                    fullWidth
                                />

                                <TextField
                                    label="Title (optional)"
                                    variant='outlined'
                                    fullWidth
                                    name='title'
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Name"
                                    variant='outlined'
                                    fullWidth
                                    name='name'
                                    value={user?.name || ""}
                                />

                                <Button type='submit' variant='contained' color='info'>Submit</Button>

                            </form>
                        </div>
                    </div>
                </section>


            </div>
        </>
    )

}

export default Feedback