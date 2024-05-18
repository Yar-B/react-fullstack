run-dev:
	docker run -d -p 3001:3001 -v "/Users/yaroslavbry/Projects/react-fullstack/server:/app" -v /app/node_modules --rm yarbar/backend
	docker run -d -p 80:80 -v "/Users/yaroslavbry/Projects/react-fullstack/client:/app" -v /app/node_modules --rm yarbar/frontend