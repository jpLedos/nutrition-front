import React,  { useEffect, useState, useContext, Fragment  }from 'react'
import {Link, useNavigate } from 'react-router-dom'
import {getAllRecipes, deleteOneRecipe, getCurrentUser} from '../services/Api'
import { checkRecipie, textColorBS } from '../services/Functions'
import Auth from '../contexts/Auth'
import { Spinner,CardGroup, Row, Col } from 'react-bootstrap';
import Title from '../components/Title'
import edition from '../images/icons/edition.png'
import bin from '../images/icons/bin.png'
import RecipeCard from '../components/RecipeCard'



const Recipes = () => {

    
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [currentUser,setCurrentUser] = useState('')
    const {isAuthenticated, roles} =  useContext(Auth);

    

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        filterRecipes();
    }, [isAuthenticated]);


    const filterRecipes =  async () => {
        const myRecipes = await getAllRecipes();     
        const myCurrentUser =   await getCurrentUser();
        setRecipes( myRecipes  )
        setCurrentUser ( myCurrentUser)
        
        if(isAuthenticated && !roles.includes('ROLE_ADMIN')){
             const filteredRecipes = myRecipes.filter(recipe => checkRecipie(recipe,myCurrentUser) )        
             setRecipes(filteredRecipes) 
        }
        setLoading(false)
    }
 

  return (
    <Fragment>
        <Title>Mes Recettes</Title>
        {roles.includes('ROLE_ADMIN') &&
        <Link className="nav-link" to="/recipes-list">Aller à la version liste<span className="visually-hidden">(current)</span></Link>
        }
        <section className="d-md-flex p-0 m-0" >   
            <div className="bg-light my-4 p-4 text-center"> 
                <input className = "mb-3 px-5 w-50" onChange={(e)=>handleChangeSearch(e)} value={search} placeholder="Recherche" id="search" type="text" />
                {!loading  ? 
                <div className="card-container" >   
                    {recipes.filter(recipe => recipe.title.includes(search))
                        .map((FilteredRecipe) => {
                            return (
                                <div key= {FilteredRecipe.id}>
                                    <RecipeCard recipe={FilteredRecipe}></RecipeCard>
                                </div>
                            )
                        })
                    }
                    </div>
                :
                <Spinner className="text-center m-5" animation="border" variant="primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                </Spinner>
                }
            </div>
        </section>
        { roles.includes("ROLE_ADMIN") && 
            <div className="d-flex justify-content-center">
                <Link className="btn btn-light m-3 " to="/edit-recipe">Saisir une nouvelle Recette</Link>
            </div>
        }

    </Fragment>
  )
}

export default Recipes