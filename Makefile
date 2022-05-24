.DEFAULT_GOAL := test

changelog:
	github_changelog_generator --user compwright --project passport-saml-metadata && git add CHANGELOG.md && git commit -am "Updating changelog"
	git push origin

lint:
	npx semistandard src/*.js src/**/*.js test/*.js test/**/*.js --fix

test: lint
	npx mocha --recursive --timeout 15000 --exit

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
