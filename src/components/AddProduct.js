import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const backendUrl = "https://react-learning-backend.onrender.com";
export default function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const handleAddProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        const userId = await JSON.parse(localStorage.getItem('user'))._id;

        // let result = await fetch('http://localhost:5000/addProduct', {
        let result = await fetch(`${backendUrl}/addProduct`, {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization: JSON.parse(localStorage.getItem('token'))

            }
        });
        result = await result.json();
        if (result.name) {
            navigate('/');
        } else {
            alert('please enter correct details');
        }
    }
    return (
        < div className='addProduct' >
            <h1>Add Product</h1>
            <input type="text" className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Product Name' />
            {error && !name && <span className='errorMessage'>Enter valid Name</span>}

            <input type="text" className='inputBox' value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter Product Price' />
            {error && !price && <span className='errorMessage'>Enter valid Price</span>}

            <input type="text" className='inputBox' value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder='Enter Product Category' />
            {error && !category && <span className='errorMessage'>Enter valid Category</span>}

            <input type="text" className='inputBox' value={company} onChange={(e) => { setCompany(e.target.value) }} placeholder='Enter Product Company' />
            {error && !company && <span className='errorMessage'>Enter valid Company</span>}

            <button className='appButton' onClick={handleAddProduct}>Add Product</button>
        </ div>
    )
}
