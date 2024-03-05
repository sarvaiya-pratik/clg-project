import React, { useEffect, useState } from 'react';
import "./style.css";
import axios from "axios"

import Loader from "../../../common/Loader/Loader"

import { ToastContainer, toast } from 'react-toastify'

const AddDiamond = ({ slider }) => {
    let [ddata, setDdata] = useState({})
    const [selectedFile, setSelectedFile] = useState(null);
    const [load, setLoad] = useState(false)
    const [listCategory, setListCategory] = useState([]);
    useEffect(() => {
        axios.get('/products/category/all').then((r) => {
            setListCategory(r.data.category);

        }).catch((err) => {
            console.log(err)
        });
    }, []);

    const handlechange = (e) => {
        setDdata({ ...ddata, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true)
        const formData = new FormData()
        formData.append('imguri', selectedFile)

        Object.keys(ddata).forEach((key) => {
            formData.append(key, ddata[key])
        })

        try {

            let response = await axios.post("/products/add", formData, { withCredentials: true })
            setLoad(false)

            if (response.status == 201) {
                setSelectedFile(null)
                toast.success(response.data.message)
            }
        } catch (error) {
            setLoad(false)
            toast.error(error.response.data.error)

        }
    }

    return (
        <>
            <ToastContainer position="bottom-right" />
            {
                load ? <Loader /> :
                    <div id='addDiamond' className='content-admin' style={{ marginLeft: slider && '20%' }}>
                        <h2 className='admin-header'> ADD DIAMONDS </h2>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="all-controls">
                                <div className="form-con">
                                    <span >Title</span>
                                    <input type="text" name='title' onChange={handlechange} />
                                </div>
                                <div className="form-con">
                                    <span>Catagory</span>
                                    <select name="catagory" id="" onChange={handlechange}>
                                        <option value='none' >Select Category</option>
                                        <option value="natural">Natural</option>
                                        <option value="lab grown"  >Lab Grown</option>
                                    </select>
                                </div>
                                <div className="form-con">
                                    <span>Shape</span>
                                    <select name="shape" id="" onChange={handlechange}>
                                        <option value='none'>Select Shape</option>
                                        {
                                            listCategory.map((e) => {
                                                return (<option value={e._id}>{e.category}</option>)
                                            })
                                        }
                                        {/* <option value="Round">Round</option>
                                        <option value="Oval">Oval</option>
                                        <option value="Heart">Heart</option>
                                        <option value="Emerald">Emerald  </option>
                                        <option value="Marquise"> Marquise </option>
                                        <option value="Pear"> Pear </option>
                                        <option value="Asscher">Asscher </option>
                                        <option value="Rose"> Rose </option> */}
                                    </select>
                                </div>
                                <div className="form-con">
                                    <span >Price</span>
                                    <input type="number" name='price' onChange={handlechange} />
                                </div>

                                <div className="form-con">
                                    <span >Carat</span>

                                    <span>
                                        <input className='ctinput' type="number" name='carat' onChange={handlechange} />
                                        ct
                                    </span>
                                </div>

                                <div className="form-con">
                                    <span>Color</span>
                                    <select name="colour" id="" onChange={handlechange}>
                                        <option value='none'>Select Color</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                        <option value="F">F </option>
                                        <option value="G">G</option>
                                        <option value="H">H  </option>
                                        <option value="J"> J </option>
                                        <option value="K"> K </option>
                                        <option value="L">L </option>
                                        <option value="M"> M </option>
                                        <option value="OP"> OP </option>
                                        <option value="QR"> QR </option>
                                        <option value="ST"> ST </option>
                                        <option value="UV"> UV </option>
                                        <option value="WX"> WX </option>
                                    </select>
                                </div>
                                <div className="form-con">
                                    <span>Clarity</span>
                                    <select name="clarity" id="" onChange={handlechange}>
                                        <option value='none'>Select Clarity</option>
                                        <option value="FL">FL</option>
                                        <option value="IF">IF</option>
                                        <option value="VVS1">VVS1 </option>
                                        <option value="VVS2">VVS2</option>
                                        <option value="VS1">VS1  </option>
                                        <option value="VS2"> VS2 </option>
                                        <option value="SI1"> SI1 </option>
                                        <option value="SI2">SI2 </option>
                                        <option value="I1"> I1 </option>
                                        <option value="I2"> I2 </option>
                                        <option value="I3"> I3 </option>
                                    </select>
                                </div>
                                <div className="form-con">
                                    <span>Cut</span>
                                    <select name="cut" id="" onChange={handlechange}>
                                        <option value='none'>Select Cut</option>
                                        <option value="Ideal">Ideal</option>
                                        <option value="Excellent">Excellent </option>
                                        <option value="Very good">Very good </option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair  </option>
                                        <option value="Poor"> Poor </option>
                                        <option value="8x"> 8x </option>
                                    </select>
                                </div>
                                <div className="form-con">
                                    <span>Polish</span>
                                    <select name="polish" id="" onChange={handlechange}>
                                        <option value='none'>Select Polish</option>
                                        <option value="GD">GD</option>
                                        <option value="VG">VG</option>
                                        <option value="EX">EX</option>
                                    </select>
                                </div>
                                <div className="form-con">
                                    <span>Summetry</span>
                                    <select name="symmetry" id="" onChange={handlechange}>
                                        <option value='none'>Select Summetry</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Very good">Very good </option>
                                        <option value="Good"> Good </option>
                                        <option value="Fair">Fair  </option>
                                        <option value="Poor"> Poor </option>
                                    </select>
                                </div>
                                <div className="form-con">
                                    <span>Fluorescence </span>
                                    <select name="fluorescence" id="" onChange={handlechange}>
                                        <option value='none'>Select Fluorescence</option>
                                        <option value="Faint">Faint</option>
                                        <option value="Medium">Medium </option>
                                        <option value="Strong"> Strong  </option>
                                        <option value="Very strong">Very strong  </option>

                                    </select>
                                </div>
                                <div className="form-con">
                                    <span >Table</span>
                                    <input type="number" name='table' onChange={handlechange} />
                                </div>
                                <div className="form-con">
                                    <span >Depth</span>
                                    <input type="number" name='depth' onChange={handlechange} />
                                </div>
                                <div className="form-con">
                                    <span >Radio</span>
                                    <input type="number" name='ratio' onChange={handlechange} />
                                </div>
                                <div className="form-con">
                                    <span >Crownangle </span>
                                    <input type="number" name='crownangle' onChange={handlechange} />
                                </div>
                                <div className="form-con">
                                    <span >Crownheight </span>
                                    <input type="number" name='crownheight' onChange={handlechange} />
                                </div>

                                <div className="form-con">
                                    <span >Quantity </span>
                                    <input type="number" name='quantity' onChange={handlechange} />
                                </div>
                                {/* <div className="form-con">
                                    <span >Select Img</span>
                                    <input type="file" name='file' onChange={(e) => setSelectedFile(e.target.files[0])} />
                                </div> */}

                                <div class="file-upload-form">
                                    <label for="file" class="file-upload-label">
                                        <div class="file-upload-design">
                                            <svg viewBox="0 0 640 512" height="1em">
                                                <path
                                                    d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                                                ></path>
                                            </svg>
                                            <p>Drag and Drop</p>
                                            <p>or</p>
                                            <span class="browse-button">Browse file</span>
                                        </div>
                                        <input id="file" type="file" name='imguri' onChange={(e) => setSelectedFile(e.target.files[0])} />
                                    </label>
                                    {selectedFile?.type.startsWith('image') ? (
                                        <img
                                            src={URL.createObjectURL(selectedFile)}
                                            alt="Uploaded Preview"
                                            style={{ maxWidth: '100%', maxHeight: '200px', marginLeft: '20px' }}
                                        />
                                    ) : (
                                        <p style={{ marginLeft: '20px' }}>Preview</p>
                                    )}
                                    {/* <div className="preview">
                                        <img src={URL.createObjectURL(selectedFile)} width="100px" height="100px" alt="Uploaded Preview" />
                                    </div> */}
                                </div>


                            </div>
                            <button type="submit" className="adminaddbtn">
                                <span className="button__text">Add Diamond</span>
                                <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                            </button>
                        </form>
                    </div>
            }


        </>
    )
}

export default AddDiamond
