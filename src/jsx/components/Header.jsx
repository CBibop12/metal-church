import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import "../../css/base.css"

const HeaderComponent = () => {

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
            </div>
        </header>
        </>
    )
}
export default HeaderComponent