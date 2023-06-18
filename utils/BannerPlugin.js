class BannerPlugin {
	constructor(options) {
		this.banner = options.banner
	}

	apply(compiler) {
		compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
			compilation.chunks.forEach(chunk => {
				chunk.files.forEach(filename => {
					const asset = compilation.assets[filename]
					asset._value = this.banner + asset._value // append banner
				})
			})

			callback()
		})
	}
}

module.exports = { BannerPlugin }
