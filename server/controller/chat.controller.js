const db = require('../db')

class ChatController {
	async addMessage(message) {
		const dbRes = await db.query('INSERT INTO messages(message, dateStamp, userID) VALUES ($1, $2, $3) RETURNING *', [
			message.content,
			message.time,
			message.userId
		])
		const msg = await db.query(
			'SELECT M.message as content, M.dateStamp AS time, U.login AS user from messages M INNER JOIN users U ON U.id = M.userID WHERE M.id = $1',
			[dbRes.rows[0].id]
		)
		return msg.rows[0]
	}

	async getChat(req, res) {
		const id = req.query.userId
		const chat = await db.query(
			"SELECT M.message as content, M.dateStamp AS time, U.login AS user, CASE WHEN U.id = $1 THEN 'true' ELSE 'false' END as iscurrentuser from messages M INNER JOIN users U ON U.id = M.userID",
			[id]
		)
		res.json(
			chat.rows.map(msg => {
				return {
					content: msg.content,
					isCurrentUser: msg.iscurrentuser === 'true' ? true : false,
					time: msg.time,
					user: msg.user
				}
			})
		)
	}

	async hideMessage() {}

	async unhideMessage() {}
}

module.exports = new ChatController()

