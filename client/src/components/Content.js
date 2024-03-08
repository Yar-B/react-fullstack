import { Route, Routes } from 'react-router-dom'
import Main from './Main'
import SandBox from './SandBox'

function Content() {
	return (
		<>
			<div className='content-wrapper'>
				<div className='content'>
					<Routes>
						<Route path='/' element={<Main />} />
						<Route path='/sandbox' element={<SandBox />} />
					</Routes>
				</div>
			</div>
		</>
	)
}

export default Content

