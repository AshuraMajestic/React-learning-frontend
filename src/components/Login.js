import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const backendUrl = "https://react-learning-backend.onrender.com";
export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })

    const handleLogin = async () => {
        let result = await fetch(`${backendUrl}/login`, {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        result = await result.json();
        if (result.token) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.token));
            navigate('/');

        } else {
            alert('please enter correct details');
        }
    }
    return (
        <div>
            <div className='login'>
                <h1>Login</h1>
                <input type="text" className='inputBox' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Email' />
                <input type="password" className='inputBox' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter Password' />
                <button type='button' onClick={handleLogin} className='appButton'>Login</button>
            </div>
        </div>
    )
}
