const NUM_RESULTS = 3;

let loadMoreRequests = 0;

async function loadMore(){
    const from = (loadMoreRequests+1) * NUM_RESULTS;
    const to = from + NUM_RESULTS;

    const response = await fetch(`/recipes?from=${from}&to=${to}`);

    const newRecipes = await response.text();
  
    const recipesListDiv = document.getElementById("recipesList");

    recipesListDiv.innerHTML += newRecipes;

    loadMoreRequests++;
    
}

