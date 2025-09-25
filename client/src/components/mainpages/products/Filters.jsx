import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState.jsx'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="w-full min-h-10 overflow-hidden flex justify-between items-center flex-wrap my-4">
            <div className="flex items-center">
                <span className="max-sm:hidden">Filters: </span>
                <select name="category" value={category} onChange={handleCategory} className="border border-gray-400 outline-none h-10 rounded-lg px-1">
                    <option value=''>All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder="Enter your search!"
            onChange={e => setSearch(e.target.value.toLowerCase())} className="flex-1 mx-2.5 border border-gray-400 outline-none h-10 rounded-lg px-1 max-sm:mx-0" />

            <div className="flex items-center max-sm:flex-1">
                <span className="max-sm:hidden">Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} className="border border-gray-400 outline-none h-10 rounded-lg px-1 max-sm:w-full max-sm:min-w-[290px] max-sm:my-1">
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: Hight-Low</option>
                    <option value='sort=price'>Price: Low-Hight</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
