import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import "../css/booking.css"
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css'; // Choose your preferred PrimeReact theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import timeTable from '../js/timeTable';    

const Booking = () => {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [userEmail, setUserEmail] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [date, setDate] = useState(null);
    const [hourElements, setHourElements] = useState([]);
    const [availableHours, setAvailableHours] = useState([]);
    const [enterHour, setEnterHour] = useState()
    const renderHalfHourElements = () => {
        const elements = [];
    
        // Создаем 48 элементов
        for (let i = 1; i <= 48; i++) {
          // Добавляем элемент в массив
          elements.push(
            <div key={i} id={`halfHourElement-${i}`} className="halfHourElement">
            </div>
          );
        }
    
        // Устанавливаем массив элементов в состояние
        setHourElements(elements);
      };

    function convertTimeToHours(time) {
        const [hours, minutes] = time.split(':').map(Number);
        let result = hours * 2; // Умножаем часы на 2
    
        // Если минуты больше или равны 30, добавляем 1 час
        if (minutes >= 30) {
            result++;
        }
    
        return result;
    }

    function findBookingByDate(date) {
        console.log(date);
        return timeTable.find(entry => entry.fullDate === date);

    }

    function formatDate(dateString) {
        // Создаем объект Date из строки даты
        const date = new Date(dateString);
    
        // Извлекаем компоненты даты
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы в JavaScript начинаются с 0
        const year = date.getFullYear();
    
        // Формируем строку в нужном формате
        return `${day}.${month}.${year}`;
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
    
    const checkAvailable = (value) => {
        const booking = findBookingByDate(value);
        console.log(booking);
        const hourElements = document.querySelectorAll('.halfHourElement');
        // Сначала сбрасываем классы для всех элементов
        hourElements.forEach(element => {
            element.classList.remove('unavailable');
        });
        let excludedHours = []
        for (const el of booking.bookings) {
            const { start, end } = splitTimeRange(el.bookingTime);
            for (let i = start; i <= end; i++) {
                excludedHours.push(i)
                const halfHour = document.getElementById(`halfHourElement-${i}`);
                halfHour.classList.add('unavailable');
            }
        }
        for (let i = 1; i <= 48; i++) {
            if (excludedHours.indexOf(i) == -1) {
                let newArr = [...availableHours, i]
                setAvailableHours(newArr)
            }
        }
        setEnterHour(availableHours[0])
        console.log(availableHours);
    };
    return (
        <>
        <HeaderComponent></HeaderComponent>
        <div className="container top-section">
            <h2 className="section-name">
            Maak samen met ons uw <span className="orange">meesterwerk</span>
            </h2>
            <p className="title-p">
            vul dit eenvoudige formulier in om een gratis boeking te maken
            </p>
            <form>
                <div className='full-name-sec'>
                    <div className="inputBlock">
                        <h5 className='form-input-title'>Voornaam</h5>
                        <input type="text" placeholder='Vul uw voornaam in' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div> 
                    <div className="inputBlock">
                        <h5 className='form-input-title'>Achternaam</h5>
                        <input type="text" placeholder='Vul uw achternaam in' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div> 
                </div>
                <div className="inputBlock">
                    <h5>Email</h5>
                    <input type="email" placeholder='Vul uw achternaam in' value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                </div>
                <div className="inputBlock">
                    <h5>Telefoon</h5>
                    <input type="tel" placeholder='Vul uw telefoonnummer in' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>
                <div className="inputBlock">
                    <h5>Welke dag wil je komen</h5>
                    <Calendar value={date} onChange={(e) => {
                    renderHalfHourElements()
                    checkAvailable(formatDate(e.value))
                    setDate(formatDate(e.value))
                    }} dateFormat="dd.mm.yy" readOnlyInput/>
                </div>
                <div className='hours-sec'>
                    {hourElements}
                </div>
                <div className="timeInput">
                <Dropdown value={enterHour} onChange={(e) => setEnterHour(e.value)} options={availableHours} optionLabel="name" />
                </div>
            </form>
        </div>
        <FooterComponent></FooterComponent>
        </>
    )
}
export default Booking
