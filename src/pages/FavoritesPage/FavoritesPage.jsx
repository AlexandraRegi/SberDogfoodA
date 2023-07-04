import React from "react"
import { BackNavigate } from "../../components/BackNavigate/BackNavigate"
import { CardList } from "../../components/CardList/CardList"
import { useSelector } from 'react-redux'


export const FavoritesPage = () => {

    const { favorites } = useSelector((s) => s.products);

    return (
        <div className="favorites">
            <BackNavigate />
            <h1 className="favorites__title">Избранное</h1>
            <CardList cards={favorites} />
        </div>
    )
}