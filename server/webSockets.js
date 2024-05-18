const WebSocket = require('ws')
const chatController = require('./controller/chat.controller')
const wsServer = new WebSocket.Server({ port: 8999 })

const clientsSet = new Set()

function onConnect(wsClient) {
	wsClient.send(JSON.stringify({ action: 'GREETING', serverMsg: 'Привет с сервера!' }))
	clientsSet.add(wsClient)
	wsClient.on('message', async function (message) {
		const clientMessage = JSON.parse(message)
		switch (clientMessage.action) {
			case 'GREETING':
				console.log(clientMessage.greet)
				break
			case 'NEW_MESSAGE':
				const msgFromDb = await chatController.addMessage(clientMessage)
				clientsSet.forEach(el => {
					if (JSON.stringify(el) !== JSON.stringify(wsClient)) {
						el.send(JSON.stringify({ ...msgFromDb, action: 'NEW_MESSAGE' }))
					}
				})
				break
			default:
				break
		}
	})
	wsClient.on('close', function () {
		console.log('отключился')
		clientsSet.delete(wsClient)
	})
}

wsServer.on('connection', onConnect)

