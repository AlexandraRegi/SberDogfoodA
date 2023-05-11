import React from "react";
import './index.css'
import { ReactComponent as Like } from "./img/like.svg";
import { api } from '../../utils/api';

export const Card = ({product, userId, handleLike}) => {
    const isLiked = product.likes.some(e=> e === userId)

    const handleClick = () => {
        handleLike(product, isLiked);
    }

    return (
    <div className="card">
        <div className="card__sticky card__sticky_type_top-left">
            {!!product.discount && <span className="card__discount">-{product.discount}%</span>}
            {product.tags.map(e=> <span className={`tag tag_type_${e}`} key={e}>{e}</span>)}
        </div>
        <div className="card__sticky card__sticky_type_top-right">
            <button onClick={handleClick} className={`card__favorite ${isLiked ? 'card__favorite_active' : ' '}`}><Like /></button>
            </div>
            <a href="/" className='card__link'>
            <img src={product.pictures} alt="food" className="card__image" />
            <div className="card__desc">
                <span className="card__price">{product.price}р</span>
                <span className="card__weight">{product.wight}</span>
                
            </div>
            <p className="card__name">{product.name}</p>
            </a>
        <span className="card__cart btn btn_type_primary">В Корзину</span>
    </div>
    )
}