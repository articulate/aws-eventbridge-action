.DEFAULT_GOAL := act

ifneq ($(wildcard local.mk),)
	include local.mk
endif

act: dist/index.js
	@act -j test
.PHONY: act

package: dist/index.js
.PHONY: package

dist/index.js: src/* package-lock.json
	@echo "re-packaging dist/"
	@npm run build
	@npm run package
