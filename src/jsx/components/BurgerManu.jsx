import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BurgerMenu = ({burgerShown, showBurger}) => {

    if (burgerShown) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'visible';
      }
    

    
    return (
        <>
        <div className={burgerShown? "main-burger-container" : "main-burger-container disabled"}>
            <div className="burger-empty-space" onClick={() => showBurger(false)}>
            </div>
            <div className="burger-menu">
                <div className="closeBurger-sec">
                    <div className="crossButton"
                    onClick={() => showBurger(false)}>
                    <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 12L12 32M12 12L32 32" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </div>
                </div>
                <div className="burger-nav-list">
                <ul>
                    <li><Link to='/new-booking' onClick={() => showBurger(false)}>Boek een studio</Link></li>
                    <li><Link to='/FAQ' onClick={() => showBurger(false)}>FAQ</Link></li>
                    <li><Link to='/contacts' onClick={() => showBurger(false)}>Contacten</Link></li>
                </ul>
                </div>
            </div>
        </div>
        </>
    ) 
}
export default BurgerMenu