import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState.jsx'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_product">Create</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }
    const resetMenu = (state) => {
        if(state){
            setMenu(!state)
        }
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header className="min-h-[70px] w-full overflow-hidden flex flex-wrap justify-around items-center max-md:justify-between">
            <div className="hidden max-md:block cursor-pointer" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="flex-1 max-md:min-w-[115px] max-md:flex-none">
                <h1>
                    <Link className="font-dancing text-5xl ml-4 text-sideline-logo" to="/">{isAdmin ? 'Admin' : 'Sideline'}</Link>
                </h1>
            </div>

            <ul style={styleMenu} className="max-md:fixed max-md:top-0 max-md:w-full max-md:h-screen max-md:flex max-md:flex-col max-md:justify-around max-md:items-center max-md:opacity-[0.98] max-md:z-[99] max-md:text-[55px] max-md:transition-[0.5s_ease-in] max-md:py-2.5">
                <li className="inline-block opacity-70 px-5 hover:opacity-100"><Link to="/" className="text-black">{
                    isLogged ? 'Shop' : ''
                    
            } </Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li className="inline-block opacity-70 px-5 hover:opacity-100"><Link onClick={() => setMenu(!menu)} to="/login" className="text-black">Login</Link></li>
                }

                <li onClick={() => setMenu(!menu)} className="inline-block opacity-70 px-5 hover:opacity-100 hidden max-md:block cursor-pointer">
                    <img src={Close} alt="" width="30" />
                </li>

            </ul>

            {
                !isLogged || isAdmin ? '' 
                :<div className="relative mr-5">
                    <span className="bg-red-600 rounded-full text-white absolute -top-2.5 -right-2.5 px-1.5 py-1 text-xs">{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }
            
        </header>
    )
}

export default Header
