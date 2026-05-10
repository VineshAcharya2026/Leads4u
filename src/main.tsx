import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {loadOmnidimWidget} from './lib/load-omnidim-widget';
import './index.css';

const omnidimKey = import.meta.env.VITE_OMNIDIM_WIDGET_KEY;
if (typeof omnidimKey === 'string' && omnidimKey.length > 0) {
  loadOmnidimWidget(omnidimKey);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
