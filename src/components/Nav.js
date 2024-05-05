import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Nav() {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/signup")
    }
    return (
        <div>
            <img src='https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714809600&semt=sph' alt='logo' className='logo'></img>
            {auth ? <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>

            </ul>
                :

                <ul className='nav-ul nav-right'>
                    <li><Link to="/signup">SignUp</Link> </li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}
