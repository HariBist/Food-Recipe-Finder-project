const searchBox = document.querySelector('.searchBox');
const searchbtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipeContainer');
const recipeDetailContent = document.querySelector('.recipe-details-content');
const recipeclosebtn = document.querySelector('.recipe-close-btn');

const fetchIngredients = (meal) => {
    return meal.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('');
};

// Function to get recipe
const fetchRecipe = async (query) => {
    try {
        recipeContainer.innerHTML = "<h2>Fetching Recipes..</h2>";

        const data = await fetch(`https://api.edamam.com/search?q=${query}&app_id=b1a6143c&app_key=d8fe3f925032b19c40268c10f35fdfef`);
        const response = await data.json();

        recipeContainer.innerHTML = "";
        response.hits.forEach(hit => {
            const meal = hit.recipe;
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            // Add data-foodid attribute to store the foodId
            recipeDiv.setAttribute('data-foodid', meal.foodId);

            recipeDiv.innerHTML = `
                <img src="${meal.image}">
                <h3>${meal.label}</h3> 
                <p><span>${meal.dishType}</span> Category</p>
                <p>Belongs to <span>${meal.cuisineType}</span> Recipe</p>
            `;
            
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            button.addEventListener('click', () => {
                openRecipePopup(meal);
            });

            recipeDiv.appendChild(button);
            recipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error in fetching recipes... </h2>";
    }
};

const openRecipePopup = (meal) => {
    recipeDetailContent.innerHTML = `
        <h2 class="recipeName">${meal.label}</h2>
        <h3> Ingredients:</h3>
        <ul class="ingredientlist">${fetchIngredients(meal)}</ul>
        <div>
            <h3> Instructions:</h3>
            <p class="recipeinstructions"><a href="${meal.url}" target="_blank">${meal.url}</a></p>
        </div>
    `;

    recipeDetailContent.parentElement.style.display = "block";
};

recipeclosebtn.addEventListener('click', () => {
    recipeDetailContent.parentElement.style.display = "none";
});

searchbtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const searchInput = searchBox.value.trim();

    await fetchRecipe(searchInput);
});
