import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState.jsx'
import {Link} from 'react-router-dom'
import axios from 'axios'

function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    

    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                if(isAdmin){
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }else{
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }
            }
            getHistory()
        }
    },[token, isAdmin, setHistory])

    return (
        <div className="overflow-x-auto">
            <h2 className="text-center my-5 uppercase tracking-wider">History</h2>

            <h4 className="text-center my-5 uppercase tracking-wider">You have {history.length} ordered</h4>

            <table className="mx-auto w-full border border-gray-300 border-collapse">
                <thead>
                    <tr>
                        <th className="text-center p-2.5 capitalize border border-gray-300">Payment ID</th>
                        <th className="text-center p-2.5 capitalize border border-gray-300">Date of Purchased</th>
                        <th className="text-center p-2.5 capitalize border border-gray-300"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            <tr key={items._id} className="border border-gray-300">
                                <td className="text-center p-2.5 capitalize border border-gray-300">{items.paymentID}</td>
                                <td className="text-center p-2.5 capitalize border border-gray-300">{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td className="text-center p-2.5 capitalize border border-gray-300"><Link to={`/history/${items._id}`} className="text-blue-500">View</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory
