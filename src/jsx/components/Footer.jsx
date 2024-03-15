import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import "../../css/base.css"

const FooterComponent = () => {
    const [bookingId, setBookingId] = useState('')

    return (
        <>
        <footer>
            <div className="container">
                <div className="footer-content">
                <a className="logo" href='/'>Metal Church</a>
                <div className='search-for-id-sec'>
                    <h5>Heeft u al een boeking? Vind het met zijn boekings-ID</h5>
                    <div className='search-id-input'>
                        <input type="text" value={bookingId} onChange={(e) => setBookingId(e.target.value)} placeholder='Voer de ID van uw boeking in'/>
                        <button>Zoek</button>
                    </div>
                </div>
                </div>
                <h6 className='under-footer'>
                    Metal Church 2024. Alle rechten voorbehouden
                </h6>
            </div>
        </footer>
        </>
    )
}
export default FooterComponent