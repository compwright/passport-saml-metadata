.DEFAULT_GOAL := test

changelog:
	github_changelog_generator --user compwright --project passport-saml-metadata && git add CHANGELOG.md && git commit -am "Updating changelog"
	git push origin

lint:
	node_modules/.bin/standard src/*.js src/**/*.js test/*.js test/**/*.js --fix

test: lint
	node_modules/.bin/jest

release-pre: test
	npm version prerelease && npm publish --tag pre
	git push origin --tags

release-patch: test
	npm version patch && npm publish
	git push origin --tags

release-minor: test
	npm version minor && npm publish
	git push origin --tags

release-major: test
	npm version major && npm publish
	git push origin --tags
