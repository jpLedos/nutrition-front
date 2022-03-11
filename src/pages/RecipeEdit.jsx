import React,  { useEffect, useState, useContext  }from 'react'
import { Fragment } from 'react'
import {Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Container,Row, Col,  Spinner, Form , FormCheck } from 'react-bootstrap';
import Title from '../components/Title'
import { getItem } from '../services/LocalStorage'
import Auth from '../contexts/Auth'
import plusminus from '../images/icons/more-or-less.png'

import { getOneRecipe, setOneRecipe, setNewRecipe} from '../services/ApiRecipes'
import { getAllCategories, getAllAllergens} from '../services/Api'
import {alreadySelected} from '../services/Functions'


const Recipe = () => {

    const blanckRecipe = 
    {
        title:"", 
        description:"" , 
        categories:[],
        allergens:[]
    }
    const navigate = useNavigate(); 

    const { recipeId } = useParams()
    const [myRecipe, setMyRecipe] = useState(blanckRecipe);
    const [myRecipeB, setMyRecipeB] = useState(blanckRecipe);
    const [categories, setCategories] = useState([]);
    const [allergens, setAllergens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const {isAuthenticated} =  useContext(Auth);
    const [updateError,setUpdateError] = useState("");
    const [creation] = useState(()=>{
        if (typeof recipeId==='undefined') {
            return true;
        }else {
            return false;
        }
    })
    const [apiMessage, setApiMessage] = useState("");
    const [apiClass, setApiClass] = useState("");


     useEffect(() => {
        getAllergensCategories();
        }, []);

    useEffect(() => {
        if(!creation) {
            getMyRecipe();
        }
        }, [creation]);


    const getAllergensCategories = async()=> {
        const apiCategories = await getAllCategories();
        const apiAllergens = await getAllAllergens();
        setCategories(apiCategories);
        setAllergens(apiAllergens);
    }    

        
    const getMyRecipe = async () => {
        setLoading(true)
        const apiRecipe = await getOneRecipe(recipeId);
        setMyRecipe(apiRecipe)
        setMyRecipeB(apiRecipe);
        setEdit(false);
        setLoading(false)
    };

    const setApiRecipe = async () => {
        if (myRecipe.password==="") {
            delete myRecipe.password
        }
        try{
            setLoading(true);
            const response = await setOneRecipe(recipeId, myRecipe )
            const apiRecipe = await getOneRecipe(recipeId);
            setMyRecipe(apiRecipe)
            setEdit(false)
            setApiClass('text-success')
            setApiMessage('Mise à jour effectuée')
            setLoading(false);
        }catch ({ response }) {
            console.log(response.data.status)
            if(response.status===401){
                navigate('/');
            }
            setEdit(false)
            setApiClass('text-danger')
            setApiMessage('Erreur de mise à jour')
            setLoading(false);
        }
    };


    const newRecipe = async () => {
        try {
            setLoading(true);
            const newApiRecipe = await setNewRecipe(myRecipe )
            setEdit(false)
            setApiClass('text-success')
            setApiMessage('Recette ajoutée')
            setLoading(false);
        }catch ({response}){
            console.log(response.status)
            if(response.status===401){
                navigate('/');
            }
            setEdit(false)
            setApiClass('text-danger')
            setApiMessage('Erreur de creation')
            setLoading(false);
        }

    };

   
    const addCategory = (e) => {
        const newCategory = {id : parseInt(e.target.children[0].innerText), title : e.target.innerText}  
        let newCategories  = [...myRecipe.categories, newCategory]
        setMyRecipe({...myRecipe, categories : newCategories } );
        setEdit(true);
    }

    const delCategory = (e) => {
        const newCategories = myRecipe.categories.filter(category => e.target.innerHTML !== category.title)
        setMyRecipe({...myRecipe, categories : newCategories } );
        setEdit(true);
    }

    const addAllergen = (e) => {
        const newAllergen = {id : parseInt(e.target.children[0].innerText), title : e.target.innerText}
        const newAllergens =[...myRecipe.allergens, newAllergen];
        setMyRecipe({...myRecipe, allergens : newAllergens } );
        setEdit(true);
    }

    const delAllergen = (e) => {
        const newAllergens = myRecipe.allergens.filter(allergen => e.target.innerHTML !== allergen.title)
        setMyRecipe({...myRecipe, allergens : newAllergens } );
        setEdit(true);
    }


    const handleChange = ({currentTarget}) => {
        const {name, value } = currentTarget;
        setMyRecipe({...myRecipe, [name] : value.toString()})
        setEdit(true);
        setApiMessage('')
    }

    const handleChangeCheckbox = ({currentTarget}) => {
        const {name, checked } = currentTarget;
        setMyRecipe({...myRecipe, [name] : checked})
        setEdit(true);
        setApiMessage('')
    }

    const cancelUpdate = (e) => {
        e.preventDefault();
        setMyRecipe(myRecipeB);
        setEdit(false);
        setUpdateError('');
    }

    const handleSave = (e) =>{
        e.preventDefault();
        if (!creation) {
            setApiRecipe();
        }else {
            newRecipe();
        }
    }


    const apiResponse = {apiMessage} && <p className={apiClass}>{apiMessage}</p>

  return (
    <Fragment>
        {!creation ? <Title>Ma Recette</Title>  : <Title>Nouvelle Recettte</Title> } 
        <Container fluid  className="d-md-flex p-0 m-0 text-center">   
            <Row>
                <Col md lg={8} className="bg-light my-4  p-2"> 
                {apiResponse}
                    {!loading  ? 
                        <Form onSubmit={()=>false}>
                            <div className="d-flex justify-content-around">
                                <FormCheck type="switch" name="isPublished" label="Publié !" isValid="true"
                                    checked={myRecipe.isPublished} onChange={handleChangeCheckbox}
                                />
                                <FormCheck type="switch" name="isPublic" label="Vue publique !" isValid="true"                                   
                                    checked={myRecipe.isPublic} onChange={handleChangeCheckbox}
                                />
                            </div>
                            <input onChange={handleChange} name="title" placeholder="Recette" type="text" value={myRecipe.title} />
                            <Form.Group className="mb-3" >
                                <Form.Label for="description">Description : </Form.Label>
                                <Form.Control as="textarea" id="description" onChange={handleChange} rows="5"  autoComplete="description" name="description" placeholder="Description" type="text" value={myRecipe.description} />
                            </Form.Group>
                            
                            <Form.Group className="d-flex-wrap">
                                <div className="d-flex justify-content-between" >
                                <Form.Label for="preparationTime" className="mx-2">Preparation</Form.Label>
                                <Form.Label for="timeout" className="mx-2">Repos</Form.Label>
                                <Form.Label for="cookingTime" className="mx-2">Cuisson</Form.Label>
                                </div>
                                
                                <div className="d-flex justify-content-between" >
                                <Form.Control className="mx-2" id="preparationTime" onChange={handleChange}  autoComplete="preparationTime" name="preparationTime" placeholder="Temps" type="text" value={myRecipe.preparationTime} />
                                <Form.Control className="mx-2" id="timeout" onChange={handleChange}  autoComplete="timeout" name="timeout" placeholder="Temps de repos" type="text" value={myRecipe.timeout} />
                                <Form.Control className="mx-2" id="cookingTime" onChange={handleChange}  autoComplete="cookingTime" name="cookingTime" placeholder="Temps de cuisson" type="text" value={myRecipe.cookingTime} />
                                </div>
                            </Form.Group>
                            
                            <Form.Group className="mb-3" >
                            <Form.Label for="ingredients">Ingredients :</Form.Label>
                            <Form.Control as="textarea" id="ingredients" onChange={handleChange} rows="5"  autoComplete="ingredients" name="ingredients" placeholder="ingredients" type="text" value={myRecipe.ingredients} />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" >
                            <Form.Label for="steps">Etapes : </Form.Label>
                            <Form.Control as="textarea" id="steps" onChange={handleChange} rows="10"  autoComplete="steps" name="steps" placeholder="steps" type="text" value={myRecipe.steps} />
                            </Form.Group>

                            <div className="">
                                <div className="m-4 d-flex flex-wrap  ">
                                    {myRecipe.categories.map(category=> {
                                        return (
                                        <span className="btn btn-sm user-infos category" key={category.id}>
                                            <img className="icon" src={plusminus} alt="edition" />
                                            <span onClick={(e)=>delCategory(e)} >{category.title}</span>
                                        </span>
                                        )
                                    })}
                                </div>
                                <div className="m-4 d-flex flex-wrap  ">
                                    {(myRecipe.allergens.length > 0  &&  myRecipe.allergens[0]!=='init')&&
                                    myRecipe.allergens.map(allergen=> {
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
                            categories.filter(categorie => (alreadySelected(myRecipe.categories, categorie)))
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
                            allergens.filter(allergen => (alreadySelected(myRecipe.allergens, allergen)))
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
                <Link className="btn btn-light m-3 " to="/recipes-list">Retour à la liste</Link>
            </div>
    </Fragment>
  )
}

export default Recipe