import React, { useState, useEffect } from "react";
import HoursLine from './HoursLine';
import BookingCard from "./BookingCard";

const DayBlock = ({dayInfo}) => {
    const [dayBlockId, setDayBlockId] = useState();
    const [isListShown, showList] = useState(false);
    const [excludedHours, setExcludedHours] = useState()
    const [isDataProccessed, setIsDataProccessed] = useState(false)
    const [bookingsList, setBookingsList] = useState([])
    const [dateToShow, setDateToShow] = useState('')

    useEffect(() => {
        setDayBlockId(generateRandomId());
    }, []);

    function formatDate(dateString) {
        const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
        const [year, month, day] = dateString.split('-');
        const monthName = months[parseInt(month) - 1];
        
        // Используем условный оператор для выбора нужного JSX
        console.log(dayInfo.status);
        const formattedDate = (
            dayInfo.status === 'today' ?
            (
                <>
                    <h2 className="dayTitle">
                        <span>Vandaag, {parseInt(day)} {monthName}</span> {year}:
                    </h2>
                </>
            ) : (
                <>
                    <h2 className="dayTitle">
                        <span>{parseInt(day)} {monthName}</span> {year}:
                    </h2>
                </>
            )
        );
        return formattedDate;
    }
    
    function formatDay(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

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

    function convertTimeToHours(time) {
        const [hours, minutes] = time.split(':').map(Number);
        let result = hours * 2; // Умножаем часы на 2
    
        // Если минуты больше или равны 30, добавляем 1 час
        if (minutes >= 30) {
            result++;
        }
    
        return result;
    }


    function splitTimeRange(timeRange) {
        // Разделить строку времени по тире
        console.log(timeRange);
        const [startTime, endTime] = timeRange.split(' - ');
    
        // Применить функцию convertTimeToHours к начальному и конечному времени
        const startHours = convertTimeToHours(startTime);
        const endHours = convertTimeToHours(endTime);
    
        // Вернуть начальное и конечное время
        return { start: startHours, end: endHours };
    }

    const getExcludedHours = () => {
        let tempExcluded = []
        if (dayInfo.bookings.length > 0) {
            for (let el of dayInfo.bookings) {
                const { start, end } = splitTimeRange(el.bookingTime);
                for (let i = start; i <= end; i++) {
                    tempExcluded.push(i);
                }
        
            }
        }
        return tempExcluded
    }

    const getBookings = () => {
        let bookingsArr = []
        if (dayInfo.bookings.length > 0) {
            for (let el of dayInfo.bookings) {
                bookingsArr.push(<BookingCard fullName={el.fullName} userEmail={el.userEmail ? el.userEmail : ''} phoneNumber={el.phoneNumber ? el.phoneNumber : ''} bookingTime={el.bookingTime} bookingId={el._id} fullDate={formatDay(el.timestamp)} deleteMode="admin"/>)
            }
        }
        return bookingsArr
    }

    if (!isDataProccessed) {
        if (dayInfo.bookings && dayInfo.bookings.length > 0) {
            console.log("bouta load lot of orders");
            setBookingsList(getBookings());
            setDateToShow(formatDate(dayInfo.date))
            setExcludedHours(getExcludedHours());
        }
        else {
            setDateToShow(formatDate(dayInfo.date))
            console.log('aint gonna load a thing');
        }
        setIsDataProccessed(true);
    }
    async function handleDeleteAll() {
        for (let el of dayInfo.bookings) {
            try {
                const response = await fetch(`/query/delete/${el._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({}) // Пустое тело запроса
                });
            } catch (error) {
                // Обработка ошибок при выполнении запроса
                console.error('Error while deleting booking:', error);
            }
        }
        window.location.reload()
    }

    return (
        <div className="dayBookingsBlock">
            {dateToShow}
            <HoursLine excludedHours={excludedHours} />
            <h2 className="bookings-count">
                Boekingen: <span>{dayInfo.bookingCount}</span>
            </h2>
            {dayInfo.bookings.length > 0 ? 
            <>
            <div className="dayControlButtons">
                <div className="booking-button edit-button" onClick={handleShowCloseBookings}>
                    {isListShown ? "sluiten" : 'boekingen'}
                </div>
                <div className="booking-button delete-button" onClick={async() => handleDeleteAll()}>
                    Verwijder <span className='fullSearchName'>alles</span>
                </div>
            </div>
            <div className={isListShown ? `bookingsList list-${dayBlockId}` : `bookingsList list-${dayBlockId} disable`}>
                {bookingsList}
            </div>
            </>
            :
            <>
            </>
            }
        </div>
    );
};

export default DayBlock;
