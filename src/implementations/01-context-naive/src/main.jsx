import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './optimized/App.jsx' // 👈 Make sure this points to your optimized App!
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)