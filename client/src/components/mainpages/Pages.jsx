import React, {useContext} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Products from './products/Products.jsx'
import DetailProduct from './detailProduct/DetailProduct.jsx'
import Login from './auth/Login.jsx'
import Register from './auth/Register.jsx'
import OrderHistory from './history/OrderHistory.jsx'
import OrderDetails from './history/OrderDetails.jsx'
import Cart from './cart/Cart.jsx'
import NotFound from './utils/not_found/NotFound.jsx'
import Categories from './categories/Categories.jsx'
import CreateProduct from './createProduct/CreateProduct.jsx'
import Home from './home/Home.jsx'

import {GlobalState} from '../../GlobalState.jsx'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <Routes>
        <Route path="/" element={isLogged ? <Products /> : <Home />} />
        <Route path="/detail/:id" element={<DetailProduct />} />
        
        <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
        <Route path="/register" element={isLogged ? <NotFound /> : <Register />} />
        
        <Route path="/category" element={isAdmin ? <Categories /> : <NotFound />} />
        <Route path="/create_product" element={isAdmin ? <CreateProduct /> : <NotFound />} />
        <Route path="/edit_product/:id" element={isAdmin ? <CreateProduct /> : <NotFound />} />
        
        <Route path="/history" element={isLogged ? <OrderHistory /> : <NotFound />} />
        <Route path="/history/:id" element={isLogged ? <OrderDetails /> : <NotFound />} />
        
        <Route path="/cart" element={<Cart />} />
        
        <Route path="*" element={<NotFound />} />
        
        </Routes>
    )
}

export default Pages
