import React, { useState, useEffect} from 'react';
import "../css/base.css";
import "../css/FAQ.css";
import chevronDown from "/assets/img/chevron-down.svg"
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';

const FAQ = ({burgerShown, showBurger}) => {
    const [accordion1Open, setAccordion1Open] = useState(false);
    const [accordion2Open, setAccordion2Open] = useState(false);
    const [accordion3Open, setAccordion3Open] = useState(false);
    const [accordion4Open, setAccordion4Open] = useState(false);
    const [accordion5Open, setAccordion5Open] = useState(false);
    const [accordion6Open, setAccordion6Open] = useState(false);
    const [accordion7Open, setAccordion7Open] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (!scrolled) {
            window.scrollTo(0, 0);
            setScrolled(true); // Update the state variable to indicate scrolling has been performed
          }
    }, [scrolled])


    const toggleAccordion = (accordionNumber) => {
        switch (accordionNumber) {
            case 1:
                setAccordion1Open(!accordion1Open);
                break;
            case 2:
                setAccordion2Open(!accordion2Open);
                break;
            case 3:
                setAccordion3Open(!accordion3Open);
                break;
            case 4:
                setAccordion4Open(!accordion4Open);
                break;
            case 5:
                setAccordion5Open(!accordion5Open);
                break;
            case 6:
                setAccordion6Open(!accordion6Open);
                break;
            case 7:
                setAccordion7Open(!accordion7Open);
                break;
            default:
                break;
        }
    };

    return (
<>
  <HeaderComponent burgerShown={burgerShown} showBurger={showBurger}/>
  <div className="container top-section">
    <h2 className="section-name">
      <span className='orange'>FAQ</span>
    </h2>
    <div className="accordion-section">
      <div className="accordion-item" onClick={() => toggleAccordion(1)}>
        <div className='accordionItem-cover'>
          Hoe boek ik een sessie in de muziekstudio voor opname? <span className={accordion1Open ? "open" : ''}><img src={chevronDown} alt="" /></span>
        </div>
        <p className={accordion1Open ? "shown" : ""}>
          Het boeken van een sessie is eenvoudig! Ga gewoon naar onze website en ga naar de boekingspagina. Selecteer de gewenste datum en tijd, verstrek uw contactgegevens en bevestig uw boeking. Zo simpel is het!
        </p>
      </div>

      <div className="accordion-item" onClick={() => toggleAccordion(2)}>
        <div className='accordionItem-cover'>
          Kan ik de studio gratis gebruiken? <span className={accordion2Open ? "open" : ''}><img src={chevronDown} alt="" /></span>
        </div>
        <p className={accordion2Open ? "shown" : ""}>
          Ja, je kunt de studio gratis gebruiken, zolang je maar van tevoren een sessie boekt. We bieden gratis boekingen aan, zodat je je creativiteit kunt ontketenen zonder enige kosten.
        </p>
      </div>

      <div className="accordion-item" onClick={() => toggleAccordion(3)}>
        <div className='accordionItem-cover'>
          Wat gebeurt er als ik niet verschijn voor mijn geboekte sessie? <span className={accordion3Open ? "open" : ''}><img src={chevronDown} alt="" /></span>
        </div>
        <p className={accordion3Open ? "shown" : ""}>
          Als je je geboekte sessie mist zonder vooraf te annuleren, wordt er een boete van 25 euro in rekening gebracht. We moedigen je aan om op tijd te zijn voor je boeking om eventuele ongemakken te voorkomen.
        </p>
      </div>

      <div className="accordion-item" onClick={() => toggleAccordion(4)}>
        <div className='accordionItem-cover'>
          Zijn er boetes voor het annuleren van een sessie? <span className={accordion4Open ? "open" : ''}><img src={chevronDown} alt="" /></span>
        </div>
        <p className={accordion4Open ? "shown" : ""}>
          Je kunt je sessie gratis annuleren tot 24 uur voor de geplande tijd. Late annuleringen of het niet komen opdagen kunnen echter resulteren in een boete van 25 euro.
        </p>
      </div>

      <div className="accordion-item" onClick={() => toggleAccordion(5)}>
        <div className='accordionItem-cover'>
          Welke muziekinstrumenten en apparatuur zijn beschikbaar in de studio? <span className={accordion5Open ? "open" : ''}><img src={chevronDown} alt="" /></span>
        </div>
        <p className={accordion5Open ? "shown" : ""}>
          Onze studio biedt een diverse reeks muziekinstrumenten, waaronder toetsenborden, gitaren, drums en meer. We bieden ook professionele software voor muziekproductie om je creatieve proces te verbeteren.
        </p>
      </div>

      <div className="accordion-item" onClick={() => toggleAccordion(6)}>
        <div className='accordionItem-cover'>
          Hoe lang kan ik de studio gebruiken tijdens een boeking? <span className={accordion6Open ? "open" : ''}><img src={chevronDown} alt="" /></span>
        </div>
        <p className={accordion6Open ? "shown" : ""}>
          Je kunt de studio gebruiken voor zo lang als je wilt tijdens je geboekte sessie. Geniet van een ononderbroken creatieve ervaring zonder je zorgen te maken over tijdslimieten.
        </p>
      </div>

      <div className="accordion-item" onClick={() => toggleAccordion(7)}>
        <div className='accordionItem-cover'>
          Kan ik mijn eigen instrumenten en apparatuur meenemen? <span className={accordion7Open ? "open" : ''}><img src={chevronDown} alt="" /></span>
        </div>
        <p className={accordion7Open ? "shown" : ""}>
          Absoluut! Voel je vrij om je eigen instrumenten en apparatuur mee te nemen om je opnamesessie te personaliseren. Onze studio is ontworpen om aan je creatieve voorkeuren te voldoen.
        </p>
      </div>
    </div>
  </div>
  <FooterComponent />
</>

      );
}

export default FAQ;