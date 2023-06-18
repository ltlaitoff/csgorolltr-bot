function getBanner() {
	return {
		banner:
			`// ==UserScript==\n` +
			`// @name         CSGOrolltr-bot\n` +
			`// @namespace    http://tampermonkey.net/\n` +
			`// @version      0.2\n` +
			`// @description  Bot for csgorolltr.com\n` +
			`// @author       ltlaitoff\n` +
			`// @match        https://www.csgorolltr.com/en/*\n` +
			`// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\n` +
			`// @grant        none\n` +
			`// ==/UserScript==\n`
	}
}

module.exports = { getBanner }
