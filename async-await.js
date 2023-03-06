// error message hide by default
document.getElementById('error-message').style.display = 'none';
// async await using here
const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear the search field
    searchField.value = '';
    if (searchText == ''){
        const searchResult = document.getElementById('search-result');
        searchResult.innerHTML = `
        <div class="alert alert-warning text-center mx-auto" role="alert">
            <h5>Please Write Something!</h5>
        </div>
        `;
    }else{
        // create dynamic search url
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.meals);
        // fetch(url)
        // .then(res => res.json())
        // .then(data => displaySearchResult(data.meals));
         }
    catch(error){
        document.getElementById('error-message').style.display = 'block';
    }
    }    
};

const displaySearchResult = (meals) => {
    const searchResult = document.getElementById('search-result');
    // clear the search result
    // searchResult.innerHTML = '';
    searchResult.textContent = '';
    if (meals !== null) {
        console.log(meals.length)
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div onclick="loadMealDetail('${meal.idMeal}')" class="card">
                     <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                     </div>
              </div>
            `;
            searchResult.appendChild(div)
        }) 
    } else {        
        searchResult.innerHTML = `
            <div class="alert alert-warning text-center mx-auto" role="alert">
                <h5>No Result Found!</h5>
            </div>
            `;
    }        
};

// async await using here
const loadMealDetail = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0]);
    // fetch(url)
    // .then(response => response.json())
    // .then(data => displayMealDetail(data.meals[0]))
};

const displayMealDetail = meal => {
    const mealDetail = document.getElementById('meal-detail');
    mealDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
        `;
        mealDetail.appendChild(div);
}