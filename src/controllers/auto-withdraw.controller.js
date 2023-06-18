import { AUTO_WITHDRAW } from '../config/config'

const autoWithdraw = () => {
	if (!AUTO_WITHDRAW) return

	const WITHDRAW_CLASSNAME = '.mat-button-wrapper'
	const WITHDRAW_TEXT = 'WITHDRAW'

	document.querySelectorAll(WITHDRAW_CLASSNAME).forEach(element => {
		if (element.innerText === WITHDRAW_TEXT) {
			log('Click on withdraw')
			devLog('Click on withdraw. Element: ', element)

			element.click()
		}
	})
}

export { autoWithdraw }
