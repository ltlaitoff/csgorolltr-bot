import { AUTO_GEM_DROP_DELAY } from '../config/config'

const AUTO_GEM_DROP_DELAY_ON_CLICK = 60000

const autoGemDrop = () => {
	const messageList = document.getElementsByTagName('cw-giveaway-message-list')
	if (!messageList[0]) return Promise.resolve()

	const buttons = [...messageList[0].querySelectorAll('button')]

	let result = false

	buttons.forEach(button => {
		if (button.innerText.toLowerCase() === 'join giveaway') {
			result = true
			log('Click on join giveaway')
			devLog('Click on join giveaway. Button: ', button)

			button.click()
		}
	})

	if (result) {
		return new Promise(res => {
			new setTimeout(() => res(), AUTO_GEM_DROP_DELAY_ON_CLICK)
		})
	}

	return Promise.resolve()
}

const startAutoGemDrop = () => {
	setTimeout(async function autoGemDropFunction() {
		await autoGemDrop()

		setTimeout(autoGemDropFunction, AUTO_GEM_DROP_DELAY)
	}, AUTO_GEM_DROP_DELAY)
}

export { startAutoGemDrop }
