import { Link, useLocation } from 'react-router-dom';
import {
	HomeOutlined,
	HomeFilled,
	MessageOutlined,
	MessageFilled,
	BuildOutlined,
	BuildFilled,
	DatabaseOutlined,
	DatabaseFilled
} from '@ant-design/icons';
import { useEffect } from 'react';

function Footer() {
	const location = useLocation();

	useEffect(() => {}, [location]);

	return (
		<>
			<div className='desktop-footer'>
				<a className='footer-link' href='https://github.com/Yar-B/react-fullstack'>
					Репозиторий проекта
				</a>
				<a className='footer-link' href='https://github.com/Yar-B/react-fullstack'>
					Автор проекта
				</a>
			</div>
			<div className='mobile-footer'>
				<div className='footer-nav'>
					<Link className='footer-nav-link' to={'/'}>
						{location.pathname === '/' ? <HomeFilled /> : <HomeOutlined />}
					</Link>
					<Link className='footer-nav-link' to={'/chat'}>
						{location.pathname === '/chat' ? <MessageFilled /> : <MessageOutlined />}
					</Link>
					<Link className='footer-nav-link' to={'/sandbox'}>
						{location.pathname === '/sandbox' ? <BuildFilled /> : <BuildOutlined />}
					</Link>
					<Link className='footer-nav-link' to={'/crud-example'}>
						{location.pathname === '/crud-example' ? <DatabaseFilled /> : <DatabaseOutlined />}
					</Link>
				</div>
			</div>
		</>
	);
}

export default Footer;

