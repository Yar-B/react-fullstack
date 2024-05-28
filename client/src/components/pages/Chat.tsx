import { Button, Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { WebSocketService } from '../../services/ws.service.ts';
import { ChatService } from '../../services/chat.service.ts';
import { UserRecord } from '../../records/user.record';
import { WsMessageRecord } from '../../records/ws-message.record';
import { getDate, getTime, isDatesDifferent } from '../../utils/date.util';

const wsService = new WebSocketService();
const chatService = new ChatService();

function Sofa(props: any) {
	const currentUserInfo: UserRecord = props.currentUserInfo;
	const [loading, setLoading] = useState<boolean>(false);
	const [msg, setMsg] = useState<string>('');
	const [chatMsgs, setChatMsgs] = useState<WsMessageRecord[]>([]);
	const [isStartState, setStartState] = useState<boolean>(true);
	const input = useRef<null | any>(null);
	const chatWrapper = useRef<null | any>(null);
	const messagesEndRef = useRef<null | any>(null);

	function post() {
		setChatMsgs([
			...chatMsgs,
			{
				content: msg.trim(),
				time: new Date().valueOf(),
				user: currentUserInfo.login,
				isCurrentUser: true
			}
		]);
		wsService.socket.send(
			JSON.stringify({
				action: 'NEW_MESSAGE',
				content: msg.trim(),
				time: new Date().valueOf(),
				userId: currentUserInfo.id
			})
		);
		setMsg('');
		input.current.focus();
	}

	function addMsgFromAnotherUsers(msg: WsMessageRecord) {
		setChatMsgs([...chatMsgs, msg]);
	}

	wsService.subscribe((msg: WsMessageRecord) => {
		addMsgFromAnotherUsers(msg);
	});

	async function fetchData() {
		setLoading(true);
		const chat = await chatService.getChat(currentUserInfo.id.toString());
		setChatMsgs(...[chat]);
		input.current.input.addEventListener('keyup', (e: KeyboardEvent) => {
			e.preventDefault();
			if (e.code === 'Enter') {
				document.getElementById('sendButton')!.click();
			}
		});
		setStartState(true);
		setLoading(false);
	}

	function inputInFocus() {
		console.log('hide footer');
	}

	function inputInBlur() {
		console.log('show footer');
	}

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		// if (isStartState) {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
		setStartState(false);
		// }
	}, [chatMsgs]);

	return (
		<>
			<div ref={chatWrapper} className='chat-area-wrapper'>
				<div className='chat-area'>
					{chatMsgs.map((msg: WsMessageRecord, i: number) => {
						return (
							<div style={{ width: '100%' }} key={i}>
								{isDatesDifferent(chatMsgs[i - 1]?.time, msg.time) ? (
									<>
										<div className='date-row'>
											<span>{getDate(msg.time)}</span>
										</div>
									</>
								) : (
									<></>
								)}
								<div className={msg.isCurrentUser ? 'current-user-message-wrapper' : 'message-wrapper'}>
									<div className='message'>
										<span className='msg-owner'>{msg.isCurrentUser ? '' : msg.user}</span>
										<span className='msg-content'>{msg.content}</span>
										<span className='msg-time'>{getTime(msg.time)}</span>
									</div>
									<div ref={messagesEndRef} />
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className='chat-items'>
				<Input
					ref={input}
					value={msg}
					onChange={e => setMsg(e.target.value)}
					onFocus={() => inputInFocus()}
					onBlur={() => inputInBlur()}
					style={{ marginRight: '20px' }}
				/>
				<Button id='sendButton' onClick={post} disabled={!msg.trim()}>
					Отправить
				</Button>
			</div>
		</>
	);
}

export default Sofa;

