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

const Summetry = () => {
    const [color, setColor] = useState('');
    let [listCategory, setListCategory] = useState([]);
    const [mode, setMode] = useState(false);
    const [oldValue, setOldValue] = useState();
    const [newColor, setColorValue] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get('/other/summetry').then((r) => {
            const summetryArray = r.data.color[0].summetry;
            const sortedsummetryArray = summetryArray.slice().sort();
            setListCategory(sortedsummetryArray);
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
        axios.post('/other/summetry', { color }).then((r) => {
            setListCategory(r.data.color[0].summetry);
            setColor('');
            setLoading(false)
            if (r.status == 201) {
                toast.success("summetry Added Succesfully !")

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
        axios.put(`/other/summetry/${oldValue}`, { newColor })
            .then((r) => {
                const summetryArray = r.data.color[0].summetry;
                const sortedsummetryArray = summetryArray.slice().sort();
                setListCategory(sortedsummetryArray);
                setLoading(false)
                toast.success("summetry Updated !")
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
                    onClick: () => axios.delete(`/other/summetry/${item}`)
                        .then((r) => {
                            const summetryArray = r.data.color[0].summetry;
                            const sortedsummetryArray = summetryArray.slice().sort(); 
                            setListCategory(sortedsummetryArray);
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
                    <h2 className='admin-header'>summetry</h2>
                    <div className='container'>
                        <div className='add-category'>
                            {mode ? (
                                <div class='input-container'>
                                    <input
                                        type='text'
                                        placeholder='Edit summetry'
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
                                        placeholder='Add summetry'
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

export default Summetry;
