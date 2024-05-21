export class ApiService {
	#apiPath = document.location.protocol + '//' + document.location.hostname + ':3001/api'

	#makeRequest(url: string, options: any) {
		return fetch(this.#apiPath + url, {
			...options,
			credentials: 'include'
		}).then(res => res.json())
	}

	get(url: string) {
		return this.#makeRequest(url, { method: 'GET' })
	}

	delete(url: string) {
		return this.#makeRequest(url, { method: 'DELETE' })
	}

	post(url: string, data: any) {
		return this.#makeRequest(url, {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			method: 'POST'
		})
	}
}

