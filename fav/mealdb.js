const searchBox = document.querySelector('.searchBox');
const searchbtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipeContainer');
const recipeDetailContent = document.querySelector('.recipe-details-content');
const recipeclosebtn = document.querySelector('.recipe-close-btn');

// Function to get recipe
const fetchRecipe = async (query) => {
    try {
        recipeContainer.innerHTML = "<h2>Fetching Recipes..</h2>"

        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

        const response = await data.json();

        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            // Add data-mealid attribute to store the mealId
            recipeDiv.setAttribute('data-mealid', meal.idMeal);

            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3> 
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `;

            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            // Adding event listener to recipe button
            button.addEventListener('click', () => {
                openRecipePopup(meal);
            });

            recipeContainer.appendChild(recipeDiv);
        });

    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error in fetching recipes... </h2>"
    }
}

// Function to fetch ingredients and measurement
const fetchIngredients = (meal) => {
    let ingredientslist = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientslist += `<li>${measure} ${ingredient}</li>`
        } else {
            break;
        }
    }
    return ingredientslist;
}

const openRecipePopup = (meal) => {
    const mealId = meal.idMeal;
    recipeDetailContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3> Ingredients:</h3>
        <ul class="ingredientlist"> ${fetchIngredients(meal)}</ul>
        <div class=" ">
            <h3> Instructions:</h3>
            <p class="recipeinstructions">${meal.strInstructions}</p>
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
