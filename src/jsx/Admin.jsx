import React, { useEffect, useState } from 'react';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import '../css/admin.css';
import visibility from '../assets/img/visibility.svg';
import visibilityOff from '../assets/img/visibilityOff.svg';
import SHA256 from 'crypto-js/sha256';
import DayBlock from './components/DayBookingBlock';

const AdminPanel = ({ burgerShown, showBurger, adminPassword, setAdminPassword}) => {
    const [isAllowed, setIsAllowed] = useState(false);
    const [isButtonAvailable, setIsButtonAvailable] = useState(false);
    const [userPassword, setUserPassword] = useState('');
    const [passwordShown, showThePassword] = useState(false);
    const hashedAdminPassword = "954d921ef6d3371b1ea8f7c54024bdc26450c0f26f4c7175720c63857b161799";
    const [date, setDate] = useState('');
    const [isSearchButtonAvailable, setIsSearchButtonAvailable] = useState(false)

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
            setAdminPassword(userPassword)
        } else {
            console.log(userPassword, "is wrong password");
            setIsAllowed(false);
            setUserPassword(''); // Очищаем поле ввода пароля
        }
    };

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
                        <div className={isSearchButtonAvailable? "searchDate-button" : "searchDate-button disable"}>
                        Zoek op datum
                        </div>
                        </div>
                    </div>
                    <DayBlock dayBookings={{}}/>
                </div>
                <FooterComponent />
            </>
            }
        </>
    );
};

export default AdminPanel;
