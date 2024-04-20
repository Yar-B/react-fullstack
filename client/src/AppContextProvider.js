import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import LoginForm from './LoginForm'
import App from './App'
import { useEffect, useState } from 'react'
import { AuthService } from './services/auth.service'

const authService = new AuthService()

function AppContextProvider() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [loading, setLoading] = useState(false)
	const [userName, setUserName] = useState('')

	function fetchData() {
		setLoading(true)
		authService.prolongSession().then(res => {
			if (res.success) {
				setUserName(res.login)
				setIsLoggedIn(true)
			}
			setLoading(false)
		})
	}

	useEffect(() => {
		fetchData()
	}, [])
	return (
		<>
			{!loading ? (
				isLoggedIn ? (
					<App userName={userName} />
				) : (
					<LoginForm setUserName={v => setUserName(v)} setIsLoggedIn={() => setIsLoggedIn(true)} />
				)
			) : (
				<>
					<Spin
						indicator={<LoadingOutlined style={{ fontSize: 100 }} />}
						style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
					/>
				</>
			)}
		</>
	)
}

export default AppContextProvider

