REQUIRED = --require should

TESTS = test/*-test.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha $(REQUIRED) $(TESTS)

.PHONY: test