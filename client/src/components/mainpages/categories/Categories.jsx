import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState.jsx'
import axios from 'axios'

function Categories() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async id =>{
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="max-w-[700px] flex flex-wrap justify-around mx-auto my-8">
            <form onSubmit={createCategory} className="w-[290px] mb-5">
                <label htmlFor="category" className="block font-bold tracking-wider uppercase mb-2.5">Category</label>
                <input type="text" name="category" value={category} required
                onChange={e => setCategory(e.target.value)} 
                className="w-[210px] h-9 border-none outline-none border-b border-gray-600" />

                <button type="submit" className="w-[70px] h-9 bg-gray-600 text-white ml-2.5">{onEdit? "Update" : "Create"}</button>
            </form>

            <div className="w-full">
                {
                    categories.map(category => (
                        <div className="min-w-[290px] flex justify-between items-center p-2.5 mb-2.5 border border-gray-300" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button onClick={() => editCategory(category._id, category.name)} className="mr-2">Edit</button>
                                <button onClick={() => deleteCategory(category._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
