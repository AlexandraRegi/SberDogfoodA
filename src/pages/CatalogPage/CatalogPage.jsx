import React, { useContext } from "react"
import { CardList } from "../../components/CardList/CardList"
import './index.css'
import { CardsContext } from '../../context/cardContext'


export const CatalogPage = () => {
    const getIssues = (numb) => {
        
        numb %= 100;
        if (numb >= 5 && numb <= 20) {
            return 'товаров';
        }
        numb %= 10;
        if (numb === 1) {
            return 'товар';
        }
        if (numb > 1 && numb < 5) {
            return 'товара';
        }
        return 'товаров';
    }

    const { cards, onSort, search } = useContext(CardsContext)
    const sortedItems = [{id: 'popular', title: 'Популярные'}, {id: 'rate', title: 'По рейтингу'}, {id: 'new', title: 'Новинки'}, {id: 'cheapest', title: 'Сначала дешёвые'}, {id: 'most-expensive', title: 'Сначала дорогие'}, {id: 'sale', title: 'По скидке'}];

    return (
        <>
       {search && <p className="search">По запросу <b>{search}</b> {cards.length === 1 ? 'найден' : 'найдено'}  {cards.length} {getIssues(cards.length)}</p>}
        <div className="sort-cards">
            {sortedItems.map(e => <span key={e.id} onClick={()=>onSort(e.id)} className='sort-item '>{e.id}</span>)}
        </div>
        <CardList cards={cards} />
        </>
    )
}