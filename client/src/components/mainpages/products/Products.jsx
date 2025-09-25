import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState.jsx'
import ProductItem from '../utils/productItem/ProductItem.jsx'
import Loading from '../utils/loading/Loading.jsx'
import axios from 'axios'
import Filters from './Filters.jsx'
import LoadMore from './LoadMore.jsx'


function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters />
        
        {
            isAdmin && 
            <div className="text-right my-5 max-sm:my-5">
                <span className="uppercase text-blue-500 tracking-wider">Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} className="h-6 w-6 translate-y-1 mx-4" />
                <button onClick={deleteAll} className="border border-red-600 px-6 py-2.5 text-red-600 uppercase">Delete ALL</button>
            </div>
        }

        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-items-center my-5">
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product}
                    isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                })
            } 
        </div>

        <LoadMore />
        {products.length === 0 && <Loading />}
        </>
    )
}

export default Products
