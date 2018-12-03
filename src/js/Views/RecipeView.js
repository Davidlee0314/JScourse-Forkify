import * as el from "./dom"
var Fraction = require('fractional').Fraction

const renderIngredinets = el =>{
	return `
					<li class="recipe__item" draggable="true">
                        <svg class="recipe__icon">
                            <use xlink:href="img/icons.svg#icon-check"></use>
                        </svg>
                        <div class="recipe__count">${parseNum(el.num)}</div>
                        <div class="recipe__ingredient">
                            <span class="recipe__unit">${el.unit}</span>
                            ${el.ingred}
                        </div>
                    </li>
	`
}

const clearIngredients = () =>{
	document.querySelector(".recipe__ingredient-list").innerHTML = ""
}

const parseNum = count =>{
	const num = new Fraction(count).toString()
	return num
}

export const renderRecipe = (recipe, isLiked) =>{
	const markup = `
			<figure class="recipe__fig">
                <img src="${recipe.img}" alt="Tomato" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use xlink:href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use xlink:href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use xlink:href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use xlink:href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use xlink:href="img/icons.svg#${(isLiked !== -1) ? "icon-heart" : "icon-heart-outlined"}"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                	${recipe.ingredients.map(el => renderIngredinets(el)).join("")}
                </ul>

                <button class="btn-small recipe__btn recipe__shop">
                    <svg class="search__icon">
                        <use xlink:href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use xlink:href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
	`
	el.elements.recipe.insertAdjacentHTML("afterbegin", markup)
}

export const clearRecipe = ()=>{
	el.elements.recipe.innerHTML = ""
}

export const updateCountView = (rec) =>{
	
	// clearIngredients()

	// const markup = rec.ingredients.map(el => renderIngredinets(el)).join("")
	// document.querySelector(".recipe__ingredient-list").insertAdjacentHTML("afterbegin", markup)
	document.querySelector(".recipe__info-data--people").textContent = rec.servings

	document.querySelectorAll(".recipe__count").forEach((cur, i) =>{
		cur.textContent = parseNum(rec.ingredients[i].num)
		
	})
}