import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Navbar } from './components/navbar.tsx'
import { Footer } from './components/footer.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <App />
      </div>
      <Footer />
    </div>
  </React.StrictMode>,
)
