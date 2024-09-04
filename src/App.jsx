import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'

import Footer from './components/Footer'
import SiteRoutes from './components/SiteRoutes'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <>
    
    <div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">
      <Sidebar/>
      <SiteRoutes/>
    </div>
    </div>

    </>
  )
}

export default App
