const monthsStrings = [
	['Январь', 'Января'],
	['Февраль', 'Февраля'],
	['Март', 'Марта'],
	['Апрель', 'Апреля'],
	['Май', 'Мая'],
	['Июнь', 'Июня'],
	['Июль', 'Июля'],
	['Август', 'Августа'],
	['Сентябрь', 'Сентября'],
	['Октябрь', 'Октября'],
	['Ноябрь', 'Ноября'],
	['Декабрь', 'Декабря']
];

export function getTime(dateStamp: number | string) {
	const date = new Date(Number(dateStamp));
	const hours: string = date.getHours().toString();
	const minutes: string =
		date.getMinutes() / 10 > 1 ? date.getMinutes().toString() : '0' + date.getMinutes().toString();
	return hours + ':' + minutes;
}

export function getDate(dateStamp: number | string) {
	const date = new Date(Number(dateStamp));
	return new Date().getFullYear() === date.getFullYear()
		? date.getDate() + ' ' + monthsStrings[date.getMonth()][1]
		: date.getDate() + ' ' + monthsStrings[date.getMonth()][1] + ' ' + date.getFullYear();
}

export function isDatesDifferent(prev: number, cur: number): boolean {
	const prevDate = new Date(Number(prev));
	const curDate = new Date(Number(cur));
	const prevDateStr = '' + prevDate.getDate() + prevDate.getMonth() + prevDate.getFullYear();
	const curDateStr = '' + curDate.getDate() + curDate.getMonth() + curDate.getFullYear();
	return prevDateStr !== curDateStr;
}

