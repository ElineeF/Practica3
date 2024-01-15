

let reviews = [

  1 ={
    userName: 'Maria Jose',
    rate:5,
    userReview: 'Me ha encantado'
  },

  2 ={
    userName: 'Sabrina Carpenter',
    rate:4,
    userReview: 'Delicioso, lo único es que quita tiempo'
  }

  , 3 ={
    userName: 'Marcos Ferrer',
    rate:5,
    userReview: 'Me divertí preparandola'
  }

  , 4 ={
    userName: 'Elinee Freites',
    rate:5,
    userReview: 'Perfecta'
  }
];

let recipes ={}
let numFav;

let favorites = [];


let nextId = Object.keys(recipes).length;

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
    reviews:[],
    isFavorite: false,
  };
  
  recipes[nextId] = newRecipe;
  nextId = nextId + 1;
  return newRecipe;
}

// function findObjectById(objects, id) {
//   for (let key in objects) {
//       if (objects[key].id === id) {
//           return objects[key];
//       }
//   }
//   return null; // Devuelve null si no se encuentra ningún objeto con ese id
// }

function findObjectById(object, id) {
  for (const key in object) {
    if (object.hasOwnProperty(key) && object[key].id === id) {
      return object[key];
    }
  }
  return null; // Devuelve null si no se encuentra el objeto con el id dado
}

export function getRecipeById(recipeId) {
  return recipes[recipeId];
}
export function getAllRecipes() {
  return Object.values(recipes);
}

export function getRecipes(from, to) {
  let values = Object.values(recipes);
  if (from !== undefined) {
      return values.slice(from, to);
  } else {
      return values;
  }
}


export function deleteRecipeById(recipeId) {
  delete recipes[recipeId];
}

export function updateRecipeById(targetRecipeId, newData) {
  recipes[targetRecipeId] = newData;
}


//REVIEWS 

let nextReview = reviews.length + 1;


export function createReview(reviewData){
   const newReview = {
    id:null,
    userName: reviewData.userName,
    rate: reviewData.rate,
    userReview: reviewData.userReview,
    profilePic: './Img/profilePic.png',
   };
   return newReview; 
}                     

export function addReview(review, reviews){
  if (!reviews){
    reviews = [];
  }
  review.id = reviews.length;
  reviews[review.id] = review;

  return reviews;
}

export function getReviews(recipe){
  return recipe.reviews;
}

export function setReview(reviewId, updatedReview, reviews) {
  reviews[reviewId] = updatedReview;
  return reviews;
}

export function getReviewById(reviewId, review){
  return review[reviewId];
}


//favorites
export function addFavorite(RecipeData){
  numFav = favorites.length;
  let favorite = {
    id: RecipeData.id,
    rcpName: RecipeData.rcpName,
    rcpImage: RecipeData.rcpImage
  };
  RecipeData.favorite = true;
  favorites[numFav] = favorite;
  

}

export function getFavorites(){
  let values = Object.values(favorites);
  if (values !== undefined) {
    return values.slice(0, favorites.length);
} else {
    return values;
}
}

export function deleteFavorite(idRecipe){
  let id = getFavoriteId(idRecipe);
  delete favorites[id];
}

export function getFavoriteId(idRecipe){
   let found = false;
   let indice;
   let recipe = getRecipeById(idRecipe);
    while((i<favorites.length) && (!found)){
     if (favorites[i]===recipe){
      found = true;
      indice = i;
     }
     i++;
   }
   if (found && (recipe !== null)){
    return indice;
   }
}

//Cargar

export function loadSampleData() {
  createRecipe({id: 0,
    rcpName: 'Crema de Zanahorias y Naranja',
    rcpImage: 'https://megustacomersano.com/wp-content/uploads/2022/01/crema-de-calabaza-con-naranja-y-jengibre-1-1000x1000.jpg',
    rcpIngredients: '600gr de zanahorias peladas\n1 puerro picado\n1 patata pelada y cortada en dados\nZumo de 1/2 naranja\n1 naranja lavada y partida en trozos (con piel)\n1 brik pequeño de nata líquida\nAceite de oliva\nSal y pimienta',
    rcpDescription: 'En una cazuela sofreír el puerro durante 10 minutos.\nLuego añadir las zanahorias, las patatas y la naranja y sofreír unos minutos más.\nAñadir el zumo de naranja y agua hasta cubrirlo todo y dejar cocer hasta que las zanahorias estén hechas.\nRetirar los trozos de naranja y pasar por la batidora, añadir la nata, la sal y la pimienta.',
    lactose: true,
    nuts: false,
    soya: false,
    seafood: false,
    fish: false,
    celiac: false,
    dietRestrictions: 'Vegetariano',
    reviews:setReview(0,review1,reviews)}),

   createRecipe({id: 1,
     rcpName: 'Pizza Hawaiana',
     rcpImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1981&q=80',
     rcpIngredients: '1 masa para pizza\nTomate frito\n4 rodajas de piña\nQueso rallado\nOrégano (opcional)\n4 ó 5 lonchas de jamón York',
     rcpDescription: 'Cortaremos en trozos el jamón y partiremos en cubos la piña. \nLuego extendemos la masa de pizza de forma que nos quede un grosor uniforme. Hecho esto, untamos el tomate frito y cubrimos con queso rallado.\nRepartimos por encima el jamón y la piña.\nEl que quiera, puede espolvorear un poco de orégano por encima. Introducimos nuestra pizza en el horno y dejamos hornear a 240ºC por unos 12 minutos.',
     lactose: true,
     nuts: false,
     soya: false,
     seafood: false,
     fish: false,
     celiac: true,
     dietRestrictions: "null",
 }),
 createRecipe({id: 2,
   rcpName: 'Tacos Birria',
   rcpImage: 'https://hips.hearstapps.com/hmg-prod/images/delish-202104-birriatacos-033-1619806490.jpg?crop=1xw:0.8435280189423836xh;center,top&resize=1200:*',
   rcpIngredients: '1 kg de morcillo de ternera IGP Sierra de Guadarrama\n4 tomates medianos maduros\n5 chiles guajillos secos\n3 chiles chipotle\nOrégano mexicano\n2 dientes de ajo\n1/2 cebolla mediana',
   rcpDescription: 'Corta la carne en aprox. 8 trozos y salpimienta. Limpia los chiles quitándoles las semillas y tuéstalos brevemente en una sartén a fuego fuerte. A continuación, pásalos a una taza con agua y déjalos en remojo durante aprox. 15 minutos. Cuando los tengamos ligeramente tostados, los ponemos a remojo en una taza con agua caliente durante 20 minutos. Mientras tanto, aprovecha el calor de la sartén para pochar la cebolla, los tomates y los dientes de ajo. No importa el tamaño, ya que los vamos a triturar después. Tritura la cebolla asada con los tomates, el ajo y los chiles. Vierte el líquido resultante sobre una fuente con la carne. Tapa y deja reposar al menos 4 horas en el frigorífico. Una vez marinada la carne, pasa el contenido a una cazuela, añade 1/2 litro de agua y cocina tapado a medio medio durante 4 horas. Cuando se haya cumplido el tiempo, apaga el fuego y saca la carne para que se enfríe. Desmenuza la carne con la ayuda de un tenedor.',
   lactose: true,
   nuts: false,
   soya: false,
   seafood: false,
   fish: false,
   celiac: false,
   dietRestrictions: "null",
   reviews:setReview(0,review2,reviews),
   reviews:setReview(1,review3,reviews),

 });
 createRecipe({id: 3,
    rcpName: 'Cereales de mini croissants',
    rcpImage: 'https://badun.nestle.es/imgserver/v1/80/1290x742/7321fdc1578f-cereales-de-mini-croissants.jpg',
    rcpIngredients: '1 Masa de Hojaldre rectangular BUITONI\n20 ml de leche entera\n1 huevo Mediano',
    rcpDescription: 'Precalentar el horno a 200ºC.Desenrollar la masa sobre el mismo papel que la envuelve y colocar en forma vertical.Cortar el hojaldre por la mitad con ayuda de un cortapizzas y después, hacer cuatro cortes en horizontal para obtener 8 rectángulos iguales. Subdividir cada rectángulo en 5 columnas verticales y cortar cada columna en dos triángulos. Estirar ligeramente las puntas de la base de un triángulo y enrollar sobre sí mismo para obtener un mini croissant. Repetir el proceso con el resto de triángulos.Batir el huevo junto con la leche en un bol. Sumergir los croissants en la mezcla de huevo hasta cubrirlos por completo. Verter sobre un colador para quitar el exceso.Repartir los mini croissants sobre una bandeja de horno forrada con papel vegetal de forma que queden separados unos de otros.Hornear unos 16-18 minutos.',
    lactose: true,
    nuts: false,
    soya: false,
    seafood: false,
    fish: false,
    celiac: false,
    dietRestrictions: "null",
    reviews:setReview(0,review4,reviews),
 });
 createRecipe({id: 4,
    rcpName: 'Red Velvet',
    rcpImage: 'https://www.gastrolabweb.com/u/fotografias/m/2021/2/11/f608x342-8503_38226_15.jpg',
    rcpIngredients: '300 g de harina\n350 ml de leche entera\n8 g de NESQUIK Intenso 100% cacao puro natural\n3 huevos medianos\n375 g de azúcar\n175 g de mantequilla a temperatura ambiente\n3 cucharaditas de colorante rojo de uso alimentario\n1 cucharadita de extracto de vainilla + unas gotas para el relleno y cobertura\n1 cucharadita de café de sal1 cucharadita de levadura en polvo\n20 ml (1 cucharada) de zumo de limón',
    rcpDescription: 'Precalentar el horno a 180º.Poner una hoja de papel de horno en el fondo de un molde de 24 cm desmoldable y engrasar con mantequilla.En un bol poner la leche, el limón y el colorante. Mezclar y reservar.En otro bol, mezclar la harina, la levadura, la sal y el NESQUIK Intenso 100% y reservar.Batir la mantequilla con el azúcar. Añadir la vainilla y los huevos uno a uno sin parar de batir unos minutos. A esta mezcla, ir añadiendo en tres veces, de manera alterna los ingredientes secos (harina, levadura, sal y cacao) y la mezcla de leche, limón y colorante e ir batiendo hasta que quede una mezcla homogénea.Mezclar el vinagre y el bicarbonato y añadir a la masa. Batir hasta que quede incorporado y verter la mezcla en el molde. Cocer en el horno entre 55/60 min.Sacar del horno el pastel y dejar enfriar encima de una rejilla. Cuando esté frio, cortamos en tres partes. Envolvemos en papel film y los dejamos toda la noche en la nevera.Para el relleno: Mezclar los ingredientes hasta que queden bien integrados.Pintar las tres capas del pastel con el almíbar y rellenar con la mezcla. Cubrir los laterales y parte superior del pastel.Para la cobertura: Fundir el chocolate al microondas y dejar enfriar.Batir el mascarpone, añadirle el chocolate y batir a velocidad alta hasta conseguir una crema homogénea.En una manga pastelera con una boquilla rizada, poner un hilo de colorante rojo con la ayuda de una brocheta de madera. La rellenamos con la cobertura y decoramos.',
    lactose: true,
    nuts: false,
    soya: false,
    seafood: false,
    fish: false,
    celiac: false,
    dietRestrictions: "null",});
 createRecipe({id: 5,
  rcpName: 'Coctel Sandía y albahaca Perrier',
  rcpImage: 'https://badun.nestle.es/imgserver/v1/80/1290x742/coctel-sandia-y-albahaca-perrier.jpg',
  rcpIngredients: '45 ml de PERRIER\n750 g de sandía\n50 ml de zumo de limón\nsal al gusto\npimienta negra al gusto\n3 ramitas de albahaca fresca',
  rcpDescription: 'Añadimos todos los ingredientes menos la albahaca y el agua Perrier en un blender (batidora de vaso). Trituramos bien y servimos en dos vasos grandes con tres piedras de hielo. Añadimos la albahaca (reservar unas hojas), removemos bien y completamos con el agua Perrier. Acabamos con unas hojitas de albahaca que hemos reservado y un poco de pimienta y sal sobre el cóctel.',
  lactose: false,
  nuts: false,
  soya: false,
  seafood: false,
  fish: false,
  celiac: true,
  dietRestrictions: "vegetariano",
});
createRecipe({id: 6,
  rcpName: 'Coctel Sandía y albahaca Perrier',
  rcpImage: 'https://badun.nestle.es/imgserver/v1/80/1290x742/coctel-sandia-y-albahaca-perrier.jpg',
  rcpIngredients: '45 ml de PERRIER\n750 g de sandía\n50 ml de zumo de limón\nsal al gusto\npimienta negra al gusto\n3 ramitas de albahaca fresca',
  rcpDescription: 'Añadimos todos los ingredientes menos la albahaca y el agua Perrier en un blender (batidora de vaso). Trituramos bien y servimos en dos vasos grandes con tres piedras de hielo. Añadimos la albahaca (reservar unas hojas), removemos bien y completamos con el agua Perrier. Acabamos con unas hojitas de albahaca que hemos reservado y un poco de pimienta y sal sobre el cóctel.',
  lactose: false,
  nuts: false,
  soya: false,
  seafood: false,
  fish: false,
  celiac: true,
  dietRestrictions: "vegetariano",
});


}

 export function loadFavorites(){
   addFavorite(getRecipeById(0));
   addFavorite(getRecipeById(1));
   addFavorite(getRecipeById(2));
   addFavorite(getRecipeById(3));
   addFavorite(getRecipeById(5));

 }




loadSampleData();
loadFavorites();

