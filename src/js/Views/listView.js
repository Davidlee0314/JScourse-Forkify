import * as el from "./dom"

export const renderList = (item) =>{
	const markup = `
				<li class="shopping__item" data-id="${item.id}">
                    <div class="shopping__count">
                        <input type="number" min ="0" value="${item.num}" step="${item.num}" class ="shopInput" data-id="${item.id}">
                        <p>${item.unit}</p>
                    </div>
                    <p class="shopping__description">${item.ingred}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use xlink:href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
	`
	el.elements.shopping.insertAdjacentHTML("beforebegin", markup)
}

export const delList = (id) =>{
	const dom = document.querySelector(`[data-id="${id}"]`)
	if(dom){
		dom.parentNode.removeChild(dom)
	}
}