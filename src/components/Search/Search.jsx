import './index.css'
import { useDispatch } from 'react-redux';
import { setSearch } from '../../storage/slices/productsSlice';


export const Search = () => {
    const dispatch = useDispatch();

    return (
        <input  placeholder="search.." onChange={(e) => dispatch(setSearch(e.target.value))} className="search_input"/>
    )
}