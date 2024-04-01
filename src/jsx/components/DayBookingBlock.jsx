import React, { useState, useEffect } from "react";
import HoursLine from './HoursLine';
import BookingCard from "./BookingCard";

const DayBlock = ({ dayBookings }) => {
    const [dayBlockId, setDayBlockId] = useState();
    const [isListShown, showList] = useState(false);

    useEffect(() => {
        setDayBlockId(generateRandomId());
    }, []);

    function generateRandomId() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let randomId = '';
        for (let i = 0; i < 11; i++) {
            randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return randomId;
    }

    function handleShowCloseBookings() {
        let listElement = document.querySelector(`.list-${dayBlockId}`);
        if (isListShown) {
            listElement.classList.add('disable');
        } else {
            listElement.classList.remove('disable');
        }
        showList(!isListShown)
    }

    return (
        <div className="dayBookingsBlock">
            <h2 className="dayTitle">
                <span>1 April</span> 2024:
            </h2>
            <HoursLine excludedHours={[1, 2, 3, 4, 5, 13, 14, 15, 16, 17, 34, 35, 36, 37]} />
            <h2 className="bookings-count">
                Boekingen: <span>3</span>
            </h2>
            <div className="dayControlButtons">
                <div className="booking-button edit-button" onClick={handleShowCloseBookings}>
                    {isListShown ? "sluiten" : "boekingen weergeven"}
                </div>
                <div className="booking-button delete-button">
                    Verwijder alles
                </div>
            </div>
            <div className={isListShown ? `bookingsList list-${dayBlockId}` : `bookingsList list-${dayBlockId} disable`}>
                <BookingCard fullName={"Eminem SlimShady"} userEmail={"phone.070718@gmail.com"} phoneNumber={"+31641259967"} bookingTime={"03:00 - 05:00"} bookingId={"23432"} fullDate={"01.04.2024"} />
                <BookingCard fullName={"Eminem SlimShady"} userEmail={"phone.070718@gmail.com"} phoneNumber={"+31641259967"} bookingTime={"03:00 - 05:00"} bookingId={"23432"} fullDate={"01.04.2024"} />
                <BookingCard fullName={"Eminem SlimShady"} userEmail={"phone.070718@gmail.com"} phoneNumber={"+31641259967"} bookingTime={"03:00 - 05:00"} bookingId={"23432"} fullDate={"01.04.2024"} />
            </div>
        </div>
    );
};

export default DayBlock;
