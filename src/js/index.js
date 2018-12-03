import Search from "./Models/Search"
import Recipe from "./Models/Recipe"
import List from "./Models/List"
import Like from "./Models/Like"
import * as el from "./Views/dom"
import * as searchView from "./Views/searchView"
import * as likeView from "./Views/likeView"
import * as recipeView from "./Views/RecipeView"
import * as listView from "./Views/listView"

/* Record the state of things listed below
 - Search results 
 - List items 
 - Recipes
 - Liked recipes  
*/
const state = {

}

const ControlSearch = async function(){
	//1. get the data from UI
	const query = searchView.getInput()

	//2. renew the state variable
	if(query){
		state.search = new Search(query);

		//3. remove data.. UI
		searchView.clearInput()
		searchView.clearResults()
		el.startLoading(el.elements.results)

		//4. get results 
		await state.search.getResults(query)

		//5. get it appear on UI interface
		el.endLoading()
		searchView.renderResults(state.search.recipes)
	}
}

//Testing


const ControlLike = (rec) =>{
	if(!state.like){
		state.like = new Like()
	}

	if((state.like.isLiked(rec.id) === -1)){
		const like = state.like.addLike(rec.title, rec.img, rec.author, rec.id)

		likeView.toggleLike(true)

		likeView.renderLike(like)
	}
	else{
		state.like.delLike(rec.id)

		likeView.toggleLike(false)

		likeView.delLike(rec.id)
	}
	likeView.renderLikeList(state.like.likes)
}

const ControlList = (items) =>{
	if(!state.list){
		state.list = new List()
		items.forEach(el =>{
			const item = state.list.additem(el.num, el.unit, el.ingred)
			listView.renderList(item)
		})
	}else if(state.list.items.length === 0){
		items.forEach(el =>{
			const item = state.list.additem(el.num, el.unit, el.ingred)
			listView.renderList(item)
		})
	}
}

const ControlRecipe = async function(){
	//1. read id from hash
	const rid = window.location.hash.replace("#", "")

	//1.5 activate/deactivate the right area
	if(rid){
		searchView.activateRecipe(rid)
	}

	if(rid){
		//2. UI adjucstment
		recipeView.clearRecipe()
		el.startLoading(el.elements.recipe)

		//3. get recipe
		state.recipe = new Recipe(rid)
		await state.recipe.getRecipe()
		state.recipe.calcTime()
		state.recipe.calcServing()
		
		//4. process the data
		state.recipe.parseIngredients()

		//5. show this on UI
		el.endLoading()
		recipeView.renderRecipe(state.recipe, state.like.isLiked(rid))
		if(state.recipe) DragController()
	}
}

el.elements.searchForm.addEventListener("submit", event =>{

	event.preventDefault();
	
	ControlSearch()
})

el.elements.resultsPage.addEventListener("click", event =>{
	const btn = event.target.closest(".btn-inline")
	const pageToGo = parseInt(btn.getAttribute("datatogo"))

	searchView.clearResults()
	searchView.renderResults(state.search.recipes, pageToGo)
})


window.addEventListener("load", ControlRecipe)
window.addEventListener("hashchange", ControlRecipe)

el.elements.recipe.addEventListener("click", event =>{
	if(event.target.matches(".btn-decrease, .btn-decrease *")){
		if(state.recipe.servings > 1){
			state.recipe.updateCount("dec")
			recipeView.updateCountView(state.recipe)
		}
	}else if(event.target.matches(".btn-increase, .btn-increase *")){
		state.recipe.updateCount("inc")
		recipeView.updateCountView(state.recipe)
	}else if(event.target.matches(".recipe__shop, .recipe__shop *")){
		ControlList(state.recipe.ingredients)
	}else if(event.target.matches(".recipe__love, .recipe__love *")){
		ControlLike(state.recipe)
	}
})

document.querySelector(".shopping").addEventListener("click", event =>{
	if (event.target.matches(".shopping__delete, .shopping__delete *")){
		const id = event.target.closest(".shopping__item").dataset.id
		state.list.delitem(id)
		listView.delList(id)
	}else if(event.target.matches(".shopInput")){
		const dom = event.target.closest(".shopInput")
		console.log(dom.dataset.id)
		state.list.updateNum(dom.dataset.id, parseFloat(dom.value))
	}
})

window.addEventListener("load", ()=>{
	state.like = new Like()

	state.like.readData()

	likeView.renderLikeList(state.like.likes)

	if (state.like.likes.length > 0){
		state.like.likes.forEach(el =>{
			likeView.renderLike(el)
		})
	}
})

const DragController = () => {
	const doms = document.querySelectorAll(".recipe__item")

	doms.forEach(el =>{
		el.addEventListener("dragstart", e =>{
			console.log(e.target.childNodes)
			e.target.childNodes.forEach(el =>{el.style.visibility = "hidden"})
		})

	})
	
}