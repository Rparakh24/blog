import './App.css'
// import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Dash } from './pages/Dash'
import { Create } from './pages/Create'
import { Read } from './pages/Read'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/dash" element={<Dash/>} />
          <Route path="/create" element={<Create/>} />
          <Route path='/read' element={<Read/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
