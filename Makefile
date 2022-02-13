.PHONY: all
all: help




## make dev-deploy
dev-deploy:
	@near dev-deploy --wasmFile target/wasm32-unknown-unknown/release/rust_hello_world.wasm --accountId whilesj.testnet

## make login: login into near, needed for deployment
login:
	@near login

## make test: run unit tests
test:
	@cargo test -- --nocapture

## make build: build a version of the package for release to the chain
build:
	@cargo build --target wasm32-unknown-unknown --release

## help: Show help and exit.
help: Makefile
	@echo
	@echo "  Choose a command:"
	@echo
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'
	@echo
