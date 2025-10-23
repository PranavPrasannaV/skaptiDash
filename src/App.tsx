import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import WaitlistPage from './pages/WaitlistPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import WaitlistPageSeller from './pages/WaitlistPageSeller.tsx';
import Contact from './pages/Contact.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/waitlist" element={<WaitlistPage />} />
      <Route path="/waitlist-seller" element={<WaitlistPageSeller />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;