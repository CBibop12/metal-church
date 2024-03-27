import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
const BookingCard = ({fullName, userEmail, phoneNumber, bookingId, bookingTime, timestamp}) => {
    const [originalFullName, setOriginalFullName] = useState(fullName)
    const [originalUserEmail, setOriginalUserEmail] = useState(userEmail)
    const [originalPhoneNumber, setOriginalPhoneNumber] = useState(phoneNumber)
    const [newFullName, setNewFullName] = useState(fullName)
    const [newUserEmail, setNewUserEmail] = useState(userEmail)
    const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber)
    const [isEdited, setIsEdited] = useState(false)
    const [mode, setMode] = useState('')

    function checkIsChanged() {
        let isTrue = false
        if ((originalFullName != newFullName && newFullName.length > 0) || (originalPhoneNumber.length > 0 && newPhoneNumber != originalPhoneNumber && newPhoneNumber.length > 0) || (originalUserEmail.length > 0 && newUserEmail != originalUserEmail && newUserEmail.length > 5)) {
            isTrue = true
        }
        return isTrue
    }

    useEffect(() => {
        if (mode == 'edit') {
            setIsEdited(checkIsChanged())
        }
    }, [newFullName, newPhoneNumber, newUserEmail, mode])

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
        const [startTime, endTime] = timeRange.split(' - ');
    
        // Применить функцию convertTimeToHours к начальному и конечному времени
        const startHours = convertTimeToHours(startTime);
        const endHours = convertTimeToHours(endTime);
    
        // Вернуть начальное и конечное время
        return { start: startHours, end: endHours };
    }
    const { start, end } = splitTimeRange(bookingTime);
    function calculateTimeRange(enter, exit) {
        let timeDifference = exit - enter
        if (timeDifference % 2 == 0) {
            return `${timeDifference / 2} ${timeDifference / 2 > 1? ' uren' : ' uur'}`
        }
        else {
            return `${(timeDifference -1)/ 2}.5 ${(timeDifference -1)/ 2 > 1? ' uren' : ' uur'}`
        }
    }
    let timeRange = calculateTimeRange(start, end)
    async function handleSaveChanges() {
        if (isEdited) {
            setOriginalFullName(newFullName);
            setOriginalPhoneNumber(newPhoneNumber);
            setOriginalUserEmail(newUserEmail);
            
            const obj = {
                fullName: newFullName,
                email: newUserEmail,
                phoneNumber: newPhoneNumber,
                bookingTime: bookingTime,
                timestamp: timestamp,
                _id: bookingId
            };
            console.log('Sending data:', obj);
    
            try {
                const response = await fetch(`/query/update/${bookingId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                });    
    
                if (response.ok) {
                    // Обработка успешного обновления
                    console.log('Booking updated successfully');
                    // Дополнительные действия после успешного обновления, если необходимо
                } else {
                    // Обработка ошибки при обновлении
                    console.error('Failed to update booking');
                }
                setMode('');
            } catch (error) {
                // Обработка ошибок при выполнении запроса
                console.error('Error while updating booking:', error);
            }
        }
    }
    
    function handleCancelChanges() {
        setNewFullName(originalFullName)
        setNewPhoneNumber(originalPhoneNumber)
        setNewUserEmail(originalUserEmail)
        setMode('')
    }
    async function handleDeleteBooking() {
        try {
            const res = await fetch(`/query/delete/${bookingId}`);
            // Проверяем успешность запроса
            if (res.ok) {
                // Перенаправляем пользователя на главную страницу
                window.location.href = '/';
            } else {
                // Обрабатываем ошибку, если запрос не удался
                console.error('Failed to delete booking');
            }
        } catch (error) {
            console.error('Error while deleting booking:', error);
        }
    }
    
 return (
    <>
    <div className="orderCard-divider">
                        <div className="orangeLine">
                        </div>
                        <div className="orderCard-content">
                            <div className="infoFields">
                            <div className="infoField">
                                <h3>
                                voor-en achternaam:
                                </h3>
                                {mode == 'edit' ? <input type="text" value={newFullName} onChange={(e) => setNewFullName(e.target.value)}/> : <h4>{originalFullName}</h4>}
                            </div>
                            {userEmail? <div className="infoField">
                                <h3>
                                Email:
                                </h3>
                                {mode == 'edit' ? <input type="text" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)}/> : <h4>{originalUserEmail}</h4>}
                            </div> : ''}
                            {phoneNumber? <div className="infoField">
                                <h3>
                                telefoonnummer:
                                </h3>
                                {mode == 'edit' ? <input type="text" value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)}/> : <h4>{originalPhoneNumber}</h4>}
                            </div> : ''}
                            <div className="infoField">
                                <h3>
                                tijdsperiode:
                                </h3>
                                <h4>
                                    {bookingTime} ({timeRange})
                                </h4>
                            </div>
                            <div className="infoField">
                                <h3>
                                BoekingID:
                                </h3>
                                <h4>
                                    {bookingId} <span className='idCopy-button' onClick={() => copy(bookingId)}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg></span>
                                </h4>
                            </div>
                            </div>
                            <div className="buttons-line">
                                {mode != 'edit'?                                 
                                <div className="booking-button edit-button" onClick={() => setMode('edit')}>
                                bewerking
                                </div> : <div className={isEdited? "booking-button save-button" : 'booking-button save-button disable'} onClick={() => handleSaveChanges()}>
                                Bewaren
                                </div>}
                                {mode != 'edit'?                                 
                                <div className="booking-button delete-button" onClick={() => handleDeleteBooking()}>
                                verwijderen
                                </div> : <div className="booking-button cancel-button" onClick={() => handleCancelChanges()}>
                                annuleren
                                </div>}
                            </div>
                        </div>
                    </div>
    </>
 )
}

export default BookingCard