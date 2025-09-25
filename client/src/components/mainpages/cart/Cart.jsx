import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState.jsx'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    // const tranSuccess = async(payment) => {
    //     const {paymentID, address} = payment;

    //     await axios.post('/api/payment', {cart, paymentID, address}, {
    //         headers: {Authorization: token}
    //     })

    //     setCart([])
    //     addToCart([])
    //     alert("You have successfully placed an order.")
    // }


    if(cart.length === 0) 
        return <h2 className="text-center text-8xl">Cart Empty</h2>

    return (
        <div>
            {
                cart.map(product => (
                    <div className="w-full flex justify-around flex-wrap p-12 text-2xl max-sm:text-base max-sm:p-0 relative border border-gray-300 scale-y-[0.98]" key={product._id}>
                        <img src={product.images.url} alt="" className="max-w-[400px] w-full my-5 h-[450px] object-cover block" />

                        <div className="max-w-[500px] w-full mx-5 my-1">
                            <h2 className="uppercase text-blue-800 tracking-wider font-bold">{product.title}</h2>

                            <h3 className="text-red-600">${product.price * product.quantity}</h3>
                            <p className="leading-6 my-2.5 opacity-80">{product.description}</p>
                            <p className="leading-6 my-2.5 opacity-80">{product.content}</p>

                            <div className="flex items-center">
                                <button onClick={() => decrement(product._id)} className="w-10 h-10 border border-gray-500"> - </button>
                                <span className="text-red-600 px-5">{product.quantity}</span>
                                <button onClick={() => increment(product._id)} className="w-10 h-10 border border-gray-500"> + </button>
                            </div>
                            
                            <div className="absolute top-0 right-1 text-red-600 font-black cursor-pointer" 
                            onClick={() => removeProduct(product._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="w-full h-12 flex items-center justify-between">
                <h3 className="text-red-600">Total: ${total}</h3>
                <Link to="#!" className="bg-gray-800 text-white mt-2.5 px-6 py-2.5 inline-block uppercase tracking-wider rounded-lg">Payment</Link>
            </div>
        </div>
    )
}

export default Cart
