import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import "../css/home.css"

const Home = () => {

    return (
        <>
        <HeaderComponent></HeaderComponent>
        <div className="container">
        <div className="top-title-sec">
            <div className="top-title-img">
                <div className="img-overlay"></div>
                <img src="../src/assets/img/top-title-img.jpg" alt="" />
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
                        <img src="../src/assets/img/music-icon.svg" alt="" />
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
                        <img src="../src/assets/img/headphones.svg" alt="" />
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
                        <img src="../src/assets/img/free-icon.svg" alt="" />
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
            <br/><br/>
            Ons verhaal gaat niet alleen over geluidsdichte muren en hoogwaardige apparatuur; het gaat over passie, veerkracht en het besef dat iedereen recht heeft op een kans om zijn stempel te drukken op de wereld van muziek. Achter dit initiatief schuilt een bitterzoet verhaal - de studio is opgericht ter nagedachtenis aan een getalenteerde muzikant die ons te vroeg heeft verlaten. Ter ere van hen hebben we besloten onze deuren te openen zonder de financiële last, zodat kunstenaars toegang hebben tot een professionele opnameomgeving zonder zich zorgen te maken over de kosten.
            <br/><br/>
            Metal Church is meer dan alleen een studio; het is een toevluchtsoord voor degenen die tegenslagen hebben gehad, een plek waar de echo's van verdriet kunnen worden omgezet in melodieën van hoop. We geloven dat iedereen de kans moet krijgen om zijn stem te laten horen en zijn emoties te uiten via muziek, ongeacht financiële beperkingen.
            </p>
            <div className="about-us-poster">
                <div className="img-overlay"></div>
                <img src="../src/assets/img/about-us-poster.jpg" alt="" />
            </div>
        </div>
        </div>
        <FooterComponent></FooterComponent>
        </>
    )
}
export default Home