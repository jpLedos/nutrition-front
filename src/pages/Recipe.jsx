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

import { Rating } from 'react-simple-star-rating'

import { getOneRecipe, setOneRecipe, setNewRecipe} from '../services/ApiRecipes'

const Recipe = ({recipe}) => {
    const navigate = useNavigate(); 

    const { recipeId } = useParams()
    const [myRecipe, setMyRecipe] = useState({});
    const [loading, setLoading] = useState(true);
    const {isAuthenticated} =  useContext(Auth);

    const [rating, setRating] = useState(0) // initial rating value

    useEffect(() => {
        getMyRecipe();
        }, []);
    
    const getMyRecipe = async () => {
        setLoading(true)
        const apiRecipe = await getOneRecipe(recipeId);
        setMyRecipe(apiRecipe)
        setLoading(false)
    };


          // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate)
    // other logic
  }




  return (
    <Fragment>
      <Title>Ma Recette</Title>            
      <div className="d-flex justify-content-center">
        <Link className="btn btn-light mt-3 " to="/recipes-card">Retour à la liste</Link>
        </div>
        <Container fluid  className="d-md-flex p-0 m-0 text-center">   
        {!loading  ? 
            <div className="container-fluid bg-light m-4">
                <h2>{myRecipe.title}</h2>
                <div className="d-md-flex">  
                    <div> {myRecipe.description}</div>      
                    <div>
                        <Categories recipe= { myRecipe } />
                        <Allergens recipe= { myRecipe } />
                        <Rating  readonly allowHalfIcon showTooltip ratingValue={rating} size="20" fillColor="#0D6EFD" />
                 
                    </div>
                    
                </div>

                <div className="d-md-flex"> 
                    <RecipeIngredients recipe= { myRecipe } />  
                    <RecipeSteps recipe= { myRecipe } />                                       
                </div>
            </div>
            :
            loading 
            }

        </Container>
        <div>
            <h2>commentaires</h2>

            <form action="">
            <div className=''>
                <Rating onClick={handleRating} allowHalfIcon transition ratingValue={rating} size="20" fillColor="#0D6EFD" />
            </div>
            <textarea type="text" />
            <button className="btn btn-sm btn-primary " >envoyer</button>
            </form>

        </div>

    </Fragment>
  )
}

export default Recipe