import React,  { useEffect, useState, useContext, Fragment  }from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap';
import Title from '../components/Title'
import { getAllPatients, deleteOnePatient } from '../services/ApiUsers'
import Auth from '../contexts/Auth'
import edition from '../images/icons/edition.png'
import bin from '../images/icons/bin.png'

const Patients = () => {

    const [loading, setLoading] = useState(true);
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState('');
    const {isAuthenticated} =  useContext(Auth);
    
    const navigate = useNavigate();
   
    useEffect(() => {
        getMyPatients();
    }, []);
    
    
    const getMyPatients = async()=> {
        try{      
            const myPatients = await getAllPatients();
            setPatients(myPatients)
            setLoading(false)
        }catch({ response }) {
            console.log(response.data.status)
            if(response.status===401){
                navigate('/');
            }
            setLoading(false);
        }
  
    };
    
    const deletePatient = async ($id) => {
        setLoading(true)
        const delPatient = await deleteOnePatient($id);
        getMyPatients()
        setLoading(false)
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const clickDelete = (e) => 
    {
        if( window.confirm('Etes vous sur de vouloir effectuer la suppression ?')) {
            deletePatient(e.target.name)
        }
    } ;

  return (
    <Fragment>
        <Title>Mes Patients</Title>
        <section className="d-md-flex p-0 m-0" >   
            <div className="bg-light my-4 p-4 "> 

                <input className = "mb-3" onChange={(e)=>handleSearchChange(e)} value={search} placeholder="Recherche" id="search" type="text" />
                {!loading  ?
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