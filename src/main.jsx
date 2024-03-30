import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './jsx/Home';
import Contacts from './jsx/Contacts';
import FAQ from './jsx/FAQ';
import Booking from './jsx/BookAStudio';
import SearchPage from './jsx/SearchPage';
import BurgerMenu from './jsx/components/BurgerManu';
import './css/mediaRequests.css'


const App = () => {
  const [burgerShown, showBurger] = useState(false)


  const router = createBrowserRouter([
    {
      path: '/',
      element: 
      <>
      <BurgerMenu burgerShown={burgerShown} showBurger={showBurger}/>
      <Home burgerShown={burgerShown} showBurger={showBurger}/>
      </>
    },
    {
      path: '/contacts',
      element: 
      <>
      <BurgerMenu burgerShown={burgerShown} showBurger={showBurger}/>
      <Contacts burgerShown={burgerShown} showBurger={showBurger} />
      </>
    },
    {
      path: '/FAQ',
      element: 
      <>
      <BurgerMenu burgerShown={burgerShown} showBurger={showBurger}/>
      <FAQ burgerShown={burgerShown} showBurger={showBurger}/>
      </>
    },
    {
      path: '/new-booking',
      element: 
      <>
      <BurgerMenu burgerShown={burgerShown} showBurger={showBurger}/>
      <Booking burgerShown={burgerShown} showBurger={showBurger}/>
      </>
    },
    {
      path: '/search-booking/:bookingId',
      element: 
      <>
      <BurgerMenu burgerShown={burgerShown} showBurger={showBurger}/>
      <SearchPage burgerShown={burgerShown} showBurger={showBurger}/>
      </>
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <App/>
  </>
);
