import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home/Home'
import About from './Pages/about/About'
import Dashboard from './Pages/Dashboard/Dashboard'
import Students from './Pages/Students/Students'
import Teachers from './Pages/Dashboard/Teachers'
import Years from './Pages/Years/Years'
import Dash from './Pages/Dashboard/Dash'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '@mui/material/Container';

function App() {

  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route
              path="students"
              element={<Students />}
            />
            <Route path="teachers" element={<Teachers />} />
            <Route path="years" element={<Years />} />
          </Route>
          <Route path="/Dash" element={<Dash />} />

        </Routes>

      </Router>
    </>
  )
}

export default App
