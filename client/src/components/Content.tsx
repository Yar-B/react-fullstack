import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main.tsx';
import SandBox from './pages/SandBox.tsx';
import CrudExample from './pages/CrudExample.tsx';
import Chat from './pages/Chat.tsx';
import Graphic from './pages/Graphic';

function Content(props: any) {
	return (
		<>
			<div className='content-wrapper'>
				<div className='content'>
					<Routes>
						<Route path='/' element={<Main />} />
						<Route path='/sandbox' element={<SandBox />} />
						<Route path='/crud-example' element={<CrudExample currentUserInfo={props.currentUserInfo} />} />
						<Route path='/chat' element={<Chat currentUserInfo={props.currentUserInfo} />} />
						<Route path='/graphic' element={<Graphic />} />
					</Routes>
				</div>
			</div>
		</>
	);
}

export default Content;
