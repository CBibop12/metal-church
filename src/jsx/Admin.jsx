import React, { useEffect, useState } from 'react';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import '../css/admin.css';
import visibility from '/assets/img/visibility.svg';
import visibilityOff from '/assets/img/visibilityOff.svg';
import SHA256 from 'crypto-js/sha256';
import DayBlock from './components/DayBookingBlock';

const AdminPanel = ({ burgerShown, showBurger, adminPassword, setAdminPassword}) => {
    const [isAllowed, setIsAllowed] = useState(false);
    const [isButtonAvailable, setIsButtonAvailable] = useState(false);
    const [userPassword, setUserPassword] = useState('');
    const [passwordShown, showThePassword] = useState(false);
    const hashedAdminPassword = "954d921ef6d3371b1ea8f7c54024bdc26450c0f26f4c7175720c63857b161799";
    const [date, setDate] = useState('');
    const [isSearching, setIsSearching] = useState(false)
    const [isSearchButtonAvailable, setIsSearchButtonAvailable] = useState(false)
    const [dayBlockElements, setDayBlockElements] = useState()
    const [futureBlockElements, setFutureBlockElements] = useState()
    const [isFetched, setIsFetched] = useState(false)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const [formattedDate, setFormattedDate] = useState(`${year}-${month}-${day}`)
    const [foundDayBlock, setFoundDayBlock] = useState()


    // Проверка наличия сохраненного пароля администратора в локальном хранилище при загрузке страницы
    useEffect(() => {
        const storedAdminPassword = localStorage.getItem('adminPassword');
        if (storedAdminPassword) {
            console.log("We took your password from localStorage");
            const hashedStoredAdminPassword = SHA256(storedAdminPassword).toString();
            if (hashedStoredAdminPassword === hashedAdminPassword) {
                setIsAllowed(true);
            }
        }
    }, []);

    //Login logic
    const handleInputChange = (e) => {
        let input = e.target.value;
        // Очищаем ввод от всех символов кроме цифр и точек
        input = input.replace(/[^\d.]/g, '');
        if (input.length < date.length && (date.length == 3 || date.length == 6)) {
            setDate(input.slice(0, -1))
        }
        else if (input.length == 2 || input.length == 5) {
            setDate(input + '.')
        }
        else {
            setDate(input)
        }
    };
    useEffect(() => {
        setIsSearchButtonAvailable(date.length > 9)
    }, [date])
    useEffect(() => {
        setIsButtonAvailable(userPassword.length >= 3);
    }, [userPassword]);

    const handlePaste = (e) => {
        const pastedText = e.clipboardData.getData('text');
        setUserPassword(prevValue => prevValue + pastedText);
        setUserPassword(userPassword.substring(0, userPassword.length - pastedText.length));
    };

    const handleLogin = () => {
        // Хэшируем введенный пароль и сравниваем с захэшированным администраторским паролем
        const hashedInputPassword = SHA256(userPassword).toString();
        if (hashedInputPassword === hashedAdminPassword) {
            setIsAllowed(true);
            localStorage.setItem('adminPassword', userPassword)
        } else {
            console.log(userPassword, "is wrong password");
            setIsAllowed(false);
            setUserPassword(''); // Очищаем поле ввода пароля
        }
    };
    //////////

    //Booking Proccessing Logic
    function checkIsToday (dateString) {
        let currentDate = new Date();
        let [year, month, day] = dateString.split("-");
        let targetDate = new Date(year, month - 1, day);
        // Сравниваем даты
        if (currentDate.toDateString() === targetDate.toDateString()) {
            return 'today';
        }
        return 'normal'
    }


    function getFutureBookings(bookings) {
        console.log(formattedDate);
        const sortedArray = bookings.filter(obj => {
            const objDate = new Date(obj.date);
            return objDate >= new Date(formattedDate);
        }).sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        });
        console.log(sortedArray);
        const futureElementsArr = sortedArray.map(el => (
            <DayBlock key={el.date} dayInfo={el} />
        ));
    
        return futureElementsArr;
    }
    

    function processData(data) {
        let datesArr = [];
        let elementsArr = [];

        for (let el of data) {
            if (el.hasOwnProperty('_id') && el.hasOwnProperty('fullName') && (el.hasOwnProperty('email') || el.hasOwnProperty('phoneNumber')) && (el.hasOwnProperty('bookingTime') && el.bookingTime != '') && el.hasOwnProperty('timestamp')) {
                let tempInd = datesArr.find(dateElement => dateElement.date === el.timestamp);
                if (tempInd) {
                    tempInd.bookings.push(el);
                    tempInd.bookingCount++;
                } else {
                    datesArr.push({
                        date: el.timestamp,
                        status: checkIsToday(el.timestamp),
                        bookingCount: 1,
                        bookings: [el]
                    });
                }
            }
        }
        let todayObj = datesArr.find(item => item.date === formattedDate)

        if (!todayObj) {
            datesArr.push({
                date: formattedDate,
                status: 'today',
                bookingCount: 0,
                bookings: []
            });
        }
    
        // Рассортировать массив по нарастающей дате
        datesArr.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        console.log(datesArr);
        // Создать элементы DayBlock на основе отсортированных данных
        for (let el of datesArr) {
            elementsArr.push(<DayBlock dayInfo={el} />);
        }
    
        // Установить созданные элементы в состояние компонента
        setDayBlockElements(elementsArr);
        setFutureBlockElements(getFutureBookings(datesArr))
    }

    async function getAllBookingsInfo() {
        try {
            const res = await fetch('/query');
            const data = await res.json(); // Дожидаемся преобразования JSON
            processData(data);
        } catch (err) {
            console.error('Error occured when fetching the data: ', err);
        }
    }

    if (!isFetched) {
        getAllBookingsInfo()
        setIsFetched(true)
    }
    
    async function handleSearch(dateToSearch) {
        const [day, month, year] = dateToSearch.split('.')
        const queryDate = `${year}-${month}-${day}`
        if (isSearchButtonAvailable) {
                    try {
            const res = await fetch(`/query/timeRange/${queryDate}/${queryDate}`)
            const data = await res.json()
            console.log(data);
            if (data.length > 0) {
                setFoundDayBlock(<DayBlock dayInfo={
                    {
                        date: queryDate,
                        status: 'normal',
                        bookingCount: data.length,
                        bookings: [...data]
                    }
                } />)
            }
            else {
                setFoundDayBlock(<DayBlock dayInfo={
                    {
                        date: queryDate,
                        status: 'normal',
                        bookingCount: data.length,
                        bookings: []
                    }
                } />)
            }
            setIsSearching(true)
        } catch (err) {
            console.log("Error occcured when searching for orders, ", err);
        }
        } 

    }

    return (
        <>
            {!isAllowed ?
                <>
                    <HeaderComponent burgerShown={burgerShown} showBurger={showBurger} />
                    <div className="container top-section login-section">
                        <div className="entrance-block">
                            <h2>Het <span>wachtwoord</span>:</h2>
                            <div className="passInput-block">
                                <div className="visibilityButton">
                                    <img src={passwordShown ? visibilityOff : visibility} alt="" onClick={() => showThePassword(!passwordShown)} onPaste={() => handlePaste()} />
                                </div>
                                <input type={passwordShown ? "text" : "password"} className='password-input' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                            </div>
                            <div className={isButtonAvailable ? "enterAdminButton" : "enterAdminButton disable"} onClick={handleLogin}>
                                Inloggen
                            </div>
                        </div>
                    </div>
                    <FooterComponent />
                </>
                :
                <>
                <HeaderComponent burgerShown={burgerShown} showBurger={showBurger} />
                <div className="container top-section">
                    {isSearching ? 
                <>
                    <div className="top-admin-title">
                        <div className="go-back-button" onClick={() => window.location.reload()}>
                           <span><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg></span>
                            ga terug
                        </div>
                    </div>
                    {foundDayBlock}
                </> : 
                <>
                    <div className="top-admin-title">
                        <h2>
                        alle boekingen
                        </h2>
                        <div className="searchDate-input">
                        <input
                            type="text"
                            className="enterDateInput"
                            placeholder='dd.mm.yyyy'
                            value={date}
                            onChange={handleInputChange}
                            maxLength="10" // Максимальная длина ввода (10 символов для "dd.mm.yyyy")
                        />
                        <div className={isSearchButtonAvailable? "searchDate-button" : "searchDate-button disable"} onClick={async() => handleSearch(date)}>
                        Zoek <span className='fullSearchName'>op datum</span>
                        </div>
                        </div>
                    </div>
                    {futureBlockElements}
                </>   
                }
                </div>
                <FooterComponent />
            </>
            }
        </>
    );
};

export default AdminPanel;
