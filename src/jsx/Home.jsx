import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import "../css/home.css"

const Home = ({burgerShown, showBurger}) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (!scrolled) {
            window.scrollTo(0, 0);
            setScrolled(true); // Update the state variable to indicate scrolling has been performed
          }
    }, [scrolled])

    return (
        <>
        <HeaderComponent burgerShown={burgerShown} showBurger={showBurger}></HeaderComponent>
        <div className="container">
        <div className="top-title-sec">
            <div className="top-title-img">
                <div className="img-overlay"></div>
                <img src="/assets/img/top-title-img.jpg" alt="" />
                <div className="top-title-text">
                <h2>
                  Jouw muziek, onze ruimte - een <span>perfecte symfonie</span>.
                </h2>
                <Link to="/new-booking" className='book-link'>Studio boeken</Link>
            </div>
            </div>
        </div>
        <h2 className="section-name">
        Waarom Voor Ons Kiezen
        </h2>
        <div className="why-choose-us-sec">
            <div className="why-us-item">
                    <div className="why-us-img">
                        <img src="/assets/img/music-icon.svg" alt="" />
                    </div>
                    <h4>
                    Diversiteit
                    </h4>
                    <p>
                    We bieden gebruikers veel verschillende muziekinstrumenten, zoals: synthesizers, gitaren en drums
                    </p>
            </div>
            <div className="why-us-item">
                    <div className="why-us-img">
                        <img src="/assets/img/headphones.svg" alt="" />
                    </div>
                    <h4>
                    Gemak
                    </h4>
                    <p>
                    Je krijgt een veilige, comfortabele plek om je tracks op te nemen en optredens uit te voeren
                    </p>
                </div>
                <div className="why-us-item">
                    <div className="why-us-img">
                        <img src="/assets/img/free-icon.svg" alt="" />
                    </div>
                    <h4>
                    Prijs
                    </h4>
                    <p>
                    Voor uw bezoek hoeft u niets te betalen. Enkel bij afwezigheid bent u verplicht een boete van 25 euro te betalen
                    </p>
                </div>
        </div>
        <div className="try-yourself">
        <Link to="/new-booking" className='book-link'>Probeer het zelf</Link>
        </div>
        <h2 className="section-name">
        Over Ons
        </h2>
        <div className="about-us-sec">
            <p>
            Welkom bij Metal Church, een unieke muziekopnamestudio in het hart van Maurik, Nederland. Wij geloven in het bevorderen van creativiteit en het bieden van kansen aan aspirant-muzikanten om hun dromen waar te maken. Wat ons onderscheidt? De mogelijkheid om onze studioruimte gratis te huren.
            </p>
            <div className="about-us-poster">
                <div className="img-overlay"></div>
                <img src="/assets/img/about-us-poster.jpg" alt="" />
            </div>
        </div>
        </div>
        <FooterComponent></FooterComponent>
        </>
    )
}
export default Home