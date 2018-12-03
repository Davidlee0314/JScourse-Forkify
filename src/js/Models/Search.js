import axios from "axios"

export default class Search{
	constructor(query){
		this.query = query
	}
	async getResults(){
		const key = "e6c2ceb0176af2490054b20c419d1f42"
		const proxy = "http://cors-anywhere.herokuapp.com/"

		try{
			const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
			this.recipes = res.data.recipes
		}catch(error){
			alert(error)
		}
	}
}