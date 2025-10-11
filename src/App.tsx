import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WaitlistPage from './pages/WaitlistPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/waitlist" element={<WaitlistPage />} />
  <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;