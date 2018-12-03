import * as el from "./dom"

export const limitTitle = (title, limit = 17) =>{
	let i = limit;
	let overLimit = false

	if(title.length >= limit){
		overLimit = true
		while(title.substring(i, i+1) !== " "){
			i--
		}
	} 
	if(overLimit){
		return `${title.substring(0, i)} ...`
	}else{
		return title.substring(0, i-1)
	}	
}

const showRecipe = (rec) =>{
	const markup = `
		<li>
            <a class="results__link" href="#${rec.recipe_id}">
                <figure class="results__fig">
                    <img src="${rec.image_url}" alt="${rec.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitTitle(rec.title)}</h4>
                    <p class="results__author">${rec.publisher}</p>
                </div>
            </a>
        </li>
	`
	el.elements.resultsList.insertAdjacentHTML("beforeend", markup)
}

export const clearInput = () =>{
	el.elements.searchInput.value = ""
}

export const clearResults = () =>{
	el.elements.resultsList.innerHTML = ""
	el.elements.resultsPage.innerHTML = ""
}

export const getInput = () => el.elements.searchInput.value

export const renderResults = (results, page = 1, pagePerPage = 10) =>{
	if(results.length != 0){
		renderPages(results, page, pagePerPage).forEach(showRecipe)
	}
}

const renderPages = (res, page, pagePerPage) =>{
	const start = page * pagePerPage - pagePerPage
	const end = page * pagePerPage
	const pages = Math.ceil(res.length / pagePerPage)
	renderPageBtn(page, pages)

	return res.slice(start, end)
}

//type will be prev or next
const renderPageBtn = (page, pages) =>{
	if(page === 1 & pages > 0){
		insertBtn(page, "next")
	}else if(page === pages & pages > 0){
		insertBtn(page, "prev")
	}else{
		insertBtn(page, "next")
		insertBtn(page, "prev")
	}
}

const insertBtn = (page, type) =>{
	const markup =`
					<button class="btn-inline results__btn--${type}" datatogo= ${type === "prev" ? page - 1 : page + 1}>
				        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
				        <svg class="search__icon">
				            <use xlink:href="img/icons.svg#icon-triangle-${type === "prev" ? "left" : "right"}"></use>
				        </svg>
				    </button>
				  `
	el.elements.resultsPage.insertAdjacentHTML("afterbegin",markup)
}

export const activateRecipe = (id) =>{
	const list = document.querySelectorAll(".results__link")
	list.forEach(el => el.classList.remove("results__link--active"))
	
	if(document.querySelector(`a[href="#${id}"]`)){
		document.querySelector(`a[href="#${id}"]`).classList.add("results__link--active")
	}
}
