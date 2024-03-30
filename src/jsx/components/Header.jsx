import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import "../../css/base.css"

const HeaderComponent = ({burgerShown, showBurger}) => {

    return (
        <>
        <header>
            <div className="container header-content">
                <a className="logo" href='/'>Metal Church</a>
                <ul>
                    <li><Link to='/new-booking'>Boek een studio</Link></li>
                    <li><Link to='/FAQ'>FAQ</Link></li>
                    <li><Link to='/contacts'>Contacten</Link></li>
                </ul>
                <button className="burgerOpenButton" onClick={() => {
                    showBurger(true)
                }}>
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33203 11H36.6654M7.33203 22H36.6654M7.33203 33H36.6654" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </button>
            </div>
        </header>
        </>
    )
}
export default HeaderComponent