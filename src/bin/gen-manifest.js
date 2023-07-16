// gen-manifest.coffee
var fname;

import {
  undef
} from '@jdeighan/base-utils';

import {
  genManifest
} from '@jdeighan/svelte-utils';

fname = (await genManifest({
  appName: 'Super App',
  appShortName: 'Super',
  developerName: 'John Deighan'
}));

console.log(`Manifest file at ${fname}`);
