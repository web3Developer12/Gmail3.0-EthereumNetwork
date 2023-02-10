import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './fonts.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Loader from './components/Loader'
import Home from './components/Home'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loader/>}/>
          <Route path="/mail" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
