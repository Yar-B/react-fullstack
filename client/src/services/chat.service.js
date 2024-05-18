import { ApiService } from './api.service'

export class ChatService {
	apiService = new ApiService()
	getChat(userId) {
		return this.apiService.get('/chat?userId=' + userId)
	}
}

