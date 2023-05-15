import React from "react";
import './index.css';
import { ReactComponent as Logo } from '../Logo/logo.svg';
import { Search } from '../Search/Search.jsx'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { ReactComponent as Basket} from './img/basket.svg';
import { ReactComponent as Profile} from './img/profile.svg';
import { ReactComponent as Like} from '../Card/img/like.svg';

export const Header = (props) => {
    const setSearchQuery = (path) => {
        props.setSearch(path);
    }

    const location = useLocation();

    return <header className='header'>
        <div className='container'>
            <div className='header__wrapper'>
                <Link to={'/'}><Logo /></Link>
                {location.pathname === '/' && <Search setSearch={setSearchQuery}/>}
                <div className='header_icons'>
                    <Link className='header__fav' to={'/favorites'}>
                        <Like className='header__like'/>
                        <span className='header__bubble'>{props.favorites.length}</span>
                    </Link>
                    <Basket className='header__icon'/>
                    <Profile className='header__icon'/>
                </div>
            </div>
        </div>     
    </header>
}