const db = require('../db')
const md5 = require('md5')
const pidCrypt = require('pidcrypt')
require('pidcrypt/aes_cbc')

const aes = new pidCrypt.AES.CBC()
const cryptoKey = 'это_ключик_для_шифрования))'

class AuthController {
	async prolongSession(req, res) {
		const sessionCookie = req.cookies['APP_SESSION']
		const userName = aes.decryptText(sessionCookie, cryptoKey)
		const result = await db.query('SELECT * FROM users WHERE login = $1', [userName])
		if (result.rows[0]) {
			res.json({
				success: true,
				login: result.rows[0].login
			})
		} else {
			res.json({
				success: false
			})
		}
	}
	async login(req, res) {
		const userRecord = req.body
		const result = await db.query('SELECT * FROM users WHERE login = $1 AND password = $2', [
			userRecord.login,
			md5(userRecord.password)
		])
		let response
		if (result.rows[0]) {
			res.cookie('APP_SESSION', aes.encryptText(userRecord.login, cryptoKey), {
				httpOnly: true
			})
			response = { success: true, login: result.rows[0].login }
		} else {
			response = { success: false }
		}
		res.json(response)
	}
	async register(req, res) {
		const userRecord = req.body
		const checkResult = await db.query('SELECT * FROM users WHERE login = $1', [userRecord.login])
		let response
		if (!checkResult.rows[0]) {
			const result = await db.query('INSERT INTO users (login, password) values ($1, $2) RETURNING *', [
				userRecord.login,
				md5(userRecord.password)
			])
			res.cookie('APP_SESSION', aes.encryptText(userRecord.login, cryptoKey), {
				httpOnly: true
			})
			response = { success: true, login: result.rows[0].login }
		} else {
			response = { success: false }
		}
		res.json(response)
	}
	async logout(req, res) {
		res.clearCookie('APP_SESSION')
		res.json({ success: true })
		res.send()
	}
}

module.exports = new AuthController()

