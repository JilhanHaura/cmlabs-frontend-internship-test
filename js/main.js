document.addEventListener('DOMContentLoaded', function () {
    let activeFilter = document.querySelector('.filters_menu .active');
    const lastSelectedCategory = localStorage.getItem('selectedCategory');

    function showItems() {
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(response => response.json())
            .then(data => {
                const filtersMenu = document.querySelector('.filters_menu');
                filtersMenu.innerHTML = '';
                data.categories.forEach(category => {
                    const filterItem = document.createElement('li');
                    filterItem.classList.add('filter-item');
                    filterItem.setAttribute('data-filter', `.${category.strCategory.toLowerCase()}`);
                    filterItem.innerText = category.strCategory;

                    filterItem.addEventListener('click', () => showCategoryDetail(category.strCategory, filterItem));
                    filtersMenu.appendChild(filterItem);

                    if (lastSelectedCategory && category.strCategory.toLowerCase() === lastSelectedCategory) {
                        showCategoryDetail(category.strCategory, filterItem);
                    }
                });
            });
    }

    function showCategoryDetail(categoryName, clickedFilterItem) {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
            .then(response => response.json())
            .then(data => {
                const filtersContent = document.querySelector('.filters-content .row');
                filtersContent.innerHTML = '';
                data.meals.forEach(meal => {
                    const colItem = document.createElement('div');
                    colItem.classList.add('col-sm-6', 'col-lg-4', 'all', categoryName.toLowerCase());
                    colItem.innerHTML = `<div class="box">
                        <div>
                            <div class="img-box">
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            </div>
                            <div class="detail-box">
                                <h5>${meal.strMeal}</h5>
                                <p>${meal.strInstructions}</p>
                                <div class="options">
                                    <h6>$17</h6>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    colItem.addEventListener('click', () => showMealDetail(meal.idMeal, categoryName));
                    filtersContent.appendChild(colItem);
                });

                if (activeFilter) {
                    activeFilter.classList.remove('active');
                }

                clickedFilterItem.classList.add('active');
                activeFilter = clickedFilterItem;
                localStorage.setItem('selectedCategory', categoryName.toLowerCase());

                document.querySelector('.filters-content').style.display = 'block';
                document.getElementById('categories-container').style.display = 'none';
                document.getElementById('category-detail-container').style.display = 'block';
                document.getElementById('meal-detail-container').style.display = 'none';
            });
    }

    function showMealDetail(mealId, categoryName) {
        window.location.href = `meal-detail.html?category=${categoryName}&mealId=${mealId}`;
    }

    showItems();
});
