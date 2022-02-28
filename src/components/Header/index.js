import React from 'react'
import Nav from '../Nav'

import food from '../../images/food.jpg'

const Header = () => {

    const imageStyle = {
        display :'block',
        height : '350px',
        width : '100%',
        marginRight : '10px' ,
        margin : 'auto'  ,
        objectFit : 'cover'
         }

    return (


        <header> 
            <div className="banner-container">
                <Nav />
                <h1 className="text-header">NUTRITION & DIETETIQUE</h1>
                <img  style = { imageStyle }  src={ food } alt="food" />
                
            </div>
        </header>    
           
    )
}

export default Header
