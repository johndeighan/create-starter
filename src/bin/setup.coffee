`#!/usr/bin/env node
`
# setup.coffee

import {runCmd} from '@jdeighan/base-utils'

repoName = process.argv[2]
gitURL = "https://github.com/johndeighan/create-starter"

console.log "Cloning starter repo to #{repoName}"
checkedOut = runCmd "git clone --depth 1 #{gitURL} #{repoName}"
if ! checkedOut
	console.log "checkout failed"
	process.exit -1

console.log "Installing dependencies..."
installed = runCmd "cd #{repoName} && npm install"
if ! installed
	console.log "dependency install failed"
	process.exit -2
console.log "Success!"
console.log "Please run:"
console.log "   cd #{repoName}"
console.log "   npm run dev"
