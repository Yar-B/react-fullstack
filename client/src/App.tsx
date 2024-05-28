import './App.less';
import Content from './components/Content.tsx';
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';

function App(props: any) {
	return (
		<>
			<div className='app'>
				<Header currentUserInfo={props.currentUserInfo} />
				<Content currentUserInfo={props.currentUserInfo} />
				<Footer />
			</div>
		</>
	);
}

export default App;

