import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
const backendUrl = "https://react-learning-backend.onrender.com";
export default function UpdateProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();


    const getProductDetails = async () => {

        let result = await fetch(`${backendUrl}/product/${params.id}`, {
            headers: { authorization: JSON.parse(localStorage.getItem('token')) }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }
    useEffect(() => {
        getProductDetails();
    }, []);
    const handleUpdateProduct = async () => {
        let result = await fetch(`${backendUrl}/product/${params.id}`,
            {
                method: 'put',
                body: JSON.stringify({ name, price, category, company }),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: JSON.parse(localStorage.getItem('token'))
                }
            });
        result = await result.json();
        if (result) {
            navigate('/');
        }
        else {
            alert('Error in update')
        }
    }
    return (
        <div className='updateProduct'>
            <h1>Update Product</h1>
            <input type="text" className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Product Name' />


            <input type="text" className='inputBox' value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter Product Price' />


            <input type="text" className='inputBox' value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder='Enter Product Category' />


            <input type="text" className='inputBox' value={company} onChange={(e) => { setCompany(e.target.value) }} placeholder='Enter Product Company' />


            <button className='appButton' onClick={handleUpdateProduct}>Update Product</button>
        </div>
    )
}
