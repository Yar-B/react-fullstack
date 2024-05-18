import { Button, Input } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { WebSocketService } from '../../services/ws.service'
import { ChatService } from '../../services/chat.service'

const wsService = new WebSocketService()
const chatService = new ChatService()

function Sofa({ currentUserInfo }) {
	const [loading, setLoading] = useState(false)
	const [msg, setMsg] = useState('')
	const [chatMsgs, setChatMsgs] = useState([])
	const [isStartState, setStartState] = useState(true)
	const input = useRef(null)
	const chatWrapper = useRef(null)
	const messagesEndRef = useRef(null)

	function post() {
		setChatMsgs([
			...chatMsgs,
			{
				content: msg.trim(),
				time: new Date().valueOf(),
				user: currentUserInfo.login,
				isCurrentUser: true
			}
		])
		wsService.socket.send(
			JSON.stringify({
				action: 'NEW_MESSAGE',
				content: msg.trim(),
				time: new Date().valueOf(),
				userId: currentUserInfo.id
			})
		)
		setMsg('')
		input.current.focus()
	}

	function addMsgFromAnotherUsers(msg) {
		setChatMsgs([...chatMsgs, msg])
	}

	function getTime(dateStamp) {
		const date = new Date(Number(dateStamp))
		return date.getHours() + ':' + date.getMinutes()
	}

	wsService.subscribe(msg => {
		addMsgFromAnotherUsers(msg)
	})

	async function fetchData() {
		setLoading(true)
		const chat = await chatService.getChat(currentUserInfo.id)
		setChatMsgs(...[chat])
		input.current.input.addEventListener('keyup', e => {
			e.preventDefault()
			if (e.code === 'Enter') {
				document.getElementById('sendButton').click()
			}
		})
		setStartState(true)
		setLoading(false)
	}

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		// if (isStartState) {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
		setStartState(false)
		// }
	}, [chatMsgs])

	return (
		<>
			<div ref={chatWrapper} className='chat-area-wrapper'>
				<div className='chat-area'>
					{chatMsgs.map((msg, i) => {
						return (
							<div key={i} className={msg.isCurrentUser ? 'current-user-message-wrapper' : 'message-wrapper'}>
								<div className='message'>
									<span className='msg-owner'>{msg.isCurrentUser ? '' : msg.user}</span>
									<span className='msg-content'>{msg.content}</span>
									<span className='msg-time'>{getTime(msg.time)}</span>
								</div>
								<div ref={messagesEndRef} />
							</div>
						)
					})}
				</div>
			</div>
			<div className='chat-items'>
				<Input
					ref={input}
					autoFocus
					value={msg}
					onChange={e => setMsg(e.target.value)}
					style={{ marginRight: '20px' }}
				/>
				<Button id='sendButton' onClick={post} disabled={!msg.trim()}>
					Отправить
				</Button>
			</div>
		</>
	)
}

export default Sofa

