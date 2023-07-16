import adapter from '@sveltejs/adapter-auto';

import preprocess from 'svelte-preprocess';

import {
  coffeePreProcessor
} from '@jdeighan/svelte-utils/preprocessors';

export default {
  kit: {
    adapter: adapter()
  },
  preprocess: {
    script: coffeePreProcessor,
    preprocess: {
      postcss: true
    }
  }
};
