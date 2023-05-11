import React from "react";
import './index.css';
import { ReactComponent as Logo } from '../Logo/logo.svg';
import { Search } from '../Search/Search.jsx'

export const Header = (props) => {
    const setSearchQuery = (path) => {
        props.setSearch(path);

    }
    return <header className='header'>
        <div className='container'>
            <div className='header__wrapper'>
                <Logo className='logo' />
                <Search setSearch={setSearchQuery} />
                <div className='header_icons'>
                </div>
            </div>
        </div>     
    </header>
}