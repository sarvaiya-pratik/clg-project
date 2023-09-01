import React, { useState } from 'react';
import "./style.css";
import axios from "axios"
import { Toaster, toast } from 'react-hot-toast';
const AddDiamond = ({ slider }) => {
    const [ddata, setDdata] = useState({})
    const handlechange = (e) => {
        setDdata({ ...ddata, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4001/product", ddata)
            .then((r) => {
                if (r.status === 201) {
                    toast.success("Diamond added successfully !")
                }
                else {
                    toast.error(r.data.message)
                }
            })
    }

    return (
        <>
            <div id='addDiamond' className='content-admin' style={{ marginLeft: slider && '20%' }}>
                <h2> ADD DIAMONDS </h2>
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
                                <option value="round">Round</option>
                                <option value="oval">Oval</option>
                                <option value="princess ">Princess </option>
                                <option value="heart">Heart</option>
                                <option value="emerald ">Emerald  </option>
                                <option value="marquise "> Marquise </option>
                                <option value="pear "> Pear </option>
                                <option value="asscher ">Asscher </option>
                                <option value="star "> Star </option>
                                <option value=" rose "> Rose </option>
                            </select>
                        </div>
                        <div className="form-con">
                            <span >Price</span>
                            <input type="number" name='price' onChange={handlechange} />
                        </div>
                        <div className="form-con">
                            <span >Video url</span>
                            <input type="text" name='threesixty' onChange={handlechange} />
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
                                <option value="F ">F </option>
                                <option value="G">G</option>
                                <option value="H ">H  </option>
                                <option value="J "> J </option>
                                <option value="K "> K </option>
                                <option value="L ">L </option>
                                <option value="M "> M </option>
                                <option value=" OP "> OP </option>
                                <option value=" QR "> QR </option>
                                <option value=" ST "> ST </option>
                                <option value=" UV "> UV </option>
                                <option value=" WX "> WX </option>
                            </select>
                        </div>
                        <div className="form-con">
                            <span>Clarity</span>
                            <select name="clarity" id="" onChange={handlechange}>
                                <option value='none'>Select Clarity</option>
                                <option value="FL">FL</option>
                                <option value="IF">IF</option>
                                <option value="VVS1 ">VVS1 </option>
                                <option value="VVS2">VVS2</option>
                                <option value="VS1 ">VS1  </option>
                                <option value="VS2 "> VS2 </option>
                                <option value="SI1 "> SI1 </option>
                                <option value="SI2 ">SI2 </option>
                                <option value="I1 "> I1 </option>
                                <option value=" I2 "> I2 </option>
                                <option value=" I3 "> I3 </option>
                            </select>
                        </div>
                        <div className="form-con">
                            <span>Cut</span>
                            <select name="cut" id="" onChange={handlechange}>
                                <option value='none'>Select Cut</option>
                                <option value="Ideal">Ideal</option>
                                <option value="Excellent ">Excellent </option>
                                <option value="Very good ">Very good </option>
                                <option value="Good">Good</option>
                                <option value="Fair ">Fair  </option>
                                <option value="Poor "> Poor </option>
                                <option value="8x "> 8x </option>
                            </select>
                        </div>
                        <div className="form-con">
                            <span>Polish</span>
                            <select name="polish" id="" onChange={handlechange}>
                                <option value='none'>Select Cut</option>
                                <option value="Ideal">Ideal</option>
                                <option value="Excellent ">Excellent </option>
                                <option value="Very good ">Very good </option>
                                <option value="Good">Good</option>
                                <option value="Fair ">Fair  </option>
                                <option value="Poor "> Poor </option>
                                <option value="8x "> 8x </option>
                            </select>
                        </div>
                        <div className="form-con">
                            <span>Summetry</span>
                            <select name="symmetry" id="" onChange={handlechange}>
                                <option value='none'>Select Summetry</option>
                                <option value="Excellent">Excellent</option>
                                <option value="Very good">Very good </option>
                                <option value="Good"> Good </option>
                                <option value="Fair ">Fair  </option>
                                <option value="Poor "> Poor </option>
                            </select>
                        </div>
                        <div className="form-con">
                            <span>Fluorescence </span>
                            <select name="fluorescence" id="" onChange={handlechange}>
                                <option value='none'>Select Fluorescence</option>
                                <option value="Faint">Faint</option>
                                <option value="Medium">Medium </option>
                                <option value="Strong "> Strong  </option>
                                <option value="Very strong ">Very strong  </option>

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
                            <span >Pavilionangle  </span>
                            <input type="number" name='pavilionangle' onChange={handlechange} />
                        </div>
                        <div className="form-con">
                            <span >Paviliondepth </span>
                            <input type="number" name='paviliondepth' onChange={handlechange} />
                        </div>

                    </div>
                    <button type="submit" class="adminaddbtn">
                        <span class="button__text">Add Diamond</span>
                        <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                    </button>
                </form>
            </div>
            <Toaster />
        </>
    )
}

export default AddDiamond
