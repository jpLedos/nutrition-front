import React, {useState} from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

import Home from './pages/Home'
import Login from './pages/Login'
import Recipes from './pages/Recipes'
import Recipe from './pages/Recipe'
import RecipesCard from './pages/RecipesCard'
import RecipeEdit from './pages/RecipeEdit'
import Patients from './pages/Patients'
import Patient from './pages/Patient'
import Contact from './pages/Contact'
import MentionsLegales from './pages/MentionsLegales'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorPage from './pages/ErrorPage'
import { ToastContainer } from 'react-toastify';

import { hasAuthenticated } from './services/AuthApi'
import Auth from "./contexts/Auth"
import ProtectedRoute from './components/ProtectedRoute'


function App() {

const [isAuthenticated,setIsAuthenticated] = useState(hasAuthenticated().tokenValid);
const [roles,setRoles] = useState(hasAuthenticated().roles);
const [email, setEmail] = useState(hasAuthenticated().email);
//console.log(roles)
return (
    <Auth.Provider value = {{ isAuthenticated, setIsAuthenticated, 
                            roles, setRoles,
                            email, setEmail }}>
        <Router>
        <Header/ >

        <Routes>
            <Route exact path="/" element = {<Home />} />
            
            <Route path="/recipes-card" element = { <RecipesCard /> } />
            <Route path="/recipe/:recipeId" element = { <Recipe /> } /> 
            <Route path="/contact" element = { <Contact /> } />
            <Route path="/mentions-legales-politique-confidentialite" element = { <MentionsLegales /> } />
            <Route element={
                <ProtectedRoute 
                    isAllowed={isAuthenticated && roles.includes('ROLE_ADMIN') } />}>
                <Route path="/recipes-list" element = { <Recipes /> } />
                <Route path="/edit-recipe/:recipeId" element = { <RecipeEdit /> } /> 
                <Route path="/edit-recipe" element = { <RecipeEdit /> } />            
                <Route path="/patient" element = { <Patient /> } />
                <Route exact path="/patients" element = { <Patients /> } />
                <Route path="/patient/:userId" element = { <Patient /> } />
            </Route>

            <Route path="/login" element = { <Login /> } />
            <Route path="*" element = { <ErrorPage /> } />
        </Routes>
        
        <Footer  /> 
        
        </Router>
        <ToastContainer />
    </Auth.Provider>

  );
}

export default App