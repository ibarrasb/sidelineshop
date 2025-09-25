import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState.jsx'
import ProductItem from '../utils/productItem/ProductItem.jsx'


function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() =>{
        if(params.id){
            products.sort(() => Math.random() - 0.5);
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })


        }
    },[params.id, products])

  

    if(detailProduct.length === 0) return null;

 

    return (
        <>
            <div className="w-full flex justify-around flex-wrap p-12 text-2xl max-sm:text-base max-sm:p-0">
                <img src={detailProduct.images.url} alt="" className="max-w-[400px] w-full my-5 h-[450px] object-cover block" />
                <div className="max-w-[500px] w-full mx-5 my-1">
                    <div className="flex justify-between items-center">
                        <h2 className="uppercase text-blue-800 tracking-wider font-bold">{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.product_id}</h6>
                    </div>
                    <span className="text-red-600">${detailProduct.price}</span>
                    <p className="leading-6 my-2.5 opacity-80">{detailProduct.description}</p>
                    <p className="leading-6 my-2.5 opacity-80">{detailProduct.content}</p>
                    <p className="leading-6 my-2.5 opacity-80">Sold: {detailProduct.sold}</p>
                    <Link to="/cart" className="bg-gray-800 text-white mt-2.5 px-6 py-2.5 inline-block uppercase tracking-wider rounded-lg" 
                    onClick={() => addCart(detailProduct)}>
                        Buy Now
                    </Link>
                </div>
            </div>

            <div>
                <h2>Related products</h2>
                <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-items-center my-5">
                    {
                        products.slice(3).map(product => {
                            return product.category === detailProduct.category && product._id !== detailProduct._id
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct
