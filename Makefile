.DEFAULT_GOAL := build

lint:
	node_modules/.bin/standard src --fix

test: lint
	NODE_OPTIONS=--experimental-vm-modules node_modules/.bin/jest --rootDir src

build: test
	node_modules/.bin/unbuild

release: test
	node_modules/.bin/standard-version
