import React from 'react'

const Allergens = ( {recipe} ) => {

  return (
 
    <div className="d-flex flex-wrap justify-content-center ">
        {recipe.allergens.map(allergen=> {
            return (
            <span className="user-infos allergen" key={allergen.id}>
            <span >{allergen.title}</span>
            </span>
            )
        })}
    </div>

  ) 
                  
}

export default Allergens