import { Box, Button, Drawer, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProductById } from '../../../../redux/product/productApi';
import { MdOutlineClose } from 'react-icons/md';
import axios from 'axios';

const EditDiamond = ({ handleDrawer, isOpen }) => {

    const product = useSelector((state) => state.product.products)
    const loading = useSelector((state) => state.product.loading)
    const error = useSelector((state) => state.product.error)
    const [listCategory, setListCategory] = useState([]);

    useEffect(() => {
       
        axios.get('/products/category/all').then((r) => {
            setListCategory(r.data.category);
           
        }).catch((err) => {
            console.log(err)
        });
    }, []);
    
    const [productData, setProductData] = useState({
        id: product._id,
        title: product.title,
        price: product.price,
        carat: product.carat,
        quantity: product.quantity,
        catagory: product.catagory,
        shape: product?.shape?._id,
        colour: product.colour,
        clarity: product.clarity,
        cut: product.cut,
        polish: product.polish,
        symmetry: product.symmetry,
        fluorescence: product.fluorescence,
        table: product.table,
        depth: product.depth,
        ratio: product.radio,
        crownangle: product.crownangle,
        crownheight: product.crownheight
    })

    const dispatch = useDispatch()
    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProductById(productData))
        handleDrawer(false)
    }

    useEffect(() => {
        if (product) {
            setProductData({
                id: product._id,
                title: product.title,
                price: product.price,
                carat: product.carat,
                quantity: product.quantity,
                catagory: product.catagory,
                shape: product.shape?._id,
                colour: product.colour,
                clarity: product.clarity,
                cut: product.cut,
                polish: product.polish,
                symmetry: product.symmetry,
                fluorescence: product.fluorescence,
                table: product.table,
                depth: product.depth,
                ratio: product.ratio,
                crownangle: product.crownangle,
                crownheight: product.crownheight
            })
        }
    }, [product, loading])
    return (
        <>
            <Fragment key="right">
                <Drawer
                    anchor={'right'}
                    open={isOpen}
                    onClose={handleDrawer}
                >
                    <Box className="address-drawer" sx={{ width: { xs: "90vw", md: '50vw' } }} id='main-drawer' >
                        <MdOutlineClose style={{ cursor: 'pointer' }} size={25} onClick={() => handleDrawer(false)} />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>

                            <h4 style={{ paddingLeft: '1rem', marginTop: '2rem' }}>Edit Product</h4>

                        </Box>


                        <form action="" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '1rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexDirection: { xs: 'column', md: 'row' } }}>

                                <TextField label="Title" variant="outlined" name='title' onChange={handleChange} value={productData.title} sx={{ flexBasis: '100%' }} />
                                <TextField label="Price" variant="outlined" name='price' onChange={handleChange} value={productData.price} sx={{ flexBasis: '100%' }} />
                            </Box>


                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexDirection: { xs: 'column', md: 'row' } }}>
                                <TextField label="Carat" variant="outlined" name='carat' onChange={handleChange} value={productData.carat} sx={{ flexBasis: '100%' }} />
                                <TextField label="Quantity" variant="outlined" name='quantity' onChange={handleChange} value={productData.quantity} sx={{ flexBasis: '100%' }} />
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexDirection: { xs: 'column', md: 'row' } }}>

                                <FormControl variant="outlined" sx={{ flexBasis: '100%' }}>
                                    <InputLabel >Category</InputLabel>
                                    <Select
                                        value={productData.catagory}
                                        onChange={handleChange}
                                        label="State"
                                        name='catagory'
                                    >
                                        <MenuItem value="None">None</MenuItem>
                                        <MenuItem value="natural">Natural</MenuItem>
                                        <MenuItem value="lab grown">Lab Grown</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl variant="outlined" sx={{ flexBasis: '100%' }}>
                                    <InputLabel >Shape</InputLabel>
                                    <Select
                                        value={productData.shape}
                                        onChange={handleChange}
                                        label="State"
                                        name='shape'
                                    >
                                        <MenuItem value="None">None</MenuItem>
                                        {
                                            listCategory.map((e)=>{
                                                return ( <MenuItem value={e._id}>{e.category}</MenuItem>)
                                            })
                                        }
                                        {/* <MenuItem value="Round">Round</MenuItem>
                                        <MenuItem value="Oval">Oval</MenuItem>
                                        <MenuItem value="Heart">Heart</MenuItem>
                                        <MenuItem value="Emerald ">Emerald  </MenuItem>
                                        <MenuItem value="Marquise "> Marquise </MenuItem>
                                        <MenuItem value="Pear"> Pear </MenuItem>
                                        <MenuItem value="Asscher">Asscher </MenuItem>
                                        <MenuItem value="Rose"> Rose </MenuItem> */}
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexDirection: { xs: 'column', md: 'row' } }}>
                                <FormControl variant="outlined" sx={{ flexBasis: '100%' }}>
                                    <InputLabel>Color</InputLabel>
                                    <Select
                                        value={productData.colour}
                                        onChange={handleChange}
                                        label="State"
                                        name='colour'
                                    >
                                        <MenuItem value="None">None</MenuItem>
                                        <MenuItem value="D">D</MenuItem>
                                        <MenuItem value="E">E</MenuItem>
                                        <MenuItem value="F">F </MenuItem>
                                        <MenuItem value="G">G</MenuItem>
                                        <MenuItem value="H">H  </MenuItem>
                                        <MenuItem value="J"> J </MenuItem>
                                        <MenuItem value="K"> K </MenuItem>
                                        <MenuItem value="L">L </MenuItem>
                                        <MenuItem value="M"> M </MenuItem>
                                        <MenuItem value="OP"> OP </MenuItem>
                                        <MenuItem value="QR"> QR </MenuItem>
                                        <MenuItem value="ST"> ST </MenuItem>
                                        <MenuItem value="UV"> UV </MenuItem>
                                        <MenuItem value="WX"> WX </MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl variant="outlined" sx={{ flexBasis: '100%' }}>
                                    <InputLabel >Clarity</InputLabel>
                                    <Select
                                        value={productData.clarity}
                                        onChange={handleChange}
                                        label="State"
                                        name='clarity'
                                    >
                                        <MenuItem value="None">None</MenuItem>
                                        <MenuItem value="FL">FL</MenuItem>
                                        <MenuItem value="IF">IF</MenuItem>
                                        <MenuItem value="VVS1">VVS1 </MenuItem>
                                        <MenuItem value="VVS2">VVS2</MenuItem>
                                        <MenuItem value="VS1">VS1  </MenuItem>
                                        <MenuItem value="VS2"> VS2 </MenuItem>
                                        <MenuItem value="SI1"> SI1 </MenuItem>
                                        <MenuItem value="SI2">SI2 </MenuItem>
                                        <MenuItem value="I1"> I1 </MenuItem>
                                        <MenuItem value="I2"> I2 </MenuItem>
                                        <MenuItem value="I3"> I3 </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexDirection: { xs: 'column', md: 'row' } }}>

                                <FormControl variant="outlined" sx={{ flexBasis: '100%' }}>
                                    <InputLabel >Cut</InputLabel>
                                    <Select
                                        value={productData.cut}
                                        onChange={handleChange}
                                        label="State"
                                        name='cut'
                                    >
                                        <MenuItem value="None">None</MenuItem>
                                        <MenuItem value="Ideal">Ideal</MenuItem>
                                        <MenuItem value="Excellent">Excellent </MenuItem>
                                        <MenuItem value="Very good">Very good </MenuItem>
                                        <MenuItem value="Good">Good</MenuItem>
                                        <MenuItem value="Fair">Fair  </MenuItem>
                                        <MenuItem value="Poor"> Poor </MenuItem>
                                        <MenuItem value="8x"> 8x </MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl variant="outlined" sx={{ flexBasis: '100%' }}>
                                    <InputLabel>Polish</InputLabel>
                                    <Select
                                        value={productData.polish}
                                        onChange={handleChange}
                                        label="State"
                                        name='polish'
                                    >
                                        <MenuItem value="None">None</MenuItem>
                                        <MenuItem value="VG">VG</MenuItem>
                                        <MenuItem value="EX">EX</MenuItem>

                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexDirection: { xs: 'column', md: 'row' } }}>


                                <FormControl variant="outlined" sx={{ flexBasis: '100%' }}>
                                    <InputLabel >Summetry</InputLabel>
                                    <Select
                                        value={productData.symmetry}
                                        onChange={handleChange}
                                        label="State"
                                        name='symmetry'
                                    >
                                        <MenuItem value="None">None</MenuItem>
                                        <MenuItem value="Excellent">Excellent</MenuItem>
                                        <MenuItem value="Very good">Very good </MenuItem>
                                        <MenuItem value="Good"> Good </MenuItem>
                                        <MenuItem value="Fair">Fair  </MenuItem>
                                        <MenuItem value="Poor"> Poor </MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" sx={{ flexBasis: '100%' }}>
                                    <InputLabel>Fluorescence</InputLabel>
                                    <Select
                                        onChange={handleChange}
                                        label="State"
                                        name='fluorescence'
                                        value={productData.fluorescence}
                                    >
                                        <MenuItem value="None">None</MenuItem>
                                        <MenuItem value="Faint">Faint</MenuItem>
                                        <MenuItem value="Medium">Medium </MenuItem>
                                        <MenuItem value="Strong"> Strong  </MenuItem>
                                        <MenuItem value="Very strong">Very strong  </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>


                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexDirection: { xs: 'column', md: 'row' } }}>
                                <TextField label="Table" variant="outlined" name='table' value={productData.table} onChange={handleChange} sx={{ flexBasis: '100%' }} />
                                <TextField label="Depth" variant="outlined" name='depth' value={productData.depth} onChange={handleChange} sx={{ flexBasis: '100%' }} />

                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexDirection: { xs: 'column', md: 'row' } }}>
                                <TextField label="Radio" variant="outlined" name='ratio' value={productData.ratio} onChange={handleChange} sx={{ flexBasis: '100%' }} />
                                <TextField label="Crownangle" variant="outlined" name='crownangle' value={productData.crownangle} onChange={handleChange} sx={{ flexBasis: '100%' }} />

                            </Box>


                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexDirection: { xs: 'column', md: 'row' } }}>

                                <TextField label="Crownheight" variant="outlined" name='crownheight' value={productData.crownheight} onChange={handleChange} sx={{ flexBasis: '100%' }} />

                            </Box>












                            <Button type='submit' variant="contained" style={{ marginTop: '1rem' }} >Save Address</Button>
                        </form>

                    </Box>
                </Drawer>
            </Fragment>
        </>
    )
}

export default EditDiamond