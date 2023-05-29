import React, { useContext } from "react"
import { BackNavigate } from "../../components/BackNavigate/BackNavigate"
import { CardList } from "../../components/CardList/CardList"
import { CardsContext } from '../../context/cardContext'


export const FavoritesPage = () => {
    const {favorites} = useContext(CardsContext);
    return (
        <div className="favorites">
            <BackNavigate />
            <h1 className="favorites__title">Избранное</h1>
            <CardList cards={favorites} />
        </div>
    )
}