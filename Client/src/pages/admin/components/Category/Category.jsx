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


const Category = () => {
    const [category, setCategory] = useState('');
    const [listCategory, setListCategory] = useState([]);
    const [mode, setMode] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState();
    const [editCategoryValue, setEditCategoryValue] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get('/products/category/all').then((r) => {
            setListCategory(r.data.category);
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        });
    }, []);

    const handleChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = () => {
        setLoading(true)
        axios.post('/products/category', { category }).then((r) => {
            setListCategory(r.data.category);
            setCategory('');
            setLoading(false)
            toast.success("Category Added Succesfully !")
        }
        ).catch((err) => {
            setLoading(false)
        });
    };


    const handleEdit = (id, value) => {
        setEditCategoryId(id);
        setEditCategoryValue(value);
        setMode(!mode);
    };

    const handleUpdateChange = (e) => {
        setEditCategoryValue(e.target.value);
    };

    const handleUpdate = () => {
        setLoading(true)
        axios.put(`/products/category/${editCategoryId}`, { editCategoryValue })
            .then((r) => {
                setListCategory(r.data.category)
                setLoading(false)
                toast.success("Category Updated !")
            })
            .catch((err) => {
                setLoading(false)
            })
        setMode(false);
        setEditCategoryId('');
        setEditCategoryValue('');

    };

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to delete this category ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => axios.delete(`/products/category/${id}`)
                        .then((r) => {
                            setListCategory(r.data.category)
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
                    <h2 className='admin-header'>Shapes</h2>
                    <div className='container'>
                        <div className='add-category'>
                            {mode ? (
                                <div class='input-container'>
                                    <input
                                        type='text'
                                        placeholder='Edit Shape'
                                        onChange={handleUpdateChange}
                                        value={editCategoryValue}
                                    />
                                    <button class='button' onClick={handleUpdate}>
                                        Update
                                    </button>
                                </div>
                            ) : (
                                <div class='input-container'>
                                    <input
                                        type='text'
                                        placeholder='Add Shape'
                                        onChange={handleChange}
                                        value={category}
                                    />
                                    <button class='button' onClick={handleSubmit}>
                                        Add
                                    </button>
                                </div>
                            )}
                        </div>
                        <ul>
                            {listCategory?.map((item) => (
                                <li key={item._id}>
                                    <span>{item.category}</span>
                                    <span>
                                        <CiEdit
                                            style={{ marginRight: '10px' }}
                                            onClick={() => handleEdit(item._id, item.category)}
                                        />
                                        <FiX onClick={() => handleDelete(item._id)} />
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

export default Category;
