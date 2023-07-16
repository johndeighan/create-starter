#!/usr/bin/env node

import {execSync} from 'child_process';

const repoName = process.argv[2];
const gitCheckoutCmd = `git clone --depth 1 https://github.com/johndeighan/create-starter ${repoName}`;
const installDepsCmd = `cd ${repoName} && npm install`;

const runCmd = (cmd) => {
	try {
		execSync(cmd, {stdio: 'inherit'});
		}
	catch (err) {
		console.error(`Failed to execute ${cmd}`, err);
		return false;
		}
	return true;
	}

console.log(`Cloning starter repo to ${repoName}`);
const checkedOut = runCmd(gitCheckoutCmd);
if (!checkedOut) {
	process.exit(-1);
	}
console.log("Installing dependencies...");
const installed = runCmd(installDepsCmd);
if (!installed) {
	process.exit(-2);
	}
console.log("Success!");
