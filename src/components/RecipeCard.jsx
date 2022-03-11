import React from 'react'
import {Link } from 'react-router-dom'
import {Card,  ListGroup, ListGroupItem}  from 'react-bootstrap'

import edition from '../images/icons/edition.png'
import bin from '../images/icons/bin.png'

const RecipeCard = ( {recipe} ) => {

  return (

    <Card>
        <Card.Header style={{ width: '100%'}}>
            <Card.Title>{recipe.title}</Card.Title> 
        </Card.Header>
        <ListGroup style={{ width: '100%'}} className="list-group-flush">
            <ListGroupItem style={{ width: '100%'}}>
                {recipe.categories.map(categorie=> {
                    return (
                    <span key={categorie.id} className="user-infos category" >{categorie.title}</span>
                    )
                })}
            </ListGroupItem>
            <ListGroupItem>
                {recipe.allergens.map(allergen=> {
                    return (
                    <span key={allergen.id} className="user-infos allergen" >{allergen.title}</span>
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

        <Card.Link href={`/recipe/${recipe.id}`} >Voir la recette</Card.Link>
      
     
    </Card>
 



     



  ) 
                  
}

export default RecipeCard