import React from 'react'
import BtnRender from './BtnRender.jsx'

function ProductItem({product, isAdmin, deleteProduct, handleCheck}) {

    return (
        <div className="max-w-[300px] overflow-hidden h-[500px] p-4 bg-sideline-card shadow-[0_0_15px_gray] my-2.5 relative rounded-2xl">
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} className="absolute w-6 h-6" />
            }
            <img src={product.images.url} alt="" className="w-full h-[300px] block object-cover" />

            <div className="bg-sideline-card">
                <h2 title={product.title} className="w-full text-ellipsis overflow-hidden whitespace-nowrap bg-sideline-card capitalize cursor-pointer text-sideline-text">{product.title}</h2>
                <span className="text-red-600 bg-sideline-card">${product.price}</span>
                <p className="w-full line-clamp-3 bg-sideline-card h-[70px] overflow-hidden text-sideline-text">{product.description}</p>
            </div>

            <BtnRender product={product} deleteProduct={deleteProduct} />
        </div>
    )
}

export default ProductItem
