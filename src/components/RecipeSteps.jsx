import React from 'react'

const RecipeSteps = ( {recipe} ) => {

    const steps = recipe.steps.split('\n')
    .filter( (step=>step!=="")) 

  return (
    <div>
        <h3>La préparation</h3>
        <div>
            <span className="user-infos allergen">{recipe.preparationTime}</span>
            <span className="user-infos allergen" >{recipe.timeout}</span>
            <span className="user-infos allergen" >{recipe.cookingTime} </span>
        </div> 
        <ol>
            {steps.map((step,index) =>{
                return (
                    <li key={index}>{step}</li>
                )
            })}
        </ol>
    </div>
  ) 
                  
}

export default RecipeSteps