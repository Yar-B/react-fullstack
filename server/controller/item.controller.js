const db = require('../db')

class ItemController {
	async createItem(req, res) {
		const { id, name, description } = req.body
		let item
		if (id) {
			item = await db.query('UPDATE item set name = $1, description = $2 where id = $3 RETURNING *', [
				name,
				description,
				id
			])
		} else {
			item = await db.query('INSERT INTO item (name, description) values ($1, $2) RETURNING *', [name, description])
		}
		res.json(item.rows[0])
	}
	async getItems(req, res) {
		const items = await db.query('SELECT * FROM item')
		res.json(items.rows)
	}
	async getOneItem(req, res) {
		const id = req.params.id
		const item = await db.query('SELECT * FROM item WHERE id = $1', [id])
		res.json(item.rows[0])
	}
	async deleteItem(req, res) {
		const id = req.params.id
		const item = await db.query('DELETE FROM item WHERE id = $1', [id])
		res.json({ success: true })
	}
}

module.exports = new ItemController()

