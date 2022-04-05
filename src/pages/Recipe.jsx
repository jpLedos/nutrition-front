import React,  { useEffect, useState, useContext  }from 'react'
import { Fragment } from 'react'
import {Link, useParams, useNavigate } from 'react-router-dom'
import { Container} from 'react-bootstrap';
import Title from '../components/Title'
import Auth from '../contexts/Auth'
import RecipeSteps from '../components/RecipeSteps'
import RecipeIngredients from '../components/RecipeIngredients'
import Allergens from '../components/Allergens'
import Categories from '../components/Categories'
import Comments from '../components/Comments'
import CommentForm from '../components/CommentForm'
import { ArrayAvgNote } from '../services/Functions'
import { Rating } from 'react-simple-star-rating'
import { getCurrentUser } from '../services/Api'
import { getOneRecipe } from '../services/ApiRecipes'

const Recipe = () => {
    
    const {isAuthenticated, roles} =  useContext(Auth);
    const { recipeId } = useParams()
    const [myRecipe, setMyRecipe] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentUser,setCurrentUser] = useState('')

    useEffect(() => {
        getMyRecipe();
        }, []);
    
    const getMyRecipe = async () => {
        setLoading(true)
        const apiRecipe = await getOneRecipe(recipeId);
        setMyRecipe(apiRecipe)
        if(isAuthenticated) {
            const myCurrentUser =   await getCurrentUser();
            setCurrentUser ( myCurrentUser);
        }
        setLoading(false)
        //console.log(apiRecipe);
    };


  return (
    <Fragment>
      <Title>Ma Recette</Title>            
      <div className="d-flex justify-content-center">
        <Link className="btn btn-light mt-3 me-4 " to="/recipes-card">Retour à la liste</Link>
        </div>
        {!loading  ? 
        <Fragment>
        <Container fluid  className="d-flex p-0 m-0 text-center">   
            <div className="container-fluid bg-light m-4">
            <h2>{myRecipe.title}</h2>
                <div className="d-md-flex justify-content-center align-items-start">  
                    <div className="align-self-start mx-4"> {myRecipe.description}
                    </div>      
                    <div className="align-self-start mx-4 my-2">
                        <Rating  readonly allowHalfIcon ratingValue= { ArrayAvgNote(myRecipe.comments) } size="20" fillColor="#0D6EFD" />                             
                        <div className="text-center">
                        <Categories recipe= { myRecipe } />
                        <Allergens recipe= { myRecipe } />
                        </div>
                  </div>
                </div>
                <hr />

                <div className="d-md-flex align-items-start"> 
                    <div className="align-self-start my-4 ingredients-container"> 
                    <RecipeIngredients  recipe= { myRecipe } /> 
                </div> 
                <div className="align-self-start my-4"> 
                    <RecipeSteps className="my-4" recipe= { myRecipe } /> 
                </div>                                      
                </div>
            </div>
        </Container>

            <Container> 
            <CommentForm recipe= { myRecipe} getMyRecipe = { getMyRecipe } setMyRecipe = { setMyRecipe }/>
            <Comments recipe= { myRecipe } currentUser={currentUser} getMyRecipe = { getMyRecipe }/>  
            </Container>
        </Fragment>

        :
        loading 
        }
        

    </Fragment>
  )
}

export default Recipe