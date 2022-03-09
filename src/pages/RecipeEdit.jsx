import React,  { useEffect, useState, useContext  }from 'react'
import { Fragment } from 'react'
import {Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Container,Row, Col,  Spinner } from 'react-bootstrap';
import Title from '../components/Title'
import { getItem } from '../services/LocalStorage'
import Auth from '../contexts/Auth'
import plusminus from '../images/icons/more-or-less.png'


const Recipe = () => {

    const { recipeId } = useParams()
    const [myRecipe, setmyRecipe] = useState(blanckRecipe());
    const [myRecipeB, setmyRecipeB] = useState(blanckRecipe());
    const [categories, getCategories] = useState([]);
    const [allergens, getAllergens] = useState([]);
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
    const [loading, setLoading] = useState(false);
    
    const url='https://127.0.0.1:8000/api/';
    const myConfig = {
        headers: {
           Authorization: "Bearer " + getItem('nut-token'),
           accept : "application/json",
           'Content-Type' : 'application/merge-patch+json'
        }
     }
     const myPostConfig = {
        headers: {
           Authorization: "Bearer " + getItem('nut-token'),
           accept : "application/json",
           'Content-Type' : 'application/ld+json'
        }
     }

    const redirectToLogin=()=> {
    const url = "/login";
    console.log('to '+ url)
    const navigate = useNavigate ;
    navigate(url)
    }

    useEffect(() => {
        getAllCategories();
        getAllAllergens();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

    useEffect(() => {
        if(!creation) {
            getOneRecipe();
            console.log('on passe par get')
        }else {
            setmyRecipe(blanckRecipe());
        }
        console.log("mounted");
        console.log(myRecipe);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [creation]);



    const alreadySelected = (array, search ) => {
        let selected = true;
        for (let i = 0; i < array.length; i++) {
            if (array[i].title === search.title) {
                return false;
            }
        }
        return selected;
    }

    function blanckRecipe() {
        const blanckRecipe = 
            {title:"", 
            description:"" , 
            categories:[],
            allergens:[]
        }
        
        return blanckRecipe;
    }

    async function getOneRecipe() {
        if(!isAuthenticated) {
            console.log('pas auth');
            redirectToLogin();
        }
        setLoading(true);
        await axios.get(`${url}recipes/${recipeId}`, myConfig)
        .then(response =>response.data)
        .then(data => {
            const pass = {password : ""};
            const recipe = {...data,...pass};
            setmyRecipe(recipe);
            setmyRecipeB(recipe);
            setEdit(false);
            setLoading(false);
            //console.log(myRecipe);
        }) 
        .catch(err => {
            console.log(err.status) ;
        })
    };

    async function setOneRecipe() {
        setLoading(true);
        axios.patch(`${url}recipes/${recipeId}`, myRecipe, myConfig)
        .then(response =>response.data)
        .then(data => {
            setEdit(false)
            setLoading(false);
        }) 
        .catch(err => {
            console.log(err.response) 
            if((err.response !== 'undefined')) {
                setUpdateError (err.response.data.message);
                console.log("err : " +  err.response.data.code);
                if(err.response.data.code == "401"){
                    console.log("redirection") ;
                    redirectToLogin();
                }

            }
        })
    };

    async function setNewRecipe() {
        if(!isAuthenticated) {
            redirectToLogin();
        }
        setLoading(true);
        axios.post(`${url}recipes`, myRecipe, myPostConfig)
        .then(response =>response.data)
        .then(data => {
            setEdit(false)
            setLoading(false);
        }) 
        .catch(err => {
            console.log(err.response) 
            if((err.response !== 'undefined')) {
                setUpdateError (err.response.data.message)
                console.log("err : " +  err.response.data.code);
            }
        })
    };

    async function getAllCategories() {
        await axios.get(`${url}categories`, myConfig)
        .then(response =>response.data)
        .then(data => {
            getCategories(data)
        }) 
        .catch(err => {
            console.log(err) 
        })
    };

    async function getAllAllergens() {
        await axios.get(`${url}allergens`, myConfig)
        .then(response =>response.data)
        .then(data => {
            getAllergens(data)
        }) 
        .catch(err => {
            console.log(err) 
        })
    };
    
    const addCategory = (e) => {
        const newCategory = {id : parseInt(e.target.children[0].innerText), title : e.target.innerText}  
        let newCategories  = [...myRecipe.categories, newCategory]
        setmyRecipe({...myRecipe, categories : newCategories } );
        setEdit(true);
    }

    const delCategory = (e) => {
        const newCategories = myRecipe.categories.filter(category => e.target.innerHTML !== category.title)
        setmyRecipe({...myRecipe, categories : newCategories } );
        setEdit(true);
    }

    const addAllergen = (e) => {
        const newAllergen = {id : parseInt(e.target.children[0].innerText), title : e.target.innerText}
        const newAllergens =[...myRecipe.allergens, newAllergen];
        setmyRecipe({...myRecipe, allergens : newAllergens } );
        setEdit(true);
    }

    const delAllergen = (e) => {
        const newAllergens = myRecipe.allergens.filter(allergen => e.target.innerHTML !== allergen.title)
        setmyRecipe({...myRecipe, allergens : newAllergens } );
        setEdit(true);
    }


    const handleChange = ({currentTarget}) => {
        const {name, value } = currentTarget;
        //console.log(currentTarget);
        setmyRecipe({...myRecipe, [name] : value})
        setEdit(true);
    }

    const cancelUpdate = (e) => {
        e.preventDefault();
        setmyRecipe(myRecipeB);
        setEdit(false);
        setUpdateError('');
    }

    const handleSave = (e) =>{
        e.preventDefault();
        if (!creation) {
            setOneRecipe();
        }else {
            setNewRecipe();
        }
    }

  return (
    <Fragment>
        {!creation ? <Title>Ma Recette</Title>  : <Title>Nouvelle Recettte</Title> } 
        <Container fluid  className="d-md-flex p-0 m-0 text-center">   
            <Row>
                <Col md lg={8} className="bg-light my-4 p-4 "> 
                    {!loading  ? 
                        <form onSubmit={()=>false}>
                        <input onChange={handleChange} name="recipe" placeholder="Recette" type="text" value={myRecipe.title} />
                        <textarea onChange={handleChange} rows="5"  autoComplete="description" name="description" placeholder="Description" type="text" value={myRecipe.description} />
                        <input onChange={handleChange} rows="5"  autoComplete="preparationTime" name="preparationTime" placeholder="Temps" type="text" value={myRecipe.preparationTime} />
                        <input onChange={handleChange} rows="5"  autoComplete="timeout" name="timeout" placeholder="Temps de repos" type="text" value={myRecipe.timeout} />
                        <input onChange={handleChange} rows="5"  autoComplete="cookingTime" name="timout" placeholder="Temps de cuisson" type="text" value={myRecipe.cookingTime} />
                        
                        <textarea onChange={handleChange} rows="5"  autoComplete="ingredients" name="ingredients" placeholder="ingredients" type="text" value={myRecipe.ingredients} />
                        <textarea onChange={handleChange} rows="5"  autoComplete="steps" name="steps" placeholder="steps" type="text" value={myRecipe.steps} />
                        

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
                        </form>
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
                <Link className="btn btn-light m-3 " to="/recipes">Retour à la liste</Link>
            </div>
    </Fragment>
  )
}

export default Recipe