import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RouteMeta from '@/components/RouteMeta';

import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

/** Remonte en haut a chaque changement de route (comportement attendu en SPA). */
const ScrollTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <>
      <RouteMeta />
      <ScrollTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
