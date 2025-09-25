import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState.jsx'

function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result

    return (
        <div className="text-center">
            {
                result < page * 9 ? ""
                : <button onClick={() => setPage(page+1)} className="px-6 py-2.5 mb-5 border border-gray-600 capitalize">Load more</button>
            }
        </div>
    )
}

export default LoadMore
