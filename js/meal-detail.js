function initializeMealDetail(mealId, categoryName) {
    const mealDetailContainer = document.getElementById('mealDetailContainer');
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const mealDetailHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="img-box">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="detail-box">
                        <div class="heading_container">
                            <h2>${meal.strMeal}</h2>
                        </div>
                        <p>${meal.strInstructions}</p>                         
                    </div>
                </div>
            </div>  
            <div class="row">
            <div class="col-lg-12">
                <div class="header">Tutorials</div>
                    <div class="img-box">
                        <iframe width="560" height="315" src="${meal.strYoutube.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>               
            </div>             
        `;
            mealDetailContainer.innerHTML = mealDetailHTML;
            const readMoreLink = mealDetailContainer.querySelector('.detail-box a');
            if (readMoreLink) {
                readMoreLink.href = `read-more.html?category=${categoryName}&mealId=${mealId}`;
            }
        })
        .catch(error => {
            console.error('Error fetching meal details:', error);
        });
}

const urlParams = new URLSearchParams(window.location.search);
const mealIdParam = urlParams.get('mealId');
const categoryParam = urlParams.get('category');
// Inisialisasi detail makanan jika mealId dan category ada dalam parameter query
if (mealIdParam && categoryParam) {
    initializeMealDetail(mealIdParam, categoryParam);
}
