import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })
    const collectData = async () => {
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        result = await result.json();
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.token));
        navigate("/")
    }
    return (
        <div className='register'>
            <h1>Register</h1>
            <input type="text" className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Name' />
            <input type="text" className='inputBox' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Email' />
            <input type="password" className='inputBox' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter Password' />
            <button type='button' className='appButton' onClick={collectData}>Sign up</button>
        </div>
    )
}
