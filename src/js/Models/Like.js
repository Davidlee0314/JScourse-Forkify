export default class Like{
	constructor(){
		this.likes= []
	}

	addLike(title, img, author, id){
		const obj = {
			img,
			author,
			title,
			id
		}
		this.likes.push(obj)
		this.storeData()
		return obj
	}

	delLike(id){
		const index = this.likes.findIndex(el => el.id === id)
		this.likes.splice(index, 1)
		this.storeData()
	}

	isLiked(id){
		return this.likes.findIndex(el => el.id === id)
	}

	storeData(){
		localStorage.setItem("like", JSON.stringify(this.likes))
	}

	readData(){
		this.likes = JSON.parse(localStorage.getItem("like"))
	}
}