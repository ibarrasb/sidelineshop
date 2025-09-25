import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState.jsx'

function BtnRender({product, deleteProduct}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

    
    return (
        <div className="w-full mt-2.5 flex bg-sideline-card justify-between">
            {
                isAdmin ? 
                <>
                    <Link to="#!" 
                    onClick={() =>deleteProduct(product._id, product.images.public_id)}
                    className="w-1/2 text-center uppercase text-white font-semibold tracking-wider py-1.5 bg-gray-600 mr-1 rounded-lg">
                        Delete
                    </Link>
                    <Link to={`/edit_product/${product._id}`}
                    className="w-1/2 text-center uppercase text-white font-semibold tracking-wider py-1.5 bg-blue-600 ml-1 rounded-lg">
                        Edit
                    </Link>
                </>
                : <>
                    <Link to="#!" onClick={() => addCart(product)}
                    className="w-1/2 text-center uppercase text-white font-semibold tracking-wider py-1.5 bg-gray-600 mr-1 rounded-lg">
                        Buy
                    </Link>
                    <Link to={`/detail/${product._id}`}
                    className="w-1/2 text-center uppercase text-white font-semibold tracking-wider py-1.5 bg-blue-600 ml-1 rounded-lg">
                        View
                    </Link>
                </>
            }
        </div>
    )
}

export default BtnRender
