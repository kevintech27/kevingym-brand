import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RouteMeta from '@/components/RouteMeta';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Content from '@/pages/Content';
import Partners from '@/pages/Partners';
import PartnersBrands from '@/pages/PartnersBrands';
import PartnersGyms from '@/pages/PartnersGyms';
import Hybrid from '@/pages/Hybrid';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

/** Scrolls back to the top on every route change (expected SPA behaviour). */
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
          <Route path="/about" element={<About />} />
          <Route path="/content" element={<Content />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/partners/brands" element={<PartnersBrands />} />
          <Route path="/partners/gyms" element={<PartnersGyms />} />
          <Route path="/hybrid" element={<Hybrid />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
