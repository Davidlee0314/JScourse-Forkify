import axios from "axios"

export default class Recipe{
	constructor(id){
		this.id = id
	}

	async getRecipe(){
		const key = "e6c2ceb0176af2490054b20c419d1f42"
		const proxy = "http://cors-anywhere.herokuapp.com/"

		try{
			const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`)
			this.ingredients = res.data.recipe.ingredients
			this.author = res.data.recipe.publisher
			this.url = res.data.recipe.source_url
			this.title = res.data.recipe.title
			this.img = res.data.recipe.image_url
		}catch(error){
			alert("Unable to load recipe")
		}
	}

	calcTime(){
		try{
			const num = this.ingredients.length / 3
			this.time = num * 15
		}catch(error){
			alert("Unable to load recipe")
		}
	}

	calcServing(){
		this.servings = 4
	}

	parseIngredients(){
		let newIngredients = this.ingredients.map(el =>{
			el = el.replace(/ *\([^)]*\) */g, " ")
			el = el.replace("-", " ")

			let ingredient = el.split(" ")
			const unitlong = ["tablespoons", "tablespoon", "ounces", "ounce", "teaspoons", "teaspoon", "cups", "cup", "pounds", "pound"]
			const unitshort = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup", "cup", "pound", "pound"]

			var index = 0;
			const newIngredients = ingredient.map((el ,ind) =>{
				unitlong.forEach((long, i)=>{
					if (el.includes(long)){
						el = el.replace(long, unitshort[i])
						index = ind;
					}
				})
				return el
			})


			let num, unit, ingred;
			if(index === 0){
				if(parseInt(newIngredients[0])){
					num = parseInt(newIngredients[0])
					unit = ""
					ingred = newIngredients.slice(1).join(" ")
				}else{
					num = 1
					unit = ""
					ingred = newIngredients.join(" ")
				}
			}else{
				try{
					let numArray = newIngredients.slice(0, index)
					num = eval(numArray.join("+"))
				}catch(error){
					if(num){
						num = eval(newIngredients[0])
					}else{
						num = 1
					}
				}
				unit = newIngredients.slice(index, index + 1)[0]
				ingred =  newIngredients.slice(index + 1).join(" ")
			}
			const obj = {
				num: num,
				unit: unit,
				ingred: ingred
			}
			return obj
		})
		this.ingredients = newIngredients
	}
	updateCount(type){
		(type === "inc") ? (this.servings += 1) : (this.servings -= 1)

		this.ingredients.map(obj =>{
			if(type === "inc")
				obj.num *= this.servings / (this.servings - 1)
			else
				obj.num *= this.servings / (this.servings + 1)
			return obj
		})
	}	
}
