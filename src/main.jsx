// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Amplify } from 'aws-amplify';
import './index.css';
import './App.css';
import './i18n';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);