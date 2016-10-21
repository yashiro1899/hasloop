REQUIRED = --require should

TESTS = test/*-test.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha $(REQUIRED) $(TESTS)

cov:
	@NODE_ENV=test node \
		node_modules/.bin/istanbul cover \
		node_modules/.bin/_mocha \
		-- $(REQUIRED) \
		$(TESTS)

bench:
	@node test/bench.js

.PHONY: test
