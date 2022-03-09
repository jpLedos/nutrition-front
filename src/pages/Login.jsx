import React from 'react'
import Title from '../components/Title'
import { Fragment } from 'react'
import LoginForm from '../components/LoginForm'
import breakfast from '../images/breakfast.jpg'

const Login = () => {

    const imageSuccessStyle = {
        display :'block',
        height : '250px',
        width : '100%',
        marginRight : '10px' ,
        margin : 'auto'  ,
        objectFit : 'cover',
        borderRadius : '10px',
         }


  return (
    <Fragment>
        <Title>Connexion</Title>
        <section className="d-md-flex p-0 m-0">   
        
            <aside className="bg-light my-4 p-4 "> 
                <h3>Accèss à votre profil et à vos recettes personnalisées</h3>
                <p>Un accès public est offert pour accéder à des recettes originales</p>
            
                <h3>Accès patients</h3>
                <p>Pour tous les patient en possessions des identifiants de connexion,  des recettes personnalisées en fonction du régime, des intolérences ou des allergies sont proposées et mises à jour régulierement</p>
                <img  className="my-4" style = {imageSuccessStyle} src={breakfast} alt="portrait" />
                <a className="btn btn-lg btn-primary" href="tel:+33676962058">Prendre RDV 02 76 86 20 58</a>
            </aside>

            <section className="bg-light m-4 p-4 ">
            <LoginForm />
            </section>
    
        </section>

    </Fragment>
  )
}

export default Login