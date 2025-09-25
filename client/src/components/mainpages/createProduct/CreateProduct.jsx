import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState.jsx'
import Loading from '../utils/loading/Loading.jsx'
import { useParams} from 'react-router-dom'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    _id: ''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    // const history = useHistory()
    const param = useParams()

    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/products/${product._id}`, {...product, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/products', {...product, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="w-full flex flex-wrap items-center justify-around">
            <div className="max-w-[450px] h-[500px] w-full border border-gray-300 p-4 my-5 max-sm:my-5 relative">
                <input type="file" name="file" id="file_up" onChange={handleUpload} className="relative w-full h-full outline-none before:content-['+'] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-white before:text-yellow-400 before:text-[17rem] before:text-center before:cursor-pointer before:m-auto"/>
                {
                    loading ? <div className="w-full h-full absolute top-0 left-0 bg-white"><Loading /></div>

                    :<div style={styleUpload} className="w-full h-full absolute top-0 left-0 bg-white">
                        <img src={images ? images.url : ''} alt="" className="w-full h-full block object-cover"/>
                        <span onClick={handleDestroy} className="absolute -top-3 -right-3 bg-white border border-gray-300 rounded-full px-2.5 py-1.5 cursor-pointer font-black text-red-600">X</span>
                    </div>
                }
                
            </div>

            <form onSubmit={handleSubmit} className="max-w-[500px] min-w-[290px] w-full mx-4 my-4">
                <div className="w-full my-4">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required
                    value={product.product_id} onChange={handleChangeInput} disabled={onEdit} 
                    className="w-full min-h-10 px-1" />
                </div>

                <div className="w-full my-4">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={product.title} onChange={handleChangeInput} 
                    className="w-full min-h-10 px-1" />
                </div>

                <div className="w-full my-4">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={product.price} onChange={handleChangeInput} 
                    className="w-full min-h-10 px-1" />
                </div>

                <div className="w-full my-4">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={product.description} rows="5" onChange={handleChangeInput} 
                    className="w-full min-h-10 px-1" />
                </div>

                <div className="w-full my-4">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                    value={product.content} rows="7" onChange={handleChangeInput} 
                    className="w-full min-h-10 px-1" />
                </div>

                <div className="w-full my-4">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput} className="w-full min-h-10 px-1">
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit" className="w-[200px] h-10 bg-gray-600 text-white uppercase tracking-wider font-bold">{onEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateProduct
