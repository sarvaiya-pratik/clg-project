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

const Color = () => {
    const [color, setColor] = useState('');
    const [listCategory, setListCategory] = useState([]);
    const [mode, setMode] = useState(false);
    const [oldValue, setOldValue] = useState();
    const [newColor, setColorValue] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get('/other/color').then((r) => {
            console.log(r.data.color[0].color)
            setListCategory(r.data.color[0].color);
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        });
    }, []);

    const handleChange = (e) => {
        setColor(e.target.value);
    };

    const handleSubmit = () => {
        setLoading(true)
        axios.post('/other/color', { color }).then((r) => {
            setListCategory(r.data.color[0].color);
            setColor('');
            setLoading(false)
            toast.success("Category Added Succesfully !")
        }
        ).catch((err) => {
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
        axios.put(`/other/color/${oldValue}`, { newColor })
            .then((r) => {
                setListCategory(r.data.color[0].color)
                setLoading(false)
                toast.success("Category Updated !")
            })
            .catch((err) => {
                setLoading(false)
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
                    onClick: () => axios.delete(`/other/color/${item}`)
                        .then((r) => {
                            setListCategory(r.data.color[0].color)
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
                    <h2 className='admin-header'>Colors</h2>
                    <div className='container'>
                        <div className='add-category'>
                            {mode ? (
                                <div class='input-container'>
                                    <input
                                        type='text'
                                        placeholder='Edit Color'
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
                                        placeholder='Add Color'
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
                            {listCategory?.map((item) => (
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

                            {
                                // listCategory.map((item)=>{

                                //   return  <li>{item}</li>
                                // })
                            }
                            {/* <li>hello</li> */}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default Color;
