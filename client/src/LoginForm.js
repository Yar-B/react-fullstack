import { Button, Form, Input } from 'antd'
import { useState } from 'react'

const validateMessages = {
	required: 'Обязательное поле!'
}

function LoginForm(props) {
	const [isLogin, setIsLogin] = useState(true)
	const [authErrorMessage, setAuthErrorMessage] = useState('')
	const [form] = Form.useForm()

	async function auth() {
		form
			.validateFields()
			.then(() => {
				if (form.getFieldsValue().passwordRepeat) {
					console.log('Регистрация с данными:', form.getFieldsValue())
					setAuthErrorMessage('Такой логин уже есть!')
				} else {
					console.log('Авторизация с данными:', form.getFieldsValue())
					// временный костыль, демонстрирующий работу логина
					if (form.getFieldsValue().login === 'admin' && form.getFieldsValue().password === '123') {
						props.setIsLoggedIn()
					} else {
						setAuthErrorMessage('Не верные логин или пароль!')
					}
				}
			})
			.catch(err => {
				console.log('error', err)
			})
	}

	function changeAuthType() {
		setAuthErrorMessage('')
		setIsLogin(!isLogin)
		form.resetFields()
	}

	async function repeatPasswordFieldValidation(formRecord) {
		const passwordField = formRecord.getFieldValue('password')
		const passwordRepeatField = formRecord.getFieldValue('passwordRepeat')
		if (passwordRepeatField && passwordField !== passwordRepeatField) {
			throw Error('Пароли не совпадают!')
		}
	}

	return (
		<>
			<div className='login-page'>
				<div className='login-form-wrapper'>
					<h1>{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
					<Form
						labelAlign='left'
						labelCol={{ span: 7 }}
						wrapperCol={{ span: 18 }}
						form={form}
						validateMessages={validateMessages}
					>
						<Form.Item
							label='Логин'
							name='login'
							rules={[
								{
									required: true
								}
							]}
						>
							<Input allowClear />
						</Form.Item>
						<Form.Item
							label='Пароль'
							name='password'
							rules={[
								{
									required: true
								}
							]}
						>
							<Input.Password allowClear />
						</Form.Item>
						{!isLogin ? (
							<Form.Item
								label='Повтор'
								name='passwordRepeat'
								rules={[
									{
										required: true
									},
									form => ({
										validator() {
											return repeatPasswordFieldValidation(form)
										}
									})
								]}
							>
								<Input.Password allowClear />
							</Form.Item>
						) : (
							<></>
						)}
					</Form>
					{authErrorMessage ? <div className='auth-error-message'>{authErrorMessage}</div> : <></>}
					<Button type='primary' onClick={auth} style={{ width: 200 }}>
						{isLogin ? 'Войти' : 'Зарегистрироваться'}
					</Button>
					<p>
						{isLogin ? 'Еще не зарегистрированы?🤨' : 'Если есть аккаунт, можете в него войти🤓👉'}
						<Button type='link' onClick={changeAuthType}>
							{isLogin ? 'Зарегистрироваться' : 'Авторизоваться'}
						</Button>
					</p>
				</div>
			</div>
		</>
	)
}

export default LoginForm

