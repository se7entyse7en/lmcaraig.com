build:
	gatsby build

publish-beta: build
	surge public beta.lmcaraig.com

publish: build
	surge public lmcaraig.com
