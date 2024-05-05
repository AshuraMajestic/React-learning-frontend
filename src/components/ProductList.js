import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: { authorization: JSON.parse(localStorage.getItem('token')) }
        });
        result = await result.json();
        setProducts(result);
    }
    const deleteProducts = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'delete',
            headers: { authorization: JSON.parse(localStorage.getItem('token')) },
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,
                {
                    headers: { authorization: JSON.parse(localStorage.getItem('token')) }
                }
            );
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
    }



    return (
        <div className='product-list'>
            <h3>Product List</h3>
            <input type='text' className='search-product' onChange={searchHandle} placeholder='Search Product' />
            <ul>
                <li>S.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => deleteProducts(item._id)}>Delete</button>
                            <Link to={'/update/' + item._id}>Update</Link>
                        </li>
                    </ul>
                )
                    : <h1>No Result Found</h1>
            }
        </div >
    )
}
