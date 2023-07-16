#!/usr/bin/env node
;
var checkedOut, gitURL, installed, repoName, runCmd;

import {
  // setup.coffee
  execSync
} from 'child_process';

// ---------------------------------------------------------------------------
runCmd = (cmd) => {
  var err, result;
  try {
    result = execSync(cmd, {
      stdio: 'pipe',
      windowsHide: true,
      encoding: 'utf8'
    });
    return result || "<STDOUT>";
  } catch (error) {
    err = error;
    console.error(`Failed to execute cmd '${cmd}'`, err);
    return undef;
  }
};

// ---------------------------------------------------------------------------
repoName = process.argv[2];

gitURL = "https://github.com/johndeighan/create-starter";

console.log(`Cloning starter repo to ${repoName}`);

checkedOut = runCmd(`git clone --depth 1 ${gitURL} ${repoName}`);

if (!checkedOut) {
  console.log("checkout failed");
  process.exit(-1);
}

console.log("Installing dependencies...");

installed = runCmd(`cd ${repoName} && npm install`);

if (!installed) {
  console.log("dependency install failed");
  process.exit(-2);
}

console.log("Success!");

console.log("Please run:");

console.log(`   cd ${repoName}`);

console.log("   npm run dev");
