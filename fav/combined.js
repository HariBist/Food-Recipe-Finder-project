document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.querySelector('.searchBox');
    const searchbtn = document.querySelector('.searchbtn');
    const recipeContainer = document.querySelector('.recipeContainer');
    const recipeDetailContent = document.querySelector('.recipe-details-content');
    const recipeclosebtn = document.querySelector('.recipe-close-btn');

    // Function to get recipe details
    const fetchIngredients = (meal) => {
        let ingredientslist = "";

        // Check if the meal object is from Edamam API
        if (meal.ingredients) {
            // Edamam API structure
            ingredientslist = meal.ingredients.map(ingredient => `<li>${ingredient.text}</li>`).join('');
        } else {
            // Assume it's from TheMealDB or TheCocktailDB
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                if (ingredient) {
                    const measure = meal[`strMeasure${i}`];
                    ingredientslist += `<li>${measure} ${ingredient}</li>`;
                } else {
                    break;
                }
            }
        }

        return ingredientslist;
    };

    // Function to fetch recipes from an API
    const fetchRecipes = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error in fetching recipes');
        }
    };

    // Function to create a recipe div
    const createRecipeDiv = (meal) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        let imageUrl, mealName, mealCategory, mealType;
            // Assume meal has an 'id' property as a unique identifier
    const mealId = meal.id;


        if (meal.strMealThumb) {
            imageUrl = meal.strMealThumb; // TheMealDB API
            mealName = meal.strMeal;
            mealCategory = meal.strCategory;
            meal.id = meal.idMeal;

            // Update the HTML structure
            recipeDiv.innerHTML = `
                <button class="add_fav"> <i class="fa fa-heart-o" aria-hidden="true"></i></button>
                <img src="${imageUrl}">
                <h3>${mealName}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>Belongs to <span>${mealCategory}</span> Category</p>
            `;
        } else if (meal.strDrinkThumb) {
            imageUrl = meal.strDrinkThumb; // TheCocktailDB API
            mealName = meal.strDrink;
            mealCategory = meal.strCategory; // Assuming cocktails have categories
            meal.id= meal.idDrink;

            // Update the HTML structure
            recipeDiv.innerHTML = `
                <button class="add_fav"> <i class="fa fa-heart-o" aria-hidden="true"></i></button>
                <img src="${imageUrl}">
                <h3>${mealName}</h3>
                <p><span>${meal.strAlcoholic}</span> Drink</p>
                <p>Belongs to <span>${mealCategory}</span> Category</p>
            `;
        } else if (meal.image) {
            imageUrl = meal.image; // Edamam API
            mealName = meal.label;
            mealCategory = meal.dishType;
            mealType = meal.cuisineType;
            meal.id = meal.foodId;

            // Update the HTML structure
            recipeDiv.innerHTML = `
                <button class="add_fav"> <i class="fa fa-heart-o" aria-hidden="true"></i></button>
                <img src="${imageUrl}">
                <h3>${mealName}</h3>
                <p>Belongs to <span>${mealType}</span> dish  </p>
                <p><span> ${mealCategory}</span> Category</p>
            `;
        }
            // Set the data-id attribute
    recipeDiv.setAttribute('data-id', mealId);

        const button = document.createElement('button');
        button.textContent = "View Recipe";
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });

        recipeDiv.appendChild(button);

        return recipeDiv;
    };
// Function to open recipe popup
const openRecipePopup = (meal) => {
    recipeDetailContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal || meal.strDrink || meal.label}</h2>
        <h3> Ingredients:</h3>
        <ul class="ingredientlist">${fetchIngredients(meal)}</ul>
        <div>
            <h3> Instructions:</h3>
            <p class="recipeinstructions">${meal.strInstructions || `<a href="${meal.url}" target="_blank">${meal.url}</a>`}</p>
        </div>
    `;

    recipeDetailContent.parentElement.style.display = "block";
};

    // Event listener for search button
    searchbtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const searchInput = searchBox.value.trim();

        try {
            recipeContainer.innerHTML = "<h2>Fetching Recipes..</h2>";

            // Make parallel requests to all three APIs
            const [mealResponse, cocktailResponse, edamamResponse] = await Promise.all([
                fetchRecipes(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`),
                fetchRecipes(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`),
                fetchRecipes(`https://api.edamam.com/search?q=${searchInput}&app_id=b1a6143c&app_key=d8fe3f925032b19c40268c10f35fdfef`)
            ]);

            recipeContainer.innerHTML = "";

            // Display recipes from TheMealDB API
            if (mealResponse && mealResponse.meals) {
                mealResponse.meals.forEach(meal => {
                    const recipeDiv = createRecipeDiv(meal);
                    recipeContainer.appendChild(recipeDiv);
                });
            }

            // Display recipes from TheCocktailDB API
            if (cocktailResponse && cocktailResponse.drinks) {
                cocktailResponse.drinks.forEach(drink => {
                    const recipeDiv = createRecipeDiv(drink);
                    recipeContainer.appendChild(recipeDiv);
                });
            }

            // Display recipes from Edamam API
            if (edamamResponse && edamamResponse.hits) {
                edamamResponse.hits.forEach(hit => {
                    const meal = hit.recipe;
                    const recipeDiv = createRecipeDiv(meal);
                    recipeContainer.appendChild(recipeDiv);
                });
            }

            // Check if no recipes are found
            if (
                (!edamamResponse || !edamamResponse.hits.length) &&
                (!cocktailResponse || !cocktailResponse.drinks.length) &&
                (!mealResponse || !mealResponse.meals.length)
            ) {
                recipeContainer.innerHTML = "<h2>No recipes found...</h2>";
            }
        } catch (error) {
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
