import React,  { useEffect, useState, useContext, Fragment  }from 'react'
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Title from '../../components/Title'
import { getItem } from '../../services/LocalStorage'
import Auth from '../../contexts/Auth'
import edition from '../../images/icons/edition.png'
import bin from '../../images/icons/bin.png'

const Patients = () => {

    const url='https://127.0.0.1:8000/api/';
    const myConfig = {
        headers: {
           Authorization: "Bearer " + getItem('nut-token'),
           accept : "application/json"
        }
     }

    const [patients, getPatients] = useState([]);
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const {isAuthenticated} =  useContext(Auth);

    const redirectToLogin=()=> {
        const url = "/login";
        const navigate = useNavigate ;
        navigate(url)
      }

    useEffect(() => {
        getAllPatients();
        }, []);


    const getAllPatients = ()=> {
        if(!isAuthenticated) {
            redirectToLogin();
        }

        axios.get(`${url}users`, myConfig)
        .then(response =>response.data)
        .then(data => {
            getPatients(data)
            //console.log(data)
        }) 
        .catch(err => {
            console.log(err) 
        })
    };

    const deleteOnePatient = ($id) => {
        if(!isAuthenticated) {
            redirectToLogin();
        }
       
        axios.delete(`${url}users/${$id}`, myConfig)
        .then(response =>response.data)
        .then(data => {
            console.log(data)
            getAllPatients();
        }) 
        .catch(err => {
            console.log(err) 
        })
    };

    const clickDelete = (e) => 
    {
        if( window.confirm('Etes vous sur de vouloir effectuer la suppression ?')) {
            deleteOnePatient(e.target.name)
        }
    } 

  return (
    <Fragment>
        <Title>Mes Patients</Title>
        
        <section className="d-md-flex p-0 m-0" >   
            <div className="bg-light my-4 p-4 "> 

                <input className = "mb-3" onChange={(e)=>handleChange(e)} value={search} placeholder="Recherche" id="search" type="text" />
                {patients.length > 0 ?
                <table className="table-responsive-md table-hover"  style={{minWidth : '400px', maxWidth : '800px'}}>
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nom</th>
                        <th scope="col">email</th>
                        <th scope="col">Regimes</th>
                        <th scope="col">Allergies</th>
                        <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {patients.filter(patient => patient.userName.includes(search))
                        .map((FilteredPatient) => {
                            return (
                                <tr key={FilteredPatient.id}>
                                    <th scope="row">{FilteredPatient.id}</th>
                                    <td>{FilteredPatient.userName}</td>
                                    <td>{FilteredPatient.email}</td>
                                    <td>
                                        {FilteredPatient.categories.map(category=> {
                                            return (
                                                <span key={category.id} className="user-infos category" >{category.title}</span>
                                            )
                                        })}
                                    </td>
                                    <td className="d-flex-wrap">
                                        {FilteredPatient.allergens.map(allergen=> {
                                            return (
                                                <span key={allergen.id} className="user-infos allergen"  >{allergen.title}</span>
                                            )
                                        })}
                                    </td>
                                    <td className="d-flex">
                                        <Link className="nav-link" to = {`/patient/${FilteredPatient.id}`}  >
                                            <img className="icon" src={edition} alt="edition" />
                                            <span className="visually-hidden">(current)</span>
                                        </Link>
                                        <div onClick={(e)=>clickDelete(e)} className="btn nav-link"  >
                                            
                                            <img className="icon" src={bin} alt="bin" name={FilteredPatient.id} />
                                            <span className="visually-hidden">(current)</span>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
                :
                <Spinner className="text-center m-5" animation="border" variant="primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                </Spinner>
                }
            </div>
        </section>
        <div className="d-flex justify-content-center">
            <Link className="btn btn-light m-3 " to="/patient">Créer un nouveau patient</Link>
        </div>

    </Fragment>
  )
}

export default Patients