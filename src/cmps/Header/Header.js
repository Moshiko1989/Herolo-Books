// Extentions
import React from 'react';

// Styles
import './Header.css';

export const Header = props => {
    return (
        <header className="Header">
            <div className="my-logo">
                <img src={props.logoInfo.logo} alt={props.logoInfo.alt} />
            </div>
            <div className="my-search">
                <form onSubmit={props.onSearch}>
                    <input className="search-bar" placeholder="Enter a Book Name..."/>
                    <i className="fa fa-search" aria-hidden="true"></i>
                </form>
            </div>
        </header>
    )
}