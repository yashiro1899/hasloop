REQUIRED = --require should

TESTS = test/application/*

test:
	@NODE_ENV=test ./node_modules/.bin/mocha $(TESTS) $(OPT)

.PHONY: test
