import React from 'react'
import  {Link}  from "react-router-dom";
import Nav from '../Nav'

const Header = () => {
    return (
        <header> 
            <div className="banner-container">
                <h1><Link to= "/" >Laetitia PFISTER</Link></h1>
                <Nav />

            </div>
        </header>    
           
    )
}

export default Header
