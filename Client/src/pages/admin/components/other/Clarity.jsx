import { Badge, capitalize } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FiMessageCircle, FiPenTool, FiX } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';
import '../style.css';
import axios from 'axios';
import Loader from '../../../../common/Loader/Loader';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Clarity = () => {
    const [color, setColor] = useState('');
    let [listCategory, setListCategory] = useState([]);
    const [mode, setMode] = useState(false);
    const [oldValue, setOldValue] = useState();
    const [newColor, setColorValue] = useState('');
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        setLoading(true)
        axios.get('/other/clarity').then((r) => {
            const clarityArray = r.data.color[0].clarity;
            const sortedClarityArray = clarityArray.slice().sort();
            setListCategory(sortedClarityArray);
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        });

        // listCategory = listCategory.slice.sort()
    }, []);

    const handleChange = (e) => {
        setColor(e.target.value);
    };

    const handleSubmit = () => {
        setLoading(true)
        axios.post('/other/clarity', { color }).then((r) => {
            setListCategory(r.data.color[0].clarity);
            setColor('');
            setLoading(false)
            if (r.status == 201) {
                toast.success("Clarity Added Succesfully !")

            }
        //    if(r.status == 403){
        //     toast.error(r.data.message)
        //    }
        }
        ).catch((err) => {
            // console.log(err)
            toast.error(err.response.data.message)
            setLoading(false)
        });
    };


    const handleEdit = (item) => {
        // setEditCategoryId(id);
        setOldValue(item)
        setColorValue(item);
        setMode(!mode);
    };

    const handleUpdateChange = (e) => {
        setColorValue(e.target.value);
    };

    const handleUpdate = () => {
        setLoading(true)
        axios.put(`/other/clarity/${oldValue}`, { newColor })
            .then((r) => {
                const clarityArray = r.data.color[0].clarity;
                const sortedClarityArray = clarityArray.slice().sort();
                setListCategory(sortedClarityArray);
                setLoading(false)
                toast.success("Clarity Updated !")
            })
            .catch((err) => {
                // setLoading(false)
                toast.error(err.response.data.message)
            })
        setMode(false);
        setOldValue('');
        setColorValue('');

    };

    const handleDelete = (item) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to delete this Color ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => axios.delete(`/other/clarity/${item}`)
                        .then((r) => {
                            const clarityArray = r.data.color[0].clarity;
                            const sortedClarityArray = clarityArray.slice().sort(); 
                            setListCategory(sortedClarityArray);
                            setLoading(false)
                            toast.success("Category Deleted !")
                        })
                        .catch((err) => {
                            setLoading(false)
                        })
                },
                {
                    label: 'No',
                }
            ]
        });

    }


    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div id='category' className='content-admin '>
                    <h2 className='admin-header'>Clarity</h2>
                    <div className='container'>
                        <div className='add-category'>
                            {mode ? (
                                <div class='input-container'>
                                    <input
                                        type='text'
                                        placeholder='Edit clarity'
                                        onChange={handleUpdateChange}
                                        value={newColor}
                                    />
                                    <button class='button' onClick={handleUpdate}>
                                        Update
                                    </button>
                                </div>
                            ) : (
                                <div class='input-container'>
                                    <input
                                        type='text'
                                        placeholder='Add Clarity'
                                        onChange={handleChange}
                                        value={color}
                                    />
                                    <button class='button' onClick={handleSubmit}>
                                        Add
                                    </button>
                                </div>
                            )}
                        </div>
                        <ul>
                            {
                                // console.log(listCategory)

                                listCategory?.map((item) => (
                                    <li >
                                        <span>{item}</span>
                                        <span>
                                            <CiEdit
                                                style={{ marginRight: '10px' }}
                                                onClick={() => handleEdit(item)}
                                            />
                                            <FiX onClick={() => handleDelete(item)} />
                                        </span>
                                    </li>
                                ))}

                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default Clarity;
