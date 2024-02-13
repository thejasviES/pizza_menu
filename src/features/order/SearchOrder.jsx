import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchOrder() {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        if (!query) return
        navigate(`/order/${query}`)
        setQuery('')
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="search order #"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="trasition-all rounded-full bg-yellow-100 px-4 py-2 text-sm duration-200 placeholder:text-center placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 sm:w-64 sm:focus:w-72"
            ></input>
        </form>
    )
}

export default SearchOrder
