export const elements = {
	searchInput: document.querySelector(".search__field"),
	searchForm: document.querySelector(".search"),
	resultsList: document.querySelector(".results__list"),
	results: document.querySelector(".results"),
	resultsPage: document.querySelector(".results__pages"),
	recipe: document.querySelector(".recipe"),
	shopping: document.querySelector(".shopping__list"),
	ingred: document.querySelectorAll(".recipe__item")
	
}
export const startLoading = (dom) =>{
	const loader = `
		<div class="loader">
			<svg>
				<use href="img/icons.svg#icon-cw">
			</svg>
		</div>
	`
	dom.insertAdjacentHTML("afterbegin", loader)
}
export const endLoading = () => {
	const loader = document.querySelector(".loader")
	if(loader)
		loader.parentElement.removeChild(loader)
}