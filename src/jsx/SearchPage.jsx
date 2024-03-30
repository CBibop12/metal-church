import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import "../css/booking.css"
import BookingCard from './components/BookingCard';

const SearchPage = ({burgerShown, showBurger}) => {
    const { bookingId } = useParams();
    const [searchStatus, setSearchStatus] = useState(false);
    const [fullName, setFullName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullDate, setFullDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [searchData, setSearchData] = useState(false);

    function formatDate(inputDate) {
        const [year, month, day] = inputDate.split('-');
        return `${day}.${month}.${year}`;
    }

    async function searchBookingById() {
        try {
            const response = await fetch(`/query/${bookingId}`);
            const data = await response.json();
            setSearchStatus(true);
            setFullName(data.fullName);
            setUserEmail(data.email);
            setPhoneNumber(data.phoneNumber);
            setFullDate(formatDate(data.timestamp));
            setBookingTime(data.bookingTime);
        } catch (err) {
            console.log("Error occurred when searching for order", err);
        }
    }

    useEffect(() => {
        if (!searchData) {
            searchBookingById();
            setSearchData(true);
        }
    }, [searchData, bookingId]);

    return (
        <>
            <HeaderComponent burgerShown={burgerShown} showBurger={showBurger}/>
            <div className="container top-section">
                {searchStatus ?
                    <>
                        <h2 className="section-name">
                            We hebben een boeking gevonden met ingevoegd BoekingID
                        </h2>
                        <div className="orderInfo-sec">
                            <BookingCard fullName={fullName} userEmail={userEmail} phoneNumber={phoneNumber} bookingTime={bookingTime} bookingId={bookingId} fullDate={fullDate} />
                        </div>
                    </>
                    :
                    <>
                        <h2 className="section-name centered">
                        Oops! Het lijkt erop dat we uw boeking kunnen <span className='orange'>niet vinden</span>.
                        </h2>
                        <p className="title-p centered">
                        Controleer of u het boekingsnummer correct heeft ingevoerd en probeer het opnieuw. Als u vragen of problemen heeft, aarzel dan niet om contact op te nemen met onze klantenservice.
                        </p>
                    </>
                }
            </div>
            <FooterComponent />
        </>
    );
}

export default SearchPage;
