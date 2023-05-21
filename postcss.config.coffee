import autoprefixer from 'autoprefixer'
import presetEnv from 'postcss-preset-env'
import colorFunction from 'postcss-color-function'

export default {
	plugins: [
		autoprefixer({})
		presetEnv({stage: 1})
		colorFunction({})
		]
	}
