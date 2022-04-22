window.addEventListener('load', () => {
  const form = document.querySelector('.form');
  const formInput = document.querySelector('.form__input');
  const formRandomBtn = document.querySelector('.form__random');
  const mealsInner = document.querySelector('.meals__inner');
  const mealsFullInner = document.querySelector('.meals__full');
  const mealsResult = document.querySelector('.meals__result');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    searchMeal();
  });

  function searchMeal() {
    const meal = formInput.value;
    formInput.value = '';

    if (meal.trim()) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.meals) {
            mealsFullInner.innerHTML = '';
            mealsInner.innerHTML = '';
            mealsResult.innerHTML = `<h2 class="meals__result-success">Search results for "${meal}":</h2>`;
            data.meals.forEach((item) => {
              const mealEl = document.createElement('div');
              mealEl.classList.add('meal');
              mealEl.setAttribute('data-mealId', item.idMeal);
              mealEl.innerHTML = `
                <h2 class="meal__title">${item.strMeal}</h2>
                <img class="meal__img" src="${item.strMealThumb}" alt="Meal">`;
              mealsInner.append(mealEl);
            });
          } else {
            mealsFullInner.innerHTML = '';
            mealsInner.innerHTML = '';
            mealsResult.innerHTML =
              '<h2 class="meals__result-error">There are no search results. Try again!</h2>';
          }
        });
    }
  }

  mealsInner.addEventListener('click', (e) => {
    const el = e.target;
    const parent = el.closest('.meal');
    const mealId = parent.dataset.mealid;

    getFullMeal(mealId);
  });

  function getFullMeal(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((res) => res.json())
      .then((data) => {
        const fullMeal = data.meals[0];
        mealsFullInner.innerHTML = '';
        mealsInner.innerHTML = '';
        mealsResult.innerHTML = '';

        const mealIngMesure = {};

        for (let i = 1; i <= 20; i++) {
          const mealIng = 'strIngredient' + i;
          const mealMesure = 'strMeasure' + i;
          if (fullMeal[mealIng]) {
            mealIngMesure[fullMeal[mealIng]] = fullMeal[mealMesure];
          } else {
            break;
          }
        }
        const mealsKeys = Object.keys(mealIngMesure);

        const mealEl = document.createElement('div');
        mealEl.classList.add('meal-full');
        mealEl.setAttribute('data-mealId', fullMeal.idMeal);
        mealEl.innerHTML = `
          <h2 class="meal-full-title">${fullMeal.strMeal}</h2>
          <img class="meal-full-img" src="${fullMeal.strMealThumb}" alt="Meal">
          <div class="meal-full-common">
              ${fullMeal.strArea} -     ${fullMeal.strCategory}
          </div>
          <p class="meal-full-descr">${fullMeal.strInstructions}</p>
          <div class="meal-full-ingridients">
          ${mealsKeys
            .map((item) => {
              return `<span class="meal-full-ingridients-span">${item} ${mealIngMesure[item]}</span>`;
            })
            .join('')}
          </div>
          `;

        mealsFullInner.append(mealEl);
      });
  }

  formRandomBtn.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((res) => res.json())
      .then((data) => {
        getFullMeal(data.meals[0].idMeal);
      });
  });
});
