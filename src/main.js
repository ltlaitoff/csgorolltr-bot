import { DELAY, KEYS, FIND_MODES, DEFAULT_FIND_MODE } from './config/config'
import { startAutoGemDrop } from './controllers/auto-gem.controller'
import { autoWithdraw } from './controllers/auto-withdraw.controller'
import { getCards } from './controllers/check-cards/get-cards'
import { startCheckItemIsSell } from './controllers/item-is-sell.contoller'

import { log, devLog } from './helpers'

let WORKING = false
let interval = null
let findMode = DEFAULT_FIND_MODE

const updateShowCurrentBotStatus = () => {
	const button = document.querySelector('[data-cy="trade-withdraw-button"]')

	if (!button) {
		log('Not found trade-withdraw-button')
		return
	}

	const LEFT_COLOR = WORKING === true ? '#16a34a' : '#dc2626'

	button.style.background = `linear-gradient(to left, ${findMode.color} 50%, ${LEFT_COLOR} 50%)`
}

const intervalCallback = () => {
	if (!WORKING) return

	getCards(findMode)
	autoWithdraw()

	log('initialized')
}

/*
	Main
*/
const main = () => {
	log('initialized')

	startAutoGemDrop()
	startCheckItemIsSell()

	setTimeout(() => {
		updateShowCurrentBotStatus()
	}, 1500)

	document.addEventListener('keypress', event => {
		devLog('Pressed key', event.code)

		switch (event.code) {
			case KEYS.startAndStop: {
				if (!WORKING) {
					WORKING = true
					interval = setInterval(intervalCallback, DELAY)

					break
				}

				WORKING = false
				clearInterval(interval)
				interval = null
				break
			}

			case KEYS.findGreenFlash: {
				log('Set findMode to greenFlash')
				findMode = FIND_MODES.greenFlash
				break
			}

			case KEYS.findYellowFlash: {
				log('Set findMode to yellowFlash')
				findMode = FIND_MODES.yellowFlash
				break
			}

			case KEYS.findYellowWarning: {
				log('Set findMode to yellowWarning')
				findMode = FIND_MODES.yellowWarning
				break
			}

			case KEYS.updateShowStatus: {
				log('updateShowStatus')
				updateShowCurrentBotStatus()
				break
			}

			case KEYS.findAll: {
				log('findAll')
				findMode = FIND_MODES.all
				updateShowCurrentBotStatus()
				break
			}

			case KEYS.findGreenFlashAndYellowWarning: {
				log('findGreenFlashAndYellowWarning')
				findMode = FIND_MODES.greenFlashAndYellowWarning
				updateShowCurrentBotStatus()
				break
			}

			default:
				return
		}

		updateShowCurrentBotStatus()
	})
}

main()
