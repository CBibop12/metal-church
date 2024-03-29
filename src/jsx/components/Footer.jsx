import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import "../../css/base.css"
import { Link } from 'react-router-dom';

const FooterComponent = () => {
    const [bookingId, setBookingId] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        setIsAvailable(bookingId.length > 0);
    }, [bookingId]);

    const handleInputChange = (e) => {
        setBookingId(e.target.value);
    };

    const handlePaste = (e) => {
        const pastedText = e.clipboardData.getData('text');
        setBookingId(prevBookingId => prevBookingId + pastedText);
        setBookingId(bookingId.substring(0, bookingId.length - pastedText.length))
    };

    return (
        <>
            <footer>
                <div className="container">
                    <div className="footer-content">
                        <a className="logo" href='/'>Metal Church</a>
                        <div className='search-for-id-sec'>
                            <h5>Heeft u al een boeking? Vind het met zijn boekings-ID</h5>
                            <div className='search-id-input'>
                                <input 
                                    type="text"
                                    value={bookingId} 
                                    onChange={handleInputChange} 
                                    onPaste={handlePaste}
                                    placeholder='Voer de ID van uw boeking in'
                                />
                                {isAvailable ? (
                                    <Link to={`/search-booking/${bookingId}`} className='search-button'>Zoek</Link>
                                ) : (                       
                                    <button className='search-button disable' disabled>
                                        Zoek
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <h6 className='under-footer'>
                        Metal Church 2024. Alle rechten voorbehouden
                    </h6>
                </div>
            </footer>
        </>
    );
};

export default FooterComponent;
