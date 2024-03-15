import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import "../css/contacts.css"

const Contacts = () => {

    return (
        <>
        <HeaderComponent></HeaderComponent>
        <div className="container top-section">
            <h2 className="section-name">
           <span className="orange"> Neem contact</span> met ons
            </h2>
                <div className="contactUs-text-side">
                    <a className="contactUsItem" href='https://www.google.com/maps/place/Kerkweg+3,+4021+BG+Maurik/@51.9635266,5.4253039,44m/data=!3m1!1e3!4m6!3m5!1s0x47c659e10599dd77:0xfe66dd6e5acce594!8m2!3d51.9635986!4d5.4254188!16s%2Fg%2F11l5d1_hj2?entry=ttu'>
                    <h4 className="contactUsTitle">
                        Adres
                    </h4>
                    <p>
                    Kerkweg 3, 4021 BG Maurik
                    </p>
                    </a>
                    <a className="contactUsItem" href='mailto:example@gmail.com'>
                    <h4 className="contactUsTitle">
                        Email
                    </h4>
                    <p>
                    example@gmail.com
                    </p>
                    </a>
                    <a className="contactUsItem" href='tel:+31642387933'>
                    <h4 className="contactUsTitle">
                        Telefoon
                    </h4>
                    <p>
                    +31 642387933
                    </p>
                    </a>
                </div>
        </div>
        <FooterComponent></FooterComponent>
        </>
    )
}

export default Contacts;