// temp.coffee
var src;

import {
  isDir,
  mkdirSync
} from '@jdeighan/coffee-utils/fs';

src = "./static/favicons";

if (isDir(src)) {
  console.log("exists");
} else {
  console.log("does not exist");
}
