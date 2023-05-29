import React, { useContext, useState } from "react"
import { CardList } from "../../components/CardList/CardList"
import './index.css'
import { CardsContext } from '../../context/cardContext'
import { getEndings } from '../../utils/utils'
import cn from 'classnames'


export const CatalogPage = () => {

    const { cards, onSort, search, sortItemActive } = useContext(CardsContext)
    const sortedItems = [{id: 'popular', title: 'Популярные'}, {id: 'rate', title: 'По рейтингу'}, {id: 'new', title: 'Новинки'}, {id: 'cheapest', title: 'Сначала дешёвые'}, {id: 'most-expensive', title: 'Сначала дорогие'}, {id: 'sale', title: 'По скидке'}];

    return (
        <>
       {search && <p className="search">По запросу <b>{search}</b> {cards.length === 1 ? 'найден' : 'найдено'}  {cards.length} {getEndings(cards.length)}</p>}
        <div className="sort-cards">
            {sortedItems.map(e => <span key={e.id} onClick={()=>onSort(e.id)} className={`sort-item`}>{e.id}</span>)}
        </div>
        <CardList cards={cards} />
        </>
    )
}