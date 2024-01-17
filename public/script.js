const NUM_RESULTS = 3;

let loadMoreRequests = 0;

async function loadMore() {
  const from = (loadMoreRequests + 1) * NUM_RESULTS;
  const to = from + NUM_RESULTS;

  const response = await fetch(`/recipes?from=${from}&to=${to}`);

  const newRecipes = await response.text();
  console.log(newRecipes);

  const recipesListDiv = document.getElementById("recipesList");

  recipesListDiv.innerHTML += newRecipes;

  console.log(loadMore);

  loadMoreRequests++;
}

// Función para validar y enviar el formulario
function validateAndSubmitForm() {
  var url = document.querySelector("input[name='rcpImage']").value;
  var name = document.querySelector("input[name='rcpName']").value;
  var description = document.querySelector(
    "textarea[name='rcpDescription']"
  ).value;
  var ingredients = document.querySelector(
    "textarea[name='rcpIngredients']"
  ).value;

  var valid = true;

  if (url.length === 0) {
    alert("Por favor, inserta una URL para la imagen.");
    valid = false;
  }
  if (!name.match(/^[A-Z]/)) {
    alert("El nombre de la receta debe comenzar con una letra mayúscula.");
    valid = false;
  }
  if (description.length === 0) {
    alert("Por favor, añade una descripción.");
    valid = false;
  }
  if (ingredients.split("\n").length < 2) {
    alert(
      "Por favor, introduce al menos dos ingredientes, separados por una línea nueva."
    );
    valid = false;
  }

  if (valid) {
    var form = document.querySelector("form[name='myForm']");
    var formData = new FormData(form);

    fetch("/crearElemento", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        alert("Receta enviada con éxito.");
      })
      .catch((error) => {
        alert("Hubo un error al enviar la receta: " + error.message);
      });
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelectorAll(".star-checkbox").forEach((checkbox) => {
        console.log(checkbox);
      checkbox.addEventListener("change", handleStarClick);
    });
    const form = document.querySelector("form[name='myForm']");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita el envío normal del formulario
    validateAndSubmitForm();
  });
  
});



function handleStarClick(event) {
  const checkbox = event.target;
  const recipeId = checkbox.getAttribute("data-recipe-id");
  const isFavorite = checkbox.checked;

  console.log(isFavorite);
  fetch("/updateFavorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: recipeId, isFavorite: isFavorite }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

    fetch("/cogerFavoritos").then((response) => response.json()).then((data) => {
        updateFavoriteList(data.favorites)
    }).catch((error) => {
        console.error("Error:", error);
    });
}

function updateFavoriteList(favorites) {
  document.getElementById(
    "favoritesContainer"
  ).innerHTML = `<div id="favoritesContainer" class="hidden">
    <h2 id="FavTitle">LISTA DE RECETAS FAVORITAS</h2>
    ${favorites.lenght != 0?favorites.map(e => {
        if (e == null) return ""
        return `<div class="favorite">
    <div class="imgFavorites"><a href="/detalle/${e.id}"><img src="${e.rcpImage}" alt="${e.rcpName}" /></a></div> 
    <div class="textoFavoritos">${e.rcpName}</div>
  </div>`}).join(""):"Aún no tiene favoritos"}
  
</div>`;
}
