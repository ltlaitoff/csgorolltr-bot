import { AUTO_ITEM_SELL_DELAY } from '../config/config'

const checkItemIsSell = () => {
	const diaglogs = document.getElementsByTagName('cw-deposit-joined-dialog')

	if (diaglogs.length === 0) return
	;[...diaglogs].forEach(dialog => {
		devLog('🚀 ~ file: bot.js:432 ~ checkItemIsSell ~ dialog:', dialog)

		if (!dialog) return

		if (dialog.dataset['csgorolltrBotTgMessage'] === 'true') {
			return
		}

		const h1 = dialog.querySelector('h1')

		if (h1.textContent.toLowerCase() !== 'trade found') {
			devLog('🚀 ~ file: bot.js:439 ~ checkItemIsSell ~ h1:', h1)
			return
		}

		const brand = dialog.querySelector('.brand')?.textContent.trim() || ''
		const name = dialog.querySelector('.name').textContent.trim()

		const button = dialog.querySelector('button')
		if (button.textContent.trim().toLowerCase() !== `yes, i'm ready`) {
			devLog('🚀 ~ file: bot.js:449 ~ checkItemIsSell ~ button:', button)
			return
		}

		sendTelegramBotMessage(`New trade! ${brand}${brand && ' |'} ${name}`)
		dialog.dataset['csgorolltrBotTgMessage'] = true

		return
	})
}

const startCheckItemIsSell = () => {
	setTimeout(async function checkItemIsSellFunction() {
		checkItemIsSell()

		setTimeout(checkItemIsSellFunction, AUTO_ITEM_SELL_DELAY)
	}, AUTO_ITEM_SELL_DELAY)
}

export { startCheckItemIsSell }
