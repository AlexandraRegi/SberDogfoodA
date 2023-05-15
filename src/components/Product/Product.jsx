import React from "react";
import s from './index.module.css';
import { Link, useNavigate } from "react-router-dom";
import { BackNavigate } from "../BackNavigate/BackNavigate";

export const Product = ({product}) => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate('/')
    }
    
    return (<div className={`${s.product} container`}>
        <div className={s.titleWrapper}>
            <BackNavigate />
            <span className={s.productTitle}>{product.name}</span>
            <div className={s.rating}>
                <span>Artikul</span>
                <span>Rate</span>
            </div>
        </div>
        <div className={s.imgWrapper}>
            <img className={s.img} src={product.pictures} alt="" />
        </div>
        <div className={s.desc}>
            <span className={s.price}>{product.price}р</span>
        </div>
        <div className={s.desc}>
            <span className={s.price}>Описание</span>
            <span>{product.description}</span>
        </div>
    </div>)
}