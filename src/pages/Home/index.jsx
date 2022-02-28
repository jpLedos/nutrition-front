import React from 'react'
import { Fragment } from 'react'
import Title from '../../components/Title'
import success from '../../images/success.png'
import food2 from '../../images/food2-r.jpg'

const Home = () => {

    const imageSuccessStyle = {
        display :'block',
        height : '450px',
        width : '100%',
        marginRight : '10px' ,
        margin : 'auto'  ,
        objectFit : 'cover',
        transform : 'translate(0%, +25%)',
        borderRadius : '10px',
         }


  return (
    <Fragment>
        <Title>Accueil</Title>
        <section className="container-fluid px-0 ">   
            <div className="d-flex bg-light">
                <div className="my-4 m-0 p-4"><img style = {imageSuccessStyle} src={success} alt="portrait" /></div>
                <div className="my-4 p-4">
                    <h2>Mon parcours</h2>
                        <p>Diplômée du BTS diététique, après une reconversion professionnelle, je travaille avec passion pour vous réconcilier avec l'alimentation, qui doit rester avant tout un plaisir</p>
                        <ul>
                            <li className="list-group-item">Diplôme Universitaire Obésité de l'enfant et de l'adolescent - Hôpital Trousseau (Paris)</li>
                            <li className="list-group-item">E-Learning :
                            <ul> 
                                <li>Fodmaps et syndrome de l'intestin irritable : Florian Saffer</li>
                                <li>TCA (Troubles du comportement alimentaire), diététique et TCC (thérapies cognitives et comportementales) : Florian saffer</li>
                                <li>Diététique Psycho-comportementale : Florian Saffer</li>
                            </ul>
                            </li>
                            <li className="list-group-item">MOOC (massive open online course) :
                            <ul>
                                <li>101 techniques de base de la cuisine - AFPA</li>
                                <li>Prise en charge de la personne obèse - Sorbonne</li>
                                <li>Chirurgie de l'obésité - Université fédérale de Toulouse Midi Pyrénées</li>
                                <li>Allaitement maternel - AP-HP</li>  
                            </ul>
                            </li>

                            <li className="list-group-item">Membre du RéPOP Ile-de-France (réseaux de prévention et de prise en charge de l'obésité pédiatrique)</li>
                            <li className="list-group-item">Membre de l'ADL (Association des diététiciens Libéraux)</li>
                        </ul>
                </div>
            </div>
            <hr/>
            <div className="d-flex bg-light">
                <div className="m-4 p-4">
                    <h2>Mes services</h2>
                    <p>Pertes de poids ou pathologies, il y a souvent une raison pour une consultation avec une diététicienne-nutritionniste : </p>
                        <ul>
                            <li className="list-group-item">troubles du comportement alimentaire (TCA)</li>
                            <li className="list-group-item">surpoids, obésité, chirurgie bariatrique (sleeve, by-pass, ...)</li>
                            <li className="list-group-item">seniors</li>
                            <li className="list-group-item">enfants</li>
                            <li className="list-group-item">prise de poids</li>
                            <li className="list-group-item">femmes enceintes et allaitantes, diabète gestationnel</li>
                            <li className="list-group-item">diabète, hypercholestérolémie</li>
                            <li className="list-group-item">stéatose du foie ("foie gras")</li>
                            <li className="list-group-item">syndrome de l'intestin irritable (régime pauvre en FODMAPs)</li>
                            <li className="list-group-item">allergies alimentaires,  etc</li>
                        </ul>
                        <p>Je sais m'adapter à vos besoins et vous accompagner au mieux dans VOTRE QUOTIDIEN 😀 ! </p>
                </div>
                <div className="m-4 p-4"><img style = {imageSuccessStyle} src={food2} alt="portrait" /></div>
            </div>
        </section>

    </Fragment>
  )
}

export default Home