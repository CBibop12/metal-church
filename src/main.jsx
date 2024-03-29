import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './jsx/Home';
import Contacts from './jsx/Contacts';
import FAQ from './jsx/FAQ';
import Booking from './jsx/BookAStudio';
import SearchPage from './jsx/SearchPage';


const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/contacts',
      element: <Contacts/>
    },
    {
      path: '/FAQ',
      element: <FAQ/>
    },
    {
      path: '/new-booking',
      element: <Booking></Booking>
    },
    {
      path: '/search-booking/:bookingId',
      element: <SearchPage></SearchPage>
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
