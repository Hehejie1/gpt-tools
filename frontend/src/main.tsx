import React from 'react'
import {createRoot} from 'react-dom/client'
import './style.css'
import reportWebVitals from './reportWebVitals'
import App from './App'
import './main.css'
const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)

reportWebVitals(console.log)