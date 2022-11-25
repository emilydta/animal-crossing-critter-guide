import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/nunito';
import '@fontsource/nunito/900.css';
import '@fontsource/nunito/800.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/600.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();