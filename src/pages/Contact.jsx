import React from 'react'
import { Fragment } from 'react'
import Title from '../components/Title'
import Email from '../components/Email'


const Contact = () => {

  return (
    
    <Fragment>
        <Title>Contact</Title>
        <section className="d-md-flex p-0 m-0">   
          
            <aside className="bg-light my-4 p-4 "> 
                <h3>Laetitia PFISTER</h3>
                <p>DIÉTÉTICIENNE- NUTRITIONNISTE</p>
                <p>N° ADELI : 00 00 000 000</p>
                <p>Consulte sur  3 cabinets situés entre Chartres et Rambouillet</p>
                <ol>
                    <li>St Symphorien-le-Château</li>
                    <li>EPERNON</li>
                    <li>Raizeux (EPERNON)</li>
                </ol>

                <h3>Consultations</h3>
                <p><strong>lundi & samedi après-midi:</strong>
                <br />Cabinet médical de Saint-Symphorien Le Château
                <br />28700 Saint-Symphorien Le Château</p>
                <p><strong>mardi, jeudi & samedi matin :</strong>
                <br />Cabinet médical d'Épernon
                <br />9 rue de la gare
                <br />28230 EPERNON</p> 
                <p><strong>mardi & jeudi : 18h-19h30 &  vendredi (9h-19h30) :</strong>
                <br />Cabinet médical de Raizeux
                <br />78125 Raizeux</p>

                <a className="btn btn-lg btn-primary" href="tel:+33676962058">Prendre RDV 02 76 86 20 58</a>
            </aside>

            <section className="bg-light m-4 p-4 ">
            <Email />
            </section>
     
     </section>

    </Fragment>

  )
}

export default Contact