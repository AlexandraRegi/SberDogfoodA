import React from "react"
import { CardList } from "../../components/CardList/CardList"
import './index.css'
import { Radio } from 'antd'
import { getEndings } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { sortedProducts } from '../../storage/slices/productsSlice'


export const CatalogPage = () => {

    const { products, search } = useSelector((s) => s.products)
    const dispatch = useDispatch();

    const onChange = (e) => {
        dispatch(sortedProducts(e.target.value))
    };

    const sortedItems = [{id: 'popular', title: 'Популярные'}, {id: 'rate', title: 'По рейтингу'}, {id: 'new', title: 'Новинки'}, {id: 'cheapest', title: 'Сначала дешёвые'}, {id: 'most-expensive', title: 'Сначала дорогие'}, {id: 'sale', title: 'По скидке'}];

    return (
        <>
       {search && <p className="search">По запросу <b>{search}</b> {products.length === 1 ? 'найден' : 'найдено'} {products.length} {getEndings(products.length)}</p>}
        <Radio.Group onChange={onChange}>
            {sortedItems.map(e => <Radio.Button value={e.id} style={{marginTop: 16,}}>{e.id}</Radio.Button>)}
        </Radio.Group>
        <CardList cards={products} />
        </>
    )
}