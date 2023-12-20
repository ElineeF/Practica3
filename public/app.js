async function loadAJAX(){

    const response = await fetch('/recipes');

    const recipes = await response.text();
  
    const content = document.getElementById("recipesContainer");

    content.innerHTML = recipes;

}