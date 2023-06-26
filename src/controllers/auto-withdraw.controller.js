import { AUTO_WITHDRAW } from '../config/config'
import { devLog, log } from '../helpers/logs'

const autoWithdraw = () => {
	if (!AUTO_WITHDRAW) return

	const WITHDRAW_TEXT = 'withdraw'

	const withdraw = document
		.querySelector('cw-trade-sidebar')
		?.querySelector('header')
		?.querySelectorAll('button')

	withdraw.forEach(element => {
		if (element.innerText.toLowerCase() === WITHDRAW_TEXT) {
			log('Click on withdraw')
			devLog('Click on withdraw. Element: ', element)

			element.click()
		}
	})
}

export { autoWithdraw }
