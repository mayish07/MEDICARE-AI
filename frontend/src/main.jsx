import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import 'aos/dist/aos.css'
import AOS from 'aos'
import { Toaster } from 'react-hot-toast'

AOS.init({
  duration: 800,
  once: true,
  offset: 100
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#0D1B2A',
                color: '#F0F4F8',
                borderRadius: '12px',
              },
              iconTheme: {
                primary: '#00B4D8',
                secondary: '#fff',
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)