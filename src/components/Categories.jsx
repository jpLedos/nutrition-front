import React from 'react'

const Categories = ( {recipe} ) => {

    return (
    <div className="m-4 d-flex flex-wrap ">
        {recipe.categories.map(categorie => {
            return (
            <span className="user-infos category" key={categorie.id}>
            <span >{categorie.title}</span>
            </span>
            )
        })}
    </div>
  ) 
                  
}

export default Categories;