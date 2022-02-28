import React from 'react'
import {Link} from 'react-router-dom'

import portrait from '../../images/portrait2021.png'


function Nav() {

    const image = {
        display :'block',
        position : 'relative',
        width : '80px',
        marginRight : '10px'     }

    return (
        <nav style = {{position :"fixed", width : "100%"}}  className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            
            <img style = {image} src={portrait} alt="portrait" />
            <span className="navbar-brand" href="#">Laetitia PFISTER</span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item active">
                    <Link className="nav-link" to="/">Accueil
                        <span className="visually-hidden">(current)</span>
                    </Link>
                    </li>
                    <li className="nav-item active">
                    <Link className="nav-link" to="recipes">Recettes
                        <span className="visually-hidden">(current)</span>
                    </Link>
                    </li>
                    <li className="nav-item active">
                    <Link className="nav-link" to="Patients">Patients
                        <span className="visually-hidden">(current)</span>
                    </Link>
                    </li>
                    <li className="nav-item active">
                    <Link className="nav-link" to="Contact">Contact
                        <span className="visually-hidden">(current)</span>
                    </Link>
                    </li>
                
                </ul>
                <ul className="navbar-nav me-e">
                    <li className="nav-item active">
                    <button className="btn btn-success btn-sm p-0 mx-1 mb-2 ">
                        <Link className="nav-link" to="login">Connexion
                            <span className="visually-hidden">(current)</span>
                        </Link>
                    </button>
                    </li>
                    <li className="nav-item active">
                    <button className="btn btn-danger btn-sm p-0 mx-1 mb-2 "><Link className="nav-link" to="logout">Deconnexion
                        <span className="visually-hidden">(current)</span>
                    </Link></button>
                    </li>
                </ul>


            </div>
        </div>
        </nav>
    )
}

export default Nav
