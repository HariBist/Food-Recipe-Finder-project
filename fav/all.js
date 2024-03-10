document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.querySelector('.searchBox');
    const searchbtn = document.querySelector('.searchbtn');
    const recipeContainer = document.querySelector('.recipeContainer');
    const recipeDetailContent = document.querySelector('.recipe-details-content');
    const recipeclosebtn = document.querySelector('.recipe-close-btn');

    // Function to fetch ingredients and measurement
    const fetchIngredients = (recipe) => {
        if (recipe.ingredientLines) {
            return recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('');
        } else {
            return "";
        }
    };

    // Function to display recipe details
    const openRecipePopup = (recipe) => {
        const recipeName = recipe.strMeal;
        const recipeImage = recipe.strMealThumb;
        const recipeInstructions = recipe.strInstructions;

        recipeDetailContent.innerHTML = `
            <h2 class="recipeName">${recipeName}</h2>
            <h3> Ingredients:</h3>
            <ul class="ingredientlist">${fetchIngredients(recipe)}</ul>
            <div class=" ">
                <h3> Instructions:</h3>
                <p class="recipeinstructions">${recipeInstructions}</p>
            </div>
        `;

        recipeDetailContent.parentElement.style.display = "block";
    };

    // Function to create a recipe div
const createRecipeDiv = (meal) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');

    const imageUrl = meal.strMealThumb;
    const recipeName = meal.strMeal;
    const mealCategory = meal.strCategory || meal.strDrink; // Adjusted for cocktails
    const mealType = meal.strArea || meal.strAlcoholic; // Adjusted for cocktails

    recipeDiv.innerHTML = `
        <button class="add_fav"> <i class="fa fa-heart-o" aria-hidden="true"></i></button>
        <img src="${imageUrl}">
        <h3>${recipeName}</h3>
        ${mealType ? `<p>Meal Type: <span>${mealType}</span></p>` : ''}
        ${mealCategory ? `<p>Category: <span>${mealCategory}</span></p>` : ''}
    `;

    recipeDiv.addEventListener('click', () => {
        openRecipePopup(meal);
    });

    return recipeDiv;
};


    // Function to fetch recipes from TheMealDB API
    const fetchMealDBRecipes = async (query) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();

            return data.meals || [];
        } catch (error) {
            console.error('Error in fetching recipes:', error);
            return [];
        }
    };

    // Event listener for search button
    searchbtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const searchInput = searchBox.value.trim();

        try {
            recipeContainer.innerHTML = "<h2>Fetching Recipes..</h2>";

            // Fetch recipes from TheMealDB API
            const mealResponse = await fetchMealDBRecipes(searchInput);

            recipeContainer.innerHTML = "";

            // Display recipes from TheMealDB API
            if (mealResponse) {
                mealResponse.forEach(meal => {
                    const recipeDiv = createRecipeDiv(meal);
                    recipeContainer.appendChild(recipeDiv);
                });
            }

            // Check if no recipes are found
            if (!mealResponse.length) {
                recipeContainer.innerHTML = "<h2>No recipes found...</h2>";
            }
        } catch (error) {
            console.error("Error in fetching recipe:", error);
            recipeContainer.innerHTML = `<h2>Error in fetching recipe...</h2>`;
        }
    });

    // Event listener for close button in recipe popup
    recipeclosebtn.addEventListener('click', () => {
        recipeDetailContent.parentElement.style.display = "none";
    });

    // Event listener to make the favorite button functional
    let favMealList = JSON.parse(localStorage.getItem('favMealList')) || [];
    const mealCards = document.querySelector('.recipeContainer'); // Assuming this is your card container

    // Add a check to ensure mealCards is not null before attaching the event listener
    if (mealCards) {
        mealCards.addEventListener('click', (event) => {
            if (event.target.matches('.add_fav') || event.target.matches('.fa-heart-o')) {
                const card = event.target.closest('.recipe');
                const favMealId = card.getAttribute('data-id'); // Assuming you have a unique ID for each meal
                const favButton = card.querySelector('.add_fav');

                if (favMealList.includes(favMealId)) {
                    favMealList = favMealList.filter(id => id !== favMealId);
                    favButton.innerHTML = '<i class="fa fa-heart-o" aria-hidden="true"></i>';
                } else {
                    favMealList.push(favMealId);
                    favButton.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i>';
                }

                // Store the updated favMealList in localStorage
                localStorage.setItem('favMealList', JSON.stringify(favMealList));
            }
        });
    }
});
