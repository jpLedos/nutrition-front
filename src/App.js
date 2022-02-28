import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './styles/App.css';

import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Recipes from './pages/Recipes'
import Patients from './pages/Patients'
import Contact from './pages/Contact'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorPage from './pages/ErrorPage'

function App() {
  return (
    <div>
    <Router>
      <Header/ >

      <Routes>
        <Route exact path="/" element = {<Home />} />
        <Route path="/login" element = { <Login /> } />
        <Route path="/logout" element = { <Logout /> } />
        <Route path="/recipes" element = { <Recipes /> } />
        <Route path="/patients" element = { <Patients /> } />
        <Route path="/contact" element = { <Contact /> } />
        <Route path="*" element = { <ErrorPage /> } />
      </Routes>
    
      <Footer  /> 
    
    </Router>
  </div>
  );
}

export default App;
