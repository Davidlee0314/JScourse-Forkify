var uniqid = require('uniqid');

export default class List{
	constructor(){
		this.items = []
	}

	additem(num, unit, ingred){
		const item = {
			num,
			unit,
			ingred,
			id: uniqid()
		}
		this.items.push(item)
		return item
	}

	delitem(id){
		const index = this.items.findIndex(el => el.id === id)
		if(index >= 0){
			this.items.splice(index, 1)
		}
	}

	updateNum(id, newNum){
		const item = this.items.find(el => el.id === id)
		if(item){
			item.num = newNum
		}
	}
}