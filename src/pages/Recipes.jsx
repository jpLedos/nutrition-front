import React,  { useEffect, useState, useContext, Fragment  }from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap';
import {getAllRecipes, deleteOneRecipe, getCurrentUser} from '../services/Api'
import Title from '../components/Title'
import Auth from '../contexts/Auth'
import edition from '../images/icons/edition.png'
import bin from '../images/icons/bin.png'

const Recipes = () => {

    
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [currentUser,setCurrentUser] = useState('')
    const {isAuthenticated, roles} =  useContext(Auth);
    

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const redirectToLogin=()=> {
        const url = "/login";
        let navigate = useNavigate ;
        navigate(url,{ replace: true } )
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
 
      //verifier si une categorie du user est dans les categorie de la recette
      // ou si une recette contient un allegene du current_user
      const checkRecipie =($recipe,$currentUser) => {
        let hasUserCategory = false;
        let hasNotUserAllergen = true;
        const userCategories = $currentUser.categories;
        const userAllergens = $currentUser.allergens;
        const recipeCategories = $recipe.categories; 
        const recipeAllergens = $recipe.allergens; 
       
        recipeCategories.forEach(recipeCategorie => {
            userCategories.forEach(userCategorie => {
                if(recipeCategorie.title===userCategorie.title){
                    hasUserCategory =true
                }
            })
        })

        recipeAllergens.forEach(recipeAllergen => {
            userAllergens.forEach(userAllergen => {
                if(recipeAllergen.title===userAllergen.title){
                    hasNotUserAllergen =false
                }
            })
        })
        console.log("passe par le filtre");
        return (hasUserCategory && hasNotUserAllergen)
    }
    // --------------  fin de  verification ------------------ 


     const clickDelete = (e) => 
    {
        if( window.confirm('Etes vous sur de vouloir effectuer la suppression ?')) {
            deleteOneRecipe(e.target.name)
        }
    } 


  return (
    <Fragment>
        <Title>Mes Recettes</Title>
        
        <section className="d-md-flex p-0 m-0" >   
            <div className="bg-light my-4 p-4 "> 

                <input className = "mb-3" onChange={(e)=>handleChangeSearch(e)} value={search} placeholder="Recherche" id="search" type="text" />
                {!loading  ? 
                <table className="table table-hover" style={{minWidth : '400px', maxWidth : '800px'}}>
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nom</th>
                        <th scope="col">description</th>
                        <th scope="col">Regimes</th>
                        <th scope="col">Allergies</th>
                        <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        
                        {recipes.filter(recipe => recipe.title.includes(search))
                        .map((FilteredRecipe) => {
                            return (
                                <tr className="recipe-row" key={FilteredRecipe.id}>
                                    <th scope="row">{FilteredRecipe.id}</th>
                                    <th>{FilteredRecipe.title}</th>
                                    <td className="">{FilteredRecipe.description.slice(0,180)}
                                    {FilteredRecipe.description.lenght>30 && ' ...'}</td>
                                    <td>
                                        {FilteredRecipe.categories.map(category=> {
                                            return (
                                                <span key={category.id} className="user-infos category" >{category.title}</span>
                                            )
                                        })}
                                    </td>
                                    <td>
                                        {FilteredRecipe.allergens.map(allergen=> {
                                            return (
                                                <span key={allergen.id} className="user-infos allergen"  >{allergen.title}</span>
                                            )
                                        })}
                                    </td>
                                    { roles.includes("ROLE_ADMIN") && 
                                    <td >
                                        <Link className="nav-link" to = {`/edit-recipe/${FilteredRecipe.id}`}  >
                                            <img className="icon" src={edition} alt="edition" />
                                            <span className="visually-hidden">(current)</span>
                                        </Link>
                                        <div onClick={(e)=>clickDelete(e)} className="btn nav-link"  >
                                            
                                            <img className="icon" src={bin} alt="bin" name={FilteredRecipe.id} />
                                            <span className="visually-hidden">(current)</span>
                                        </div>
                                    </td>
                                    }
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
        { roles.includes("ROLE_ADMIN") && 
            <div className="d-flex justify-content-center">
                <Link className="btn btn-light m-3 " to="/recipe">Saisir une nouvelle Recette</Link>
            </div>
        }

    </Fragment>
  )
}

export default Recipes