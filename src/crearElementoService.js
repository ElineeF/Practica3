let reviews = [];

let review1 ={
  userName: 'Maria Jose',
  rate:5,
  userReview: 'Me ha encantado'
}

let recipes = [];

  let recipe1 = {
    id: 0,
    rcpName: 'Crema de Zanahorias y Naranja',
    rcpImage: 'https://megustacomersano.com/wp-content/uploads/2022/01/crema-de-calabaza-con-naranja-y-jengibre-1-1000x1000.jpg',
    rcpIngredients: ['600gr de zanahorias peladas', '1 puerro picado', '1 patata pelada y cortada en dados', 'Zumo de 1/2 naranja', '1 naranja lavada y partida en trozos(con piel)', '1 brik pequeño de nata líquida', 'Aceite de oliva', 'Sal y pimienta'],
    rcpDescription: 'En una cazuela sofreír el puerro durante 10 minutos.\nLuego añadir las zanahorias, las patatas y la naranja y sofreír unos minutos más.\nAñadir el zumo de naranja y agua hasta cubrirlo todo y dejar cocer hasta que las zanahorias estén hechas.\nRetirar los trozos de naranja y pasar por la batidora, añadir la nata, la sal y la pimienta.',
    lactose: true,
    nuts: false,
    soya: false,
    seafood: false,
    fish: false,
    celiac: false,
    dietRestrictions: 'Vegetariano',
    reviews:setReview(0,review1,reviews)
    
  },
  recipe2 = {
    id: 1,
    rcpName: 'Pizza Hawaiana',
    rcpImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1981&q=80',
    rcpIngredients: ['1 masa para pizza', 'Tomate frito', '4 rodajas de piña', 'Queso rallado', 'Orégano (opcional)', '4 ó 5 lonchas de jamón York'],
    rcpDescription: 'Cortaremos en trozos el jamón y partiremos en cubos la piña.\nLuego extendemos la masa de pizza de forma que nos quede un grosor uniforme. Hecho esto, untamos el tomate frito y cubrimos con queso rallado.\nRepartimos por encima el jamón y la piña.\nEl que quiera, puede espolvorear un poco de orégano por encima. Introducimos nuestra pizza en el horno y dejamos hornear a 240ºC por unos 12 minutos.',
    lactose: true,
    nuts: false,
    soya: false,
    seafood: false,
    fish: false,
    celiac: true,
    dietRestrictions: "null",
    reviews:{}
  }
  
  let nextId = 1;
  recipes[nextId-1] = recipe1;
  recipes[nextId] = recipe2;



//let nextId = Object.keys(recipes).length;
 nextId = recipes.length + 1;

export function createRecipe(recipeData) {
  // Lógica para validar y guardar la nueva receta
  let newRecipe = {
    id: nextId,
    rcpName: recipeData.rcpName,
    rcpImage: recipeData.rcpImage,
    rcpIngredients: recipeData.rcpIngredients.split('\n').map(line => line.trim()),
    rcpDescription: recipeData.rcpDescription,
    lactose: recipeData.lactose === 'on',
    nuts: recipeData.nuts === 'on',
    soya: recipeData.soya === 'on',
    seafood: recipeData.seafood === 'on',
    fish: recipeData.fish === 'on',
    celiac: recipeData.celiac === 'on',
    dietRestrictions: recipeData.dietRestrictions,
    reviews: {}
  };

  recipes.set(newRecipe.id, newRecipe);
  return newRecipe[newRecipe.Id];
}

export function getRecipeById(recipeId) {
  return recipes[recipeId];
}

export function getRecipeWithReviewsById(recipeId) {
  const recipe = recipes[recipeId];
  const reviews = recipe ? recipe.reviews : [];
  return { recipe, reviews };
}

export function getAllRecipes() {
    return recipes;
}

export function deleteRecipeById(recipeId) {
  let deleted = delete array[recipeId];
  if(!deleted){
    console.log('No se ha podido borrar');
  }
}

export function updateRecipeById(targetRecipeId, newData) {
  recipes[targetRecipeId] = newData;
}


let nextReview = reviews.length + 1;


export function createReview(reviewData){
   const newReview = {
    id: nextReview++,
    userName: reviewData.userName,
    rate: reviewData.rate,
    userReview: reviewData.userReview,
    profilePic: './Img/profilePic.png',
   };

   reviews[newReview.id]= newReview;
   return newReview;
}

export function setReview(reviewId, updatedReview, reviews) {
  reviews[reviewId] = updatedReview;
  return reviews;
}

export function getId(review){
  return review.id;
}


export function getReviewById(reviewId){
    let review = reviews[reviewId];
    if(review){
        console.log('Receta encontrada', review);
    }
    else{ console.log('No existe la receta');}
}

export function getAllReviews(){
    console.log('Todas las reviews a continuacion: ', reviews);
    return reviews;
}

export function deleteReviewById(reviewId){
    let deleted = delete reviews[reviewId];
    if(!deleted){ç
      console.log('Review no borrado');
    }
}
