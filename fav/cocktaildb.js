const searchBox = document.querySelector('.searchBox');
const searchbtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipeContainer');
const recipeDetailContent = document.querySelector('.recipe-details-content');
const recipeclosebtn = document.querySelector('.recipe-close-btn');

// Function to get recipe
const fetchRecipe = async (query) => {
    try {
        recipeContainer.innerHTML = "<h2>Fetching Recipes..</h2>"

        const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);

        const response = await data.json();

        recipeContainer.innerHTML = "";
        response.drinks.forEach(drink => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            // Add data-drinkid attribute to store the idDrink
            recipeDiv.setAttribute('data-drinkid', drink.idDrink);

            recipeDiv.innerHTML = `
            <img src="${drink.strDrinkThumb}">
            <h3>${drink.strDrink}</h3> 
            <p><span>${drink.strAlcoholic}</span> Drink</p>
            <p>Belongs to <span>${drink.strCategory}</span> Category</p>
            `;

            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            // Adding event listener to recipe button
            button.addEventListener('click', () => {
                openRecipePopup(drink);
            });

            recipeContainer.appendChild(recipeDiv);
        });

    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error in fetching recipes... </h2>"
    }
}

// Function to fetch ingredients and measurement
const fetchIngredients = (drink) => {
    let ingredientslist = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = drink[`strIngredient${i}`];
        if (ingredient) {
            const measure = drink[`strMeasure${i}`];
            ingredientslist += `<li>${measure} ${ingredient}</li>`
        } else {
            break;
        }
    }
    return ingredientslist;
}

const openRecipePopup = (drink) => {
    const drinkId = drink.idDrink;
    recipeDetailContent.innerHTML = `
        <h2 class="recipeName">${drink.strDrink}</h2>
        <h3> Ingredients:</h3>
        <ul class="ingredientlist"> ${fetchIngredients(drink)}</ul>
        <div class=" ">
            <h3> Instructions:</h3>
            <p class="recipeinstructions">${drink.strInstructions}</p>
        </div>
    `;

    recipeDetailContent.parentElement.style.display = "block";
}

recipeclosebtn.addEventListener('click', () => {
    recipeDetailContent.parentElement.style.display = "none";
});

searchbtn.addEventListener('click', (e) => {
    e.preventDefault();

    const searchInput = searchBox.value.trim();

    fetchRecipe(searchInput);
});
