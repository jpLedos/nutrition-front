import React from 'react'
import {Link } from 'react-router-dom'
import {Card,  ListGroup, ListGroupItem}  from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { ArrayAvgNote } from '../services/Functions'


import edition from '../images/icons/edition.png'
import bin from '../images/icons/bin.png'

const RecipeCard = ( {recipe} ) => {


  return (

  
    <Card>
        <Card.Header style={{ width: '100%'}}>
            <Card.Title>{recipe.title}</Card.Title> 
            <Rating  readonly allowHalfIcon ratingValue= { ArrayAvgNote(recipe.comments) } size="20" fillColor="#0D6EFD" />
        </Card.Header>
        <ListGroup style={{ width: '100%'}} className="list-group-flush">
            <ListGroupItem style={{ width: '100%'}}>
                {recipe.categories.map(categorie=> {
                    return (
                    <div key={categorie.id}>
                        <span className="user-infos category" >{categorie.title}</span>
                    </div>
                    )
                })}
            </ListGroupItem>
            <ListGroupItem>
                {recipe.allergens.map(allergen=> {
                    return (
                    <div key={allergen.id}>    
                        <span  className="user-infos allergen" >{allergen.title}</span>
                    </div>
                    )
                })}
            </ListGroupItem>
        </ListGroup>
        <Card.Body>
            <Card.Text>
                {recipe.description.slice(0,80)}
                {recipe.description.lenght}
           </Card.Text>
        </Card.Body>

        <Link to={`/recipe/${recipe.id}`} >Voir la recette</Link>
      
     
    </Card>

  )                 
}

export default RecipeCard