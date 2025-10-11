import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Prevent browser/extension from overriding colors after load
const enforceColorScheme = () => {
  // Lock forced-color-adjust on all elements
  document.documentElement.style.setProperty('forced-color-adjust', 'none', 'important');
  document.body.style.setProperty('forced-color-adjust', 'none', 'important');
  document.body.style.setProperty('background', '#000', 'important');
  document.body.style.setProperty('color', '#fff', 'important');
  
  // Remove any injected filter styles
  const htmlElement = document.documentElement;
  if (htmlElement.style.filter) {
    htmlElement.style.setProperty('filter', 'none', 'important');
  }
  
  // Prevent meta theme-color changes
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', '#000000');
  }
};

// Run immediately
enforceColorScheme();

// Re-enforce after DOM loads
document.addEventListener('DOMContentLoaded', enforceColorScheme);

// Re-enforce after everything loads
window.addEventListener('load', enforceColorScheme);

// Watch for style changes (browser extensions often inject styles)
const observer = new MutationObserver(() => {
  enforceColorScheme();
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['style', 'class'],
  childList: false,
  subtree: false
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
