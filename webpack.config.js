const path = require('path')
const { BannerPlugin } = require('./utils/BannerPlugin')
const { getBanner } = require('./utils/getBanner')

module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [new BannerPlugin(getBanner())]
}
