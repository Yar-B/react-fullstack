export class WebSocketService {
	constructor(userInfo) {
		this.socket = new WebSocket('ws://' + document.location.hostname + ':8999')
		this.socket.addEventListener('open', () => {
			this.socket.send(JSON.stringify({ action: 'GREETING', greet: 'Привет Server!' }))
		})

		this.socket.addEventListener('message', event => {
			const res = JSON.parse(event.data)
			switch (res.action) {
				case 'GREETING':
					console.log(res.serverMsg)
					break
				case 'NEW_MESSAGE':
					this.#sub({
						content: res.content,
						time: res.time,
						user: res.user,
						isCurrentUser: false
					})
					break
				default:
					break
			}
		})

		this.socket.addEventListener('close', () => {
			//
		})
	}

	socket

	#sub = () => {}

	subscribe(f) {
		this.#sub = f
	}
}

