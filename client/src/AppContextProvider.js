import LoginForm from './LoginForm'
import App from './App'
import { useState } from 'react'

function AppContextProvider() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	// ...логика, определяющая зарегистрирован пользователь или нет...

	return <>{isLoggedIn ? <App /> : <LoginForm setIsLoggedIn={() => setIsLoggedIn(true)} />}</>
}

export default AppContextProvider

