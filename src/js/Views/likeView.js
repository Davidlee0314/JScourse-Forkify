import * as searchView from "./searchView"

export const toggleLike = (isLiked) => {
	const svg = isLiked ? "icon-heart" : "icon-heart-outlined"
	document.querySelector(".recipe__love use").setAttribute("xlink:href", `img/icons.svg#${svg}`)
}

export const renderLike = (like) =>{

	const markup = `<li>
                    	<a class="likes__link" href="#${like.id}">
                            <figure class="likes__fig">
                                <img src="${like.img}" alt="Test">
                            </figure>
                            <div class="likes__data">
                                <h4 class="likes__name">${searchView.limitTitle(like.title)}</h4>
                                <p class="likes__author">${like.author}</p>
                            </div>
                        </a>
                    </li>
	`
	document.querySelector(".likes__list").insertAdjacentHTML("beforeend", markup)

}
export const delLike = (id) =>{
	const dom = document.querySelector(`.likes__link[href = "#${id}"]`).parentElement
	dom.parentNode.removeChild(dom)
}

export const renderLikeList = likes =>{
	document.querySelector(".likes").style.visibility = (likes.length !== 0) ? "visible" : "hidden"
	
}