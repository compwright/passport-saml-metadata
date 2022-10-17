.DEFAULT_GOAL := test

lint:
	node_modules/.bin/standard src/*.js src/**/*.js test/*.js test/**/*.js --fix

test:
	node_modules/.bin/jest

release: lint test
	node_modules/.bin/standard-version
