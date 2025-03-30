// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Amplify } from 'aws-amplify';
import './index.css';
import './App.css';
import './i18n';
import outputs from '../amplify_outputs.json';
import {parseAmplifyConfig} from "aws-amplify/utils";

//Amplify.configure(outputs);
const amplifyConfig = parseAmplifyConfig(outputs);

Amplify.configure({
    ...amplifyConfig,
    API: {
        ...amplifyConfig.API,
        REST: outputs.custom.API,  // ← 加载自定义 REST API 的 endpoint 配置
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);