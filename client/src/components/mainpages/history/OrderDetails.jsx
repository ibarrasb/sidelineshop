import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState.jsx'

function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    },[params.id, history])


    if(orderDetails.length === 0) return null;

    return (
        <div className="overflow-x-auto">
            <table className="mx-auto w-full border border-gray-300 border-collapse">
                <thead>
                    <tr>
                        <th className="text-center p-2.5 capitalize border border-gray-300">Name</th>
                        <th className="text-center p-2.5 capitalize border border-gray-300">Address</th>
                        <th className="text-center p-2.5 capitalize border border-gray-300">Postal Code</th>
                        <th className="text-center p-2.5 capitalize border border-gray-300">Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border border-gray-300">
                        <td className="text-center p-2.5 capitalize border border-gray-300">{orderDetails.address.recipient_name}</td>
                        <td className="text-center p-2.5 capitalize border border-gray-300">{orderDetails.address.line1 + " - " + orderDetails.address.city}</td>
                        <td className="text-center p-2.5 capitalize border border-gray-300">{orderDetails.address.postal_code}</td>
                        <td className="text-center p-2.5 capitalize border border-gray-300">{orderDetails.address.country_code}</td>
                    </tr>
                </tbody>
            </table>

            <table className="mx-auto w-full border border-gray-300 border-collapse my-8">
                <thead>
                    <tr>
                        <th className="text-center p-2.5 capitalize border border-gray-300"></th>
                        <th className="text-center p-2.5 capitalize border border-gray-300">Products</th>
                        <th className="text-center p-2.5 capitalize border border-gray-300">Quantity</th>
                        <th className="text-center p-2.5 capitalize border border-gray-300">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item =>(
                        <tr key={item._id} className="border border-gray-300">
                            <td className="text-center p-2.5 capitalize border border-gray-300"><img src={item.images.url} alt="" className="w-[70px] h-[100px] object-cover" /></td>
                            <td className="text-center p-2.5 capitalize border border-gray-300">{item.title}</td>
                            <td className="text-center p-2.5 capitalize border border-gray-300">{item.quantity}</td>
                            <td className="text-center p-2.5 capitalize border border-gray-300">$ {item.price * item.quantity}</td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

export default OrderDetails
