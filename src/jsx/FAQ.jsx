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
                 How do I book a session at the music recording studio? <span className={accordion1Open ? "open" : ''}><img src={chevronDown} alt="" /></span>
                </div>
                <p className={accordion1Open ? "shown" : ""}>
                 Booking a session is easy! Simply visit our website and navigate to the booking page. Select your desired date and time, provide your contact information, and confirm your booking. It's that simple!
                </p>
              </div>
      
              <div className="accordion-item" onClick={() => toggleAccordion(2)}>
                <div className='accordionItem-cover'>
                 Can I use the studio for free? <span className={accordion2Open ? "open" : ''}><img src={chevronDown} alt="" /></span>
                </div>
                <p className={accordion2Open ? "shown" : ""}>
                 Yes, you can use the studio for free as long as you book a session in advance. We offer complimentary bookings, allowing you to unleash your creativity without any cost.
                </p>
              </div>
      
              <div className="accordion-item" onClick={() => toggleAccordion(3)}>
                <div className='accordionItem-cover'>
                 What happens if I don't show up for my booked session? <span className={accordion3Open ? "open" : ''}><img src={chevronDown} alt="" /></span>
                </div>
                <p className={accordion3Open ? "shown" : ""}>
                  If you miss your booked session without canceling in advance, a 25 euros fine will be applied. We encourage you to be mindful of your booking to avoid any inconvenience.
                </p>
              </div>
      
              <div className="accordion-item" onClick={() => toggleAccordion(4)}>
                <div className='accordionItem-cover'>
                 Are there any penalties for canceling a session? <span className={accordion4Open ? "open" : ''}><img src={chevronDown} alt="" /></span>
                </div>
                <p className={accordion4Open ? "shown" : ""}>
                  You can cancel your session free of charge up to 24 hours before the scheduled time. However, late cancellations or no-shows may result in a 25 euros fine.
                </p>
              </div>
      
              <div className="accordion-item" onClick={() => toggleAccordion(5)}>
                <div className='accordionItem-cover'>
                 What musical instruments and equipment are available in the studio? <span className={accordion5Open ? "open" : ''}><img src={chevronDown} alt="" /></span>
                </div>
                <p className={accordion5Open ? "shown" : ""}>
                 Our studio provides a diverse range of musical instruments, including keyboards, guitars, drums, and more. We also offer professional software for music production to enhance your creative process.
                </p>
              </div>
      
              <div className="accordion-item" onClick={() => toggleAccordion(6)}>
                <div className='accordionItem-cover'>
                 How long can I use the studio for during a booking? <span className={accordion6Open ? "open" : ''}><img src={chevronDown} alt="" /></span>
                </div>
                <p className={accordion6Open ? "shown" : ""}>
                 You can use the studio for as long as you want during your booked session. Enjoy an uninterrupted creative experience without worrying about time constraints.
                </p>
              </div>
      
              <div className="accordion-item" onClick={() => toggleAccordion(7)}>
                <div className='accordionItem-cover'>
                  Can I bring my own instruments and equipment? <span className={accordion7Open ? "open" : ''}><img src={chevronDown} alt="" /></span>
                </div>
                <p className={accordion7Open ? "shown" : ""}>
                 Absolutely! Feel free to bring your own instruments and equipment to personalize your recording session. Our studio is designed to accommodate your creative preferences.
                </p>
              </div>
            </div>
          </div>
          <FooterComponent />
        </>
      );
}

export default FAQ;