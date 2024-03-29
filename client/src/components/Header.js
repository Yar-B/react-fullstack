import { Link } from 'react-router-dom'

function Header() {
	return (
		<>
			<div className='header'>
				<div className='logo'></div>
				<Link className='header-link' to={'/'}>
					Главная
				</Link>
				<Link className='header-link' to={'/sandbox'}>
					Песочница
				</Link>
				<Link className='header-link' to={'/crud-example'}>
					Простой CRUD
				</Link>
			</div>
		</>
	)
}

export default Header

