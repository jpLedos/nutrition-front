
export const alreadySelected = (array, search ) => {
    let selected = true;
    for (let i = 0; i < array.length; i++) {
        if (array[i].title === search.title) {
            return false;
        }
    }
    return selected;
}

//verifier si une categorie du user est dans les categorie de la recette
// ou si une recette contient un allegene du current_user
export const checkRecipie =($recipe,$currentUser) => {
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
return (hasUserCategory && hasNotUserAllergen)
}
// --------------  fin de  verification ------------------ 


// couleur du titre dans la liste des Recettes
export const textColorBS = ($isPublished, $isPublic) => {
    if(!$isPublished) {
        return "text-danger"
    }else{
        if(!$isPublic) {
            return "text-primary"
        }else{
            return "text-success"
        }
    }

}


export const  ArrayAvgNote = (myArray) => {
    var i = 0, summ = 0, ArrayLen = myArray.length;
    while (i < ArrayLen) {
        summ = summ + myArray[i++].note;
}
    return summ * 20  / ArrayLen ;
}
