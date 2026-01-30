import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage.tsx';
import WaitlistPage from './pages/WaitlistPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import WaitlistPageSeller from './pages/WaitlistPageSeller.tsx';
import Support from './pages/Contact.tsx';
import FaqPage from './pages/FaqPage.tsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.tsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="/waitlist-seller" element={<WaitlistPageSeller />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
    </>
  );
}

export default App;