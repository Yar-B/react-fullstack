import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { useEffect } from 'react';

const authService = new AuthService();

function Header(props: any) {
	const location = useLocation();

	useEffect(() => {}, [location]);

	function logout() {
		authService.logout().then(() => {
			document.location.reload();
		});
	}

	return (
		<>
			<div className='header'>
				<div className='header-nav'>
					<div className='logo'></div>
					<Link className={'header-link' + (location.pathname === '/' ? ' selected-header-link' : '')} to={'/'}>
						Главная
					</Link>
					<Link className={'header-link' + (location.pathname === '/chat' ? ' selected-header-link' : '')} to={'/chat'}>
						Чат
					</Link>
					<Link
						className={'header-link' + (location.pathname === '/sandbox' ? ' selected-header-link' : '')}
						to={'/sandbox'}
					>
						Песочница
					</Link>
					<Link
						className={'header-link' + (location.pathname === '/crud-example' ? ' selected-header-link' : '')}
						to={'/crud-example'}
					>
						Простой CRUD
					</Link>
					<Link
						className={'header-link' + (location.pathname === '/graphic' ? ' selected-header-link' : '')}
						to={'/graphic'}
					>
						Графика
					</Link>
				</div>
				<div style={{ marginRight: 10 }} className='header-right-part'>
					<span>Логин: {props.currentUserInfo.login}</span>
					<Button size='small' onClick={logout} type='text'>
						Выйти
						<LogoutOutlined />
					</Button>
				</div>
			</div>
		</>
	);
}

export default Header;
