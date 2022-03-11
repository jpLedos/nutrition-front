import React, {useContext, useEffect, useState} from 'react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import { login, logout, hasAuthenticated } from '../services/AuthApi'
import Auth from '../contexts/Auth'
import { Spinner } from 'react-bootstrap';

const LoginForm = () => {

    const {isAuthenticated,setIsAuthenticated, roles, setRoles, email, setEmail } = useContext(Auth);
    const [showSpinner , setShowSpinner] = useState(false);
    const  navigate = useNavigate()
    const validateForm = () =>                                 
    { 
        let formOk= true;

        const email = document.getElementById("email");
        const password = document.getElementById("password");     
  
                
        if  (!email.value.match(/[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i)){ 
            document.getElementById('errorEmail').innerHTML="Veuillez entrez un email valide";  
            email.focus(); 
            formOk =  false; 
        }else{
            document.getElementById('errorEmail').innerHTML="";  
        }

        if (password.value === '' ){ 
            document.getElementById('errorPassword').innerHTML="Il faut saisir le mot de passe";  
            password.focus(); 
            formOk = false;
        }else{
            document.getElementById('errorPassword').innerHTML="";  
        }

        return formOk;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()) {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;        
        
            const apiSuccess = document.getElementById("apiSuccess")
            const apiError = document.getElementById("apiError")
        
            const credentials = {
                email, 
                password,
            }

            setShowSpinner(true)
            
            try {
                const response = await login(credentials)
                setIsAuthenticated(hasAuthenticated().tokenValid);
                setRoles (hasAuthenticated().roles);
                setEmail ( hasAuthenticated().email);
                document.forms['contact'].reset();
                apiSuccess.innerHTML="Vous etes connecté !"
                apiError.innerHTML=""
                setShowSpinner(false)
                navigate('/recipes-card');
            } catch ({response}) {
                setIsAuthenticated(false);
                logout()
                apiSuccess.innerHTML=""
                console.log(response.data)
                apiError.innerHTML=  response.data.message
                setShowSpinner(false)
            } 
        }
    }

  return (
    <Fragment>
            <h2>Formulaire de Connexion</h2>
            <div className="msg">
                <p className="msgSuccess" id="apiSuccess"></p>
                <p className="msgError" id="apiError"></p>
            </div>
            <form name="contact" action="https://formspree.io/f/mjvlgznz" encType="multipart/form-data" method='POST'>
                <div>
                    <input type="email" id="email" name="email" 
                    required aria-required="true" 
                    autoComplete = "email"
                    className="form-control" placeholder="Votre Email"/>  
                    <span className="msgError" id="errorEmail"></span>
                </div>
                <div>
                    <input type="password" id="password" name ="password" 
                    required aria-required="true" className="form-control" 
                    autoComplete = "current-password"
                    placeholder="Votre mot de passe"/>
                    <span className="msgError" id="errorPassword"></span>
                </div>

                <div className="d-flex">
                {!showSpinner ?
                    <button onClick= {handleSubmit}  type="submit" className="btn btn-primary ">Connecter vous</button>
                     :
                    <Spinner className="text-center m-2" animation="border" variant="primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    }
                </div>
            </form>
    </Fragment>
  )
}

export default LoginForm