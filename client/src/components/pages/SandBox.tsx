import { Button, Input, Select, Table } from 'antd';
import { useState } from 'react';

const dataSource = [
	{
		key: '1',
		name: 'Ваня',
		age: 32,
		address: '10 Downing Street'
	},
	{
		key: '2',
		name: 'Петя',
		age: 42,
		address: '10 Downing Street'
	}
];

const columns = [
	{
		title: 'Имя',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: 'Возраст',
		dataIndex: 'age',
		key: 'age'
	},
	{
		title: 'Адрес',
		dataIndex: 'address',
		key: 'address'
	}
];

const optionsForSelector: Array<any> = [
	{ value: 'moscow', label: 'Москва' },
	{ value: 'samara', label: 'Самара' },
	{ value: 'sochi', label: 'Сочи' },
	{ value: 'secretCity', label: 'Секретный город', disabled: true }
];

function SandBox() {
	const [counter, setCounter] = useState(0);
	const [city, setCity] = useState('moscow');
	const [inputVal, setInputVal] = useState('');

	function onButtonClick() {
		document
			.querySelector('meta[name="theme-color"]')!
			.setAttribute('content', '#' + Math.floor(Math.random() * 0xffffff).toString(16));
		console.log(getComputedStyle(document.body).getPropertyValue('--main-color'));
		document.documentElement.style.setProperty('--main-color', '#' + Math.floor(Math.random() * 0xffffff).toString(16));
		setCounter(counter + 1);
	}

	function onSelectorChange(value: string) {
		setCity(value);
	}

	function onInputChange(event: any) {
		setInputVal(event.target.value);
	}

	return (
		<>
			<div style={{ marginBottom: 20 }}>
				<span>Компонент кнопки: </span>
				<Button onClick={onButtonClick}>{'Это кнопка роста ' + (counter === 0 ? '' : 'счетчика :)')}</Button>
				<span> Счетчик = {counter}</span>
			</div>
			<div style={{ marginBottom: 20 }}>
				<span>Компонент селектора: </span>
				<Select style={{ width: 150 }} options={optionsForSelector} value={city} onChange={onSelectorChange} />
				&nbsp;
				<span>Полетим в город {optionsForSelector.find(c => c.value == city).label}?✈️</span>
			</div>
			<div style={{ marginBottom: 20 }}>
				<span>Компонент инпута: </span>
				<Input placeholder='Введите текст...' style={{ width: 150 }} onChange={onInputChange} />
				&nbsp;
				<span>{inputVal}</span>
			</div>
			<div>
				<span>Компонент таблицы: </span>
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</>
	);
}

export default SandBox;
