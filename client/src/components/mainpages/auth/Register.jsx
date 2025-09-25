import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [user, setUser] = useState({
        name:'', email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="max-w-[500px] border-2 border-sideline-accent rounded-md p-8 my-12 mx-auto text-black max-sm:px-4 max-sm:py-8">
            <form onSubmit={registerSubmit}>
                <h2 className="uppercase tracking-wider text-black">Register</h2>
                <input type="text" name="name" required
                placeholder="Name" value={user.name} onChange={onChangeInput} 
                className="w-full h-10 my-2.5 px-1 text-black rounded-2xl" />

                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} 
                className="w-full h-10 my-2.5 px-1 text-black rounded-2xl" />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} 
                className="w-full h-10 my-2.5 px-1 text-black rounded-2xl" />

                <div className="flex justify-between items-center text-black">
                    <button type="submit" className="w-[150px] bg-sideline-accent text-white text-lg uppercase tracking-wider">Register</button>
                    <Link to="/login" className="text-black text-lg tracking-wider uppercase">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register
