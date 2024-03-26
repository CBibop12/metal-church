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
    const [hourElements, setHourElements] = useState();
    const [rawAvailableHours, setRawAvailableHours] = useState([])
    const [availableHours, setAvailableHours] = useState([]);
    const [availableExitHours, setAvailableExitHours] = useState([])
    const [hoursListToShow, showTheFinalHours] = useState([])
    const [exitHoursListToShow, setExitHoursListToShow] = useState([])
    const [enterHour, setEnterHour] = useState()
    const [enterHalfHour, setEnterHalfHour] = useState()
    const [exitHour, setExitHour] = useState()
    const [exitHalfHour, setExitHalfHour] = useState()
    const [originalEnterPoint, setOriginalEnterPoint] = useState()
    const [originalExitPoint, setOriginalExitPoint] = useState()
    const [enterPoint, setEnterPoint] = useState()
    const [exitPoint, setExitPoint] = useState()
    const [progressStep, setProgressStep] = useState(1)
    const [timeRange, setTimeRange] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [bookingId, generateBookingId] = useState('')
    const [formatedDateString, setFormatedDateString] = useState()
    const [queryStringDate, setQueryStringDate] = useState()

    const renderHalfHourElements = (availableHoursList) => {
        if (hourElements) { // Проверяем, были ли элементы уже созданы
            // Обновляем существующие элементы
            console.log("Looks like it's not the first time you pick a date, don't ya");
            for (let i = 0; i < 48; i++) {
                const element = document.getElementById(`halfHourElement-${i}`);
                if (element) {
                    if (progressStep == 1) {
                        if (availableHoursList.indexOf(i) === -1) {
                            element.classList.add("unavailable");
                            element.classList.remove("inactive");
                            element.classList.remove('mid')
                        } else {
                            element.classList.remove("unavailable");
                            element.classList.remove("inactive");
                            if (typeof enterPoint === "number" && enterPoint == i) {
                                console.log("enter point is: ", i, " isn't it")
                                element.classList.add("picked");
                                element.classList.remove('mid')
                            }
                            else {
                                element.classList.remove("picked");
                                element.classList.remove('mid')

                            }
                        }
                    } 
                    else {
                        if (availableHoursList.indexOf(i) === -1) {
                        element.classList.remove("unavailable");
                        element.classList.add("inactive");
                        element.classList.remove('mid')

                    } else {
                        element.classList.remove("unavailable");
                        element.classList.remove("inactive");
                        if ((typeof enterPoint === "number" && enterPoint == i) || (typeof exitPoint === 'number' && exitPoint == i)) {
                            console.log("enter point is: ", i, " isn't it")
                            element.classList.add("picked");
                            element.classList.remove('mid')

                        }
                        else {
                            element.classList.remove("picked");
                            if (i > enterPoint && i < exitPoint) {
                                element.classList.add('mid')
                            }
                            else {
                                element.classList.remove('mid')
                            }
                        }
                    }
                }
            }
            }
        } else {
            const elements = [];
            // Создаем 48 элементов
            for (let i = 0; i < 48; i++) {
                if (availableHoursList.indexOf(i) === -1) {
                    elements.push(
                        <div key={i} id={`halfHourElement-${i}`} className="halfHourElement unavailable">
                        </div>
                    );
                } else {
                    elements.push(
                        <div key={i} id={`halfHourElement-${i}`} className="halfHourElement">
                        </div>
                    );
                }
            }
            // Устанавливаем массив элементов в состояние
            setHourElements([...elements]);
            console.log("I am here");
            setDate(date)
        }
    };
    
    
    useEffect(() => {
        if (availableHours.length) {
            showTheFinalHours(loadHoursDropdown(availableHours))
            console.log("Gonna render these elements really quick", availableHours);
            renderHalfHourElements(availableHours);   
        }
    }, [availableHours]);
    
    useEffect(() => {
        if (progressStep === 2) {
            setAvailableExitHours(generateAvailableCloseHours(availableHours));
        } else if (progressStep === 1 && typeof enterPoint === 'number') {
            setAvailableExitHours([]);
            renderHalfHourElements(availableHours);
        }
    }, [availableHours, progressStep, enterPoint]);
    
    useEffect(() => {
        if (availableExitHours.length) {
            renderHalfHourElements(availableExitHours);
        }
        setExitHoursListToShow(loadHoursDropdown(availableExitHours));
        setTimeRange(calculateTimeRange(enterPoint, exitPoint));
    }, [availableExitHours, exitPoint, enterPoint]);
    
    useEffect(() => {
        if (firstName !== '' && lastName !== '' && (userEmail !== '' || phoneNumber !== '') && progressStep === 2 && typeof enterPoint === 'number' && typeof exitPoint === 'number' && timeRange != '' && timeRange != '0 uur') {
            setIsSubmit(true)
        } else {
            setIsSubmit(false)
        }
    }, [firstName, lastName, userEmail, phoneNumber, enterPoint, exitPoint, timeRange, progressStep])
    

    function convertTimeToHours(time) {
        const [hours, minutes] = time.split(':').map(Number);
        let result = hours * 2; // Умножаем часы на 2
    
        // Если минуты больше или равны 30, добавляем 1 час
        if (minutes >= 30) {
            result++;
        }
    
        return result;
    }

    async function findBookingByDate(date) {
        console.log(date);
        try {
            const res = await fetch(`http://metalchurch.nl:5050/query/timeRange/${date}/${date}`);
            const data = await res.json(); // Розпарсити відповідь
            console.log(`Bookings for ${date}: ${data}`);
            return data;
        } catch (err) {
            console.error("Error fetching date data: ", err);
        }
    }
    
    function loadHoursDropdown(availableHalfHours) {
        let showHoursList = []
        console.log(availableHalfHours);
        for (let el of availableHalfHours) {
            if (el % 2 === 0) {
                let hour = el < 20? `0${el/2}` : `${el/2}`
                showHoursList.push({name: hour, code: el})
            }

        }
        return showHoursList
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
    function dateForQueryFormat(dateOrigin) {
        const dateString = new Date(dateOrigin)
        return `${dateString.getFullYear()}-${(dateString.getMonth() + 1).toString().padStart(2, '0')}-${dateString.getDate().toString().padStart(2, '0')}`;
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
    function generateRawHours(excludedHours) {
        let rawHours = []
        for (let i = 0; i < 48; i++) {
            let tempIndex = excludedHours.indexOf(i)
            if (tempIndex == -1) {
                rawHours.push(i)
            }
        }
        return rawHours
    }
    function generateAvailableEnterHours(excludedHours) {
        let availableHours = []
        for (let i = 0; i < 48; i++) {
            availableHours.push(i)
        }
        for ( let i = 0; i < excludedHours.length; i++) {
            if (excludedHours[i] != 0 && ((i == 0 && excludedHours[i] >= 1) || (excludedHours[i] - excludedHours[i - 1] >=1))) {
                const index = availableHours.indexOf(excludedHours[i] - 1)
                if (index != -1) {
                    availableHours.splice(index, 1)
                }
            }
            const index = availableHours.indexOf(excludedHours[i])
            if (index != -1) {
                availableHours.splice(index, 1)
            }
        }
        if (availableHours[availableHours.length - 1] == 47) {
            availableHours.splice(availableHours.length - 1, 1)
        }
        return availableHours
    }
    function generateAvailableCloseHours (availableHoursList) {
        let availableCloseHours = []
        for (let i = enterPoint; i < 48; i++) {
            availableCloseHours.push(i)
            if (availableHoursList[i + 1] - availableHoursList[i] > 1 || i == 47) {
                break
            }
        }
        console.log("Available close hours for your choice: ", availableCloseHours);
        return availableCloseHours
    }

    const checkAvailable = async (originalValue, value) => {
        setFormatedDateString(value)
        setQueryStringDate(dateForQueryFormat(originalValue))
        try {
            const booking = await findBookingByDate(queryStringDate);
            console.log(booking);
            const hourElements = document.querySelectorAll('.halfHourElement');
            // Сначала сбрасываем классы для всех элементов
            hourElements.forEach(element => {
                element.classList.remove('unavailable');
                element.classList.remove('picked');
            });
            let excludedHours = [];
            if (booking.length) {
                for (const el of booking) {
                    const { start, end } = splitTimeRange(el.bookingTime);
                    for (let i = start; i <= end; i++) {
                        excludedHours.push(i);
                        const halfHour = document.getElementById(`halfHourElement-${i}`);
                        halfHour.classList.add('unavailable');
                    }
                }
            }
            // Установить значение даты после успешной проверки доступности
            setRawAvailableHours(generateRawHours(excludedHours))
            console.log(rawAvailableHours);
            setAvailableHours(generateAvailableEnterHours(excludedHours))
        } catch (error) {
            console.error('Error checking availability: ', error);
        }
    };
    const handleDateChange = async (e) => {
        const formattedDate = formatDate(e.value);
        setEnterHour(e.value)
        setOriginalEnterPoint('')
        setEnterPoint('')
        setEnterHalfHour()
        await checkAvailable(e.value, formattedDate);
    };

    function calculateTimeRange(enter, exit) {
        let timeDifference = exit - enter
        if (timeDifference % 2 == 0) {
            return `${timeDifference / 2} ${timeDifference / 2 > 1? ' uren' : ' uur'}`
        }
        else {
            return `${(timeDifference -1)/ 2}.5 ${(timeDifference -1)/ 2 > 1? ' uren' : ' uur'}`
        }
    }
    function pointToTimeString(enter, exit) {
        let enterString = enter % 2 == 0? `${enter/2 < 10? '0': ''}${enter/2}:00` : `${(enter - 1)/2 < 10? '0': ''}${(enter -1 )/2}:30`
        let exitString = exit % 2 == 0? `${exit/2 < 10? '0': ''}${exit/2}:00` : `${(exit - 1)/2 < 10? '0': ''}${(exit -1 )/2}:30`
        return `${enterString} - ${exitString}`
    }
    async function handleFormSubmit() {
        const obj = {
            fullName: `${firstName} ${lastName}`,
            email: userEmail || '',
            phoneNumber: phoneNumber || '',
            bookingTime: pointToTimeString(enterPoint, exitPoint),
            timestamp: queryStringDate
        };
    
        console.log('Sending data:', obj);
    
        try {
            const response = await fetch('http://metalchurch.nl:5050/query/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Response data:', data);
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    }
    
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
                    <Calendar value={date} onChange={handleDateChange} dateFormat="dd.mm.yy" readOnlyInput/>
                </div>
                <div className='hours-sec'>
                    {hourElements}
                </div>
                {typeof enterPoint == 'number' && typeof exitPoint == 'number' && exitPoint - enterPoint >= 1? 
                <h3 className="timeRange">
                {progressStep == 2 && (timeRange != '' || timeRange != '0 uur')? timeRange : ''} 
                </h3> : ''}
                {hourElements ?                 
                    <div className='hours-sec'>
                    <div className="enterHoursBlock">
                    <h5>Hoe laat wil je komen</h5>
                    <div className='enterHours-sec hidden'>
                    <Dropdown disabled={progressStep == 1? false : true} defaultValue={"00"} value={enterHour} onChange={(e) => {
                    setEnterHour(e.value)
                    setOriginalEnterPoint(e.value.code)
                    setEnterPoint(e.value.code)
                    setEnterHalfHour({name: "00", code: 0})
                    }} options={hoursListToShow} optionLabel="name" className="enterHour-dropdown" checkmark={true}  highlightOnSelect={false} />
                    <h2>:</h2>
                    <Dropdown disabled={progressStep == 1? false : true} value={enterHalfHour} onChange={(e) => {
                    setEnterHalfHour(e.value)
                    setEnterPoint(originalEnterPoint + e.value.code)
                    }} options={hourElements? availableHours.indexOf(originalEnterPoint + 1) != -1 ? [{name: "00", code: 0}, {name: "30", code: 1}] : [{name: "00", code: 0}] : []} optionLabel="name" className="enterHour-dropdown" checkmark={true}  highlightOnSelect={false} />
                    </div>
                    </div>
                    <div className={typeof enterPoint == 'number'? progressStep == 1? "next-button-sec": "next-button-sec reversed" : "next-button-sec unavailable"} onClick={() => {
                        if (typeof enterPoint == 'number') {
                            if (progressStep == 1) {
                                setProgressStep(2)
                            }
                            else {
                                setProgressStep(1)
                            }
                        }
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                    </div>
                    {progressStep == 2?                     <div className="enterHoursBlock">
                    <h5>Hoe laat ben je klaar</h5>
                    <div className='enterHours-sec hidden'>
                    <Dropdown disabled={progressStep == 2? false : true} defaultValue={"00"} value={exitHour} onChange={(e) => {
                    setExitHour(e.value)
                    setOriginalExitPoint(e.value.code)
                    setExitPoint(e.value.code)
                    setExitHalfHour({name: "00", code: 0})
                    }} options={exitHoursListToShow} optionLabel="name" className="enterHour-dropdown" checkmark={true}  highlightOnSelect={false} />
                    <h2>:</h2>
                    <Dropdown disabled={progressStep == 2? false : true} value={exitHalfHour} onChange={(e) => {
                    setExitHalfHour(e.value)
                    setExitPoint(originalExitPoint + e.value.code)
                    }} options={hourElements? availableExitHours.indexOf(originalExitPoint + 1) != -1 ? [{name: "00", code: 0}, {name: "30", code: 1}] : [{name: "00", code: 0}] : []} optionLabel="name" className="enterHour-dropdown" checkmark={true}  highlightOnSelect={false} />
                    </div>
                    </div> : ''}
                </div>
                : ''}
                {timeRange != '' && timeRange != '0 uur' && progressStep == 2? 
                <button className={isSubmit ? 'booking-submit' : 'booking-submit disable'} type='button' onClick={async () => { isSubmit ? await handleFormSubmit() : '' }}>
                Maak een boeking
            </button> : ''}
            </form>
        </div>
        <FooterComponent></FooterComponent>
        </>
    )
}
export default Booking
