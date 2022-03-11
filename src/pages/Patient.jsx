import React,  { useEffect, useState, useContext  }from 'react'
import { Fragment } from 'react'
import {Link, useParams } from 'react-router-dom'
import { Container,Row, Col,  Spinner ,Form} from 'react-bootstrap';
import Title from '../components/Title'
import { getOnePatient, setOnePatient, setNewPatient} from '../services/ApiUsers'
import { getAllCategories, getAllAllergens} from '../services/Api'
import Auth from '../contexts/Auth'
import { alreadySelected } from '../services/Functions'
import plusminus from '../images/icons/more-or-less.png'


const Patient = () => {

    const blanckPatient = 
    {
        email:"", 
        userName:"" , 
        password:"",
        categories:[],
        allergens:[]
    }

    const { userId } = useParams()
    const [myPatient, setMyPatient] = useState(blanckPatient);
    const [myPatientB, setMyPatientB] = useState(blanckPatient);
    const [categories, setCategories] = useState([]);
    const [allergens, setAllergens] = useState([]);
    const [updateError,setUpdateError] = useState("");
    const [loading, setLoading] = useState(false);
    const {isAuthenticated} =  useContext(Auth);
    const [edit, setEdit] = useState(false);
    const [creation] = useState(()=>{
        if (typeof userId==='undefined') {
            return true;
        }else {
            return false;
        }
    })
    
    useEffect(() => {
        getAllergensCategories();
        }, []);

    useEffect(() => {
        if(!creation) {
            getMyPatient();
        }else{
            setMyPatient(blanckPatient)
            setMyPatientB(blanckPatient)
        }
        }, []);
             
    const getAllergensCategories = async()=> {
        const apiCategories = await getAllCategories();
        const apiAllergens = await getAllAllergens();
        setCategories(apiCategories);
        setAllergens(apiAllergens);
    }


    const getMyPatient = async () => {
        setLoading(true)
        const apiPatient = await getOnePatient(userId);
        setMyPatient(apiPatient)
        setMyPatientB(apiPatient);
        setEdit(false);
        setLoading(false)
    };

        
    const setApiPatient = async () => {
        if (myPatient.password==="") {
            delete myPatient.password
        }
        setLoading(true);
        const patientUpdated = await setOnePatient(userId, myPatient );
        getMyPatient();
    };

    const newPatient = async () => {
        setLoading(true);
        const newApiPatient = await setNewPatient(myPatient )
        setEdit(false)
        setLoading(false);
    };

      
    const addCategory = (e) => {
        const newCategory = {id : parseInt(e.target.children[0].innerText), title : e.target.innerText}  
        let newCategories  = [...myPatient.categories, newCategory]
        setMyPatient({...myPatient, categories : newCategories } );
        setEdit(true);
    }

    const delCategory = (e) => {
        const newCategories = myPatient.categories.filter(category => e.target.innerHTML !== category.title)
        setMyPatient({...myPatient, categories : newCategories } );
        setEdit(true);
    }

    const addAllergen = (e) => {
        const newAllergen = {id : parseInt(e.target.children[0].innerText), title : e.target.innerText}
        const newAllergens =[...myPatient.allergens, newAllergen];
        setMyPatient({...myPatient, allergens : newAllergens } );
        setEdit(true);
    }

    const delAllergen = (e) => {
        const newAllergens = myPatient.allergens.filter(allergen => e.target.innerHTML !== allergen.title)
        setMyPatient({...myPatient, allergens : newAllergens } );
        setEdit(true);
    }


    const handleChange = ({currentTarget}) => {
        const {name, value } = currentTarget;
        //console.log(currentTarget);
        setMyPatient({...myPatient, [name] : value})
        setEdit(true);
    }

    const cancelUpdate = (e) => {
        e.preventDefault();
        setMyPatient(myPatientB);
        setEdit(false);
        setUpdateError('');
    }

    const handleSave = (e) =>{
        e.preventDefault();
        if (!creation) {
            setApiPatient();
        }else {
            newPatient();
        }
    }

  return (
    <Fragment>
        {!creation ? <Title>Mon Patient</Title>  : <Title>Nouveau patient</Title> } 
        <Container fluid  className="d-md-flex p-0 m-0 text-center">   
            <Row>
                <Col md lg={4} className="bg-light my-4 p-4 "> 
                    {!loading  ?
                        <Form onSubmit={()=>false}>
                            <Form.Group className="mb-3" >
                                <Form.Label for="email" className="">Email</Form.Label>
                                <Form.Control id="email" type="email" onChange={handleChange} name="email" placeholder="Email" value={myPatient.email} />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" >
                                <Form.Label for="userName" className="">Pseudo</Form.Label>
                                <Form.Control id="userName" onChange={handleChange} autoComplete="username" name="userName" placeholder="Nom et prenom" type="text" value={myPatient.userName} />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" >
                            <Form.Label for="password" className="">Mot de passe</Form.Label>
                            <Form.Control id="password" onChange={handleChange} autoComplete="current-password" name="password" placeholder="Nouveau mot de passe" type="password" value={myPatient.password} />
                        </Form.Group>
   
                        <div className="">
                            <div className="m-4 d-flex flex-wrap  ">
                                {myPatient.categories.map(category=> {
                                    return (
                                    <span className="btn btn-sm user-infos category" key={category.id}>
                                        <img className="icon" src={plusminus} alt="edition" />
                                        <span onClick={(e)=>delCategory(e)} >{category.title}</span>
                                    </span>
                                    )
                                })}
                            </div>
                            <div className="m-4 d-flex flex-wrap  ">
                                {(myPatient.allergens.length > 0  &&  myPatient.allergens[0]!=='init')&&
                                myPatient.allergens.map(allergen=> {
                                    return (
                                        <span className="btn btn-sm user-infos allergen" key={allergen.id}>
                                            <img className="icon" src={plusminus} alt="edition" />
                                            <span onClick={(e)=>delAllergen(e)}>{allergen.title}</span>
                                        </span>
                                    )
                                })}
                            </div>
                            {
                            edit &&    
                            <div className="d-flex form-button">
                                <button onClick={(e)=>cancelUpdate(e)} className="btn btn-danger btn-sm m-4">Annuler</button>
                                <button onClick={(e)=>handleSave(e)} className="btn btn-primary btn-sm m-4">Enregistrer</button>
                                <span className="text-danger">{updateError}</span>
                            </div> 
                            }

                        </div>
                        </Form>
                    :
                        <Spinner className="text-center m-5" animation="border" variant="primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
                </Col>
                <Col md lg className="bg-light m-4 p-4 ">
                    <h3>Liste des categories</h3>
                    <div className="m-4 d-flex flex-wrap">
                        {
                            categories.filter(categorie => (alreadySelected(myPatient.categories, categorie)))
                            .map(filteredCategory=> {
                                return (
                                    <span 
                                        onClick={addCategory}  
                                        className="btn btn-sm user-infos category" 
                                        key={filteredCategory.id}>
                                            <span style={{display:"none"}}>{filteredCategory.id}</span>
                                            {filteredCategory.title}
                                    </span>
                                )
                            })
                        }
                    </div>
    
                    <h3>Liste des Allergenes</h3>
                    <div className="m-4 d-flex flex-wrap  ">
                        {
                            allergens.filter(allergen => (alreadySelected(myPatient.allergens, allergen)))
                            .map(filteredAllergen=> {
                                return (
                                    <span   onClick={addAllergen}  
                                            className="btn btn-sm user-infos allergen" 
                                            key={filteredAllergen.id}>
                                                <span style={{display:"none"}}>{filteredAllergen.id}</span>
                                                {filteredAllergen.title}
                                    </span>
                                )
                            })
                        }
                    </div>
                </Col>
            </Row>
        </Container>

            <div className="d-flex justify-content-center">
                <Link className="btn btn-light m-3 " to="/patients">Retour à la liste</Link>
            </div>
    </Fragment>
  )
}

export default Patient