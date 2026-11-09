import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ToastProvider } from './components/Toast';
import { AppProvider } from './context/AppContext';
import { PrefsProvider } from './context/PrefsContext';
import './index.css';
import './assets/css/base.css';
import './assets/css/auth.css';
import './assets/css/admin.css';
import './assets/css/landing.css';
import './assets/css/embed.css';
import './assets/css/extras.css';

// NOTE: no StrictMode — page logic wires DOM listeners once per mount (ponytail:
// re-add StrictMode + effect cleanups when backend/auth lands).

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <PrefsProvider>
      <AppProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AppProvider>
    </PrefsProvider>
  </BrowserRouter>
);
