import React from "react";
import './index.css'
import { ReactComponent as Like } from "./img/like.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangeProductLike } from '../../storage/slices/productsSlice';


export const Card = ({product}) => {

    const { data: user } = useSelector((s) => s.user)
    const dispatch = useDispatch();
    const isLiked = product.likes.some(e=> e === user._id)

    const handleClick = () => {
        dispatch(fetchChangeProductLike({ product: product, wasLiked: isLiked }))
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
        <Link to={`/product/${product._id}`} className="card__link">
            <img src={product.pictures} alt="food" className="card__image" />
            <div className="card__desc">
                <span className="card__price">{product.price}р</span>
                <span className="card__weight">{product.wight}</span>   
            </div>
            <p className="card__name">{product.name}</p>
        </Link>
        <span className="card__cart btn btn_type_primary">В Корзину</span>
    </div>
    )
}