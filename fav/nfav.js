document.addEventListener('DOMContentLoaded', async () => {
    const favRecipeContainer = document.getElementById('favRecipeContainer');

    const favMealList = JSON.parse(localStorage.getItem('favMealList')) || [];

    console.log('Stored favMealList:', favMealList);

    for (const favMealId of favMealList) {
        try {
            console.log('Processing favMealId:', favMealId);

            const meal = await fetchIndividualRecipe(favMealId);

            if (!meal) {
                console.error('Invalid meal data for favMealId:', favMealId);
                continue;
            }

            const favRecipeDiv = createRecipeDiv(meal);
            favRecipeContainer.appendChild(favRecipeDiv);
        } catch (error) {
            console.error('Error fetching favorite recipe:', error);
        }
    }
});

// ... (Rest of the code remains unchanged)


// Function to fetch individual recipes based on meal type
const fetchIndividualRecipe = async (favMealId) => {
    const mealType = getMealType(favMealId); // Assuming you have a function to determine meal type

    switch (mealType) {
        case 'meal':
            return fetchRecipes(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favMealId}`);
        case 'cocktail':
            return fetchRecipes(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${favMealId}`);
        case 'edamam':
            // Adjust this URL based on your Edamam API structure
            return fetchRecipes(`https://api.edamam.com/search?q=${favMealId}&app_id=b1a6143c&app_key=d8fe3f925032b19c40268c10f35fdfef`);
        default:
            console.error('Invalid meal type:', mealType);
            return null; // Return null to skip adding this meal to the container
    }
};

// Function to create a recipe div
const createRecipeDiv = (meal) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');

    let imageUrl, mealName, mealCategory, mealType;
    // Customize this part based on your meal data structure
    if (meal.strMealThumb) {
        imageUrl = meal.strMealThumb; // TheMealDB API
        mealName = meal.strMeal;
        mealCategory = meal.strCategory;

        // Update the HTML structure
        recipeDiv.innerHTML = `
            <img src="${imageUrl}">
            <button class="add_fav"> <i class="fa fa-heart" aria-hidden="true"></i></button>
            <h3>${mealName}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${mealCategory}</span> Category</p>
        `;
    } else if (meal.strDrinkThumb) {
        imageUrl = meal.strDrinkThumb; // TheCocktailDB API
        mealName = meal.strDrink;
        mealCategory = meal.strCategory; // Assuming cocktails have categories

        // Update the HTML structure
        recipeDiv.innerHTML = `
            <img src="${imageUrl}">
            <button class="add_fav"> <i class="fa fa-heart" aria-hidden="true"></i></button>
            <h3>${mealName}</h3>
            <p><span>${meal.strAlcoholic}</span> Drink</p>
            <p>Belongs to <span>${mealCategory}</span> Category</p>
        `;
    } else if (meal.image) {
        imageUrl = meal.image; // Edamam API
        mealName = meal.label;
        mealCategory = meal.dishType;
        mealType = meal.cuisineType;

        // Update the HTML structure
        recipeDiv.innerHTML = `
            <img src="${imageUrl}">
            <button class="add_fav"> <i class="fa fa-heart" aria-hidden="true"></i></button>
            <h3>${mealName}</h3>
            <p>Belongs to <span>${mealType}</span> dish  </p>
            <p><span>${mealCategory}</span> Category</p>
        `;
    } else {
        // Log an error if the meal type is not recognized
        console.error('Unknown meal type:', meal);
        return null; // Return null to skip adding this meal to the container
    }

    const button = document.createElement('button');
    button.textContent = "View Recipe";
    button.addEventListener('click', () => {
        // Implement the function to open the recipe popup if needed
        // openRecipePopup(meal);
    });

    recipeDiv.appendChild(button);

    return recipeDiv;
};

// Function to determine the meal type based on the ID
const getMealType = (mealId) => {
    if (!mealId) {
        console.error('Invalid meal ID:', mealId);
        return 'unknown'; // Return a default value for unknown meal type
    }

    const trimmedMealId = mealId.trim();

    if (trimmedMealId.startsWith('meal')) {
        return 'meal';
    } else if (trimmedMealId.startsWith('cocktail')) {
        return 'cocktail';
    } else if (trimmedMealId.startsWith('edamam')) {
        return 'edamam';
    } else {
        console.error('Unknown meal type for ID:', trimmedMealId);
        return 'unknown'; // Return a default value for unknown meal type
    }
};
