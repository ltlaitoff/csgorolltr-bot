// ==UserScript==
// @name         CSGOrolltr-bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bot for csgorolltr.com
// @author       ltlaitoff
// @match        https://www.csgorolltr.com/en/withdraw/csgo/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

'use strict'

/*
	BUTTONS:
	Start/stop: 
	Find yellow flash
	Find green flash // Default
	Enable/disable AUTO_WITHDRAW p
*/

/* Application main variables */
const BOT_NAME = 'CSGOrolltr-bot'
const DELAY = 1000
const AUTO_WITHDRAW = false
const UNTRACKED_NAMES = []

const DEV = true
const LOGS = true

/* Get event.code from 'https://www.toptal.com/developers/keycode' website */
const KEYS = {
	startAndStop: 'Equal',
	findGreenFlash: 'KeyG',
	findYellowFlash: 'KeyY',
	findYellowWarning: 'KeyW',
	updateShowStatus: 'KeyU'
}

/* Change only color field */
const FIND_MODES = {
	greenFlash: {
		color: '#4ade80'
	},
	yellowFlash: { color: '#facc15' },
	yellowWarning: {
		color: '#f87171'
	}
}

/* Can change FIND_MODES.greenFlash to FIND_MODES.(...) for set default */
let findMode = FIND_MODES.greenFlash

/* Not touch */
let WORKING = false
let interval = null

const devLog = (message, ...args) => {
	if (DEV) {
		console.debug(`[${BOT_NAME}]: `, message, ...args)
	}
}

const log = (message, ...args) => {
	if (LOGS) {
		console.log(`[${BOT_NAME}]: `, message, ...args)
	}
}

const checkCardIconGetClasses = findMode => {
	if (findMode === FIND_MODES.greenFlash) {
		return 'text-success'
	}

	if (
		findMode === FIND_MODES.yellowFlash ||
		findMode === FIND_MODES.yellowWarning
	) {
		return 'text-warning'
	}
}

const checkCardIconGetIcon = findMode => {
	if (
		findMode === FIND_MODES.yellowFlash ||
		findMode === FIND_MODES.greenFlash
	) {
		return 'assets/icons/flash.svg'
	}

	if (findMode === FIND_MODES.yellowWarning) {
		return 'assets/icons/warning.svg'
	}
}

const checkCardIcon = cardIcon => {
	const classes = checkCardIconGetClasses(findMode)

	devLog('checkCardIcon classes = ', classes)

	if (!cardIcon.classList.contains(classes)) return

	const icon = checkCardIconGetIcon(findMode)

	devLog('checkCardIcon icon = ', icon)

	if (cardIcon.getAttribute('inlinesvg') !== icon) return

	return cardIcon
}

const getCards = () => {
	const cardsGrid = document.getElementsByTagName('cw-withdraw-search-grid')[0]

	if (!cardsGrid) {
		log('Something gonna wrong. Not found cw-withdraw-search-grid')
		devLog(
			'Something gonna wrong. Not found cw-withdraw-search-grid. cardsGrid:',
			cardsGrid
		)
		return
	}

	devLog(cardsGrid)
	const cards = [...cardsGrid.getElementsByTagName('cw-item')]

	devLog(cards)

	cards.forEach(card => {
		const cardIcon = card.querySelector('footer cw-icon')
		devLog('cardIcon: ', cardIcon)

		if (!checkCardIcon(cardIcon)) {
			return
		}

		const cardName = card.querySelector('footer .name')
		devLog('cardName: ', cardName)

		if (UNTRACKED_NAMES.includes(cardName.innerText)) {
			log(`Skip ${cardName.innerText}`)
			return
		}

		devLog('cardClick: ', card)
	})
}

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

	getCards()
	autoWithdraw()
	log('initialized')
}

const main = () => {
	log('initialized')

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
			}

			default:
				return
		}

		updateShowCurrentBotStatus()
	})
}

main()
