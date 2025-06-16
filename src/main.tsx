import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppProvider from './context/AppProvider';
import './App.css';
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CookiesProvider defaultSetOptions={{path: '/', sameSite: 'lax'}}>
            <AppProvider>
                <App/>
            </AppProvider>
        </CookiesProvider>
    </React.StrictMode>,
);
