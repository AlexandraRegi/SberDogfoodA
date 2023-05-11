import './index.css'

export const Search = ({setSearch}) => {
    return (
        <input  placeholder="search.." onChange={(e) => setSearch(e.target.value)} className="search_input"/>
    )
}