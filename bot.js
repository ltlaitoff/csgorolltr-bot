// ==UserScript==
// @name         CSGOrolltr-bot
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Bot for csgorolltr.com
// @author       ltlaitoff
// @match        https://www.csgorolltr.com/en/withdraw/csgo/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

'use strict'

/* Application main variables */
const BOT_NAME = 'CSGOrolltr-bot'
const DELAY = 1000
const AUTO_WITHDRAW = false

// Add item type and item name filtration
/*
Format:
const UNTRACKED = [
	{
		name: '',
		brand: ''
	}
]

Use null for notFilter by field

{
	name: null,
	brand: 'sticker'
}
*/
const UNTRACKED = [
	{
		name: null,
		brand: null
	},
	{
		name: null,
		brand: null
	},
	{
		name: null,
		brand: null
	},
	{
		name: null,
		brand: null
	},
	{
		name: null,
		brand: null
	},
	{
		name: null,
		brand: null
	},
	{
		name: null,
		brand: null
	}
]

const DEV = true
const LOGS = true

const ITEMS_PER_CYCLE = 2

/* Get event.code from 'https://www.toptal.com/developers/keycode' website */
const KEYS = {
	startAndStop: 'Equal',
	findGreenFlash: 'KeyG',
	findYellowFlash: 'KeyY',
	findYellowWarning: 'KeyW',
	findAll: 'KeyA',
	findGreenFlashAndYellowWarning: 'KeyB',
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
	},
	all: {
		color: '#f3f4f6'
	},
	greenFlashAndYellowWarning: {
		color: '#7dd3fc'
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

const _checkOnGreenFlash = (iconClassList, inlinesvg) => {
	return (
		iconClassList.contains('text-success') &&
		inlinesvg === 'assets/icons/flash.svg'
	)
}

const _checkOnYellowFlash = (iconClassList, inlinesvg) => {
	return (
		iconClassList.contains('text-warning') &&
		inlinesvg === 'assets/icons/flash.svg'
	)
}

const _checkOnYellowWarning = (iconClassList, inlinesvg) => {
	return (
		iconClassList.contains('text-warning') &&
		inlinesvg === 'assets/icons/warning.svg'
	)
}

const checkCardIcon = cardIcon => {
	if (findMode === FIND_MODES.all) {
		return cardIcon
	}

	const iconClassList = cardIcon.classList
	const inlinesvg = cardIcon.getAttribute('inlinesvg')

	if (
		findMode === FIND_MODES.greenFlash &&
		!_checkOnGreenFlash(iconClassList, inlinesvg)
	) {
		return
	}

	if (
		findMode === FIND_MODES.yellowFlash &&
		!_checkOnYellowFlash(iconClassList, inlinesvg)
	) {
		return
	}

	if (
		findMode === FIND_MODES.yellowWarning &&
		!_checkOnYellowWarning(iconClassList, inlinesvg)
	) {
		return
	}

	if (
		findMode === FIND_MODES.greenFlashAndYellowWarning &&
		!_checkOnGreenFlash(iconClassList, inlinesvg) &&
		!_checkOnYellowWarning(iconClassList, inlinesvg)
	) {
		return
	}

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

	let counter = 0

	cards.forEach(card => {
		if (counter === ITEMS_PER_CYCLE) return

		const cardIcon = card.querySelector('footer cw-icon')
		// devLog('cardIcon: ', cardIcon)

		if (!checkCardIcon(cardIcon)) {
			return
		}

		const cardName = card.querySelector('footer .name').innerText
		const cardBrand = card.querySelector('footer .brand').innerText

		devLog('cardName: ', cardName)
		devLog('cardBrand: ', cardBrand)

		const UNTRACKED_res = UNTRACKED.reduce((acc, untrackedItem) => {
			let result = false

			if (untrackedItem.name !== null) {
				devLog(
					'untrackedItem.name !== null',
					untrackedItem.name,
					cardName,
					untrackedItem.name === cardName
				)

				result = result || untrackedItem.name.trim() === cardName.trim()
			}

			if (untrackedItem.brand !== null) {
				devLog(
					'untrackedItem.brand !== null',
					`'${untrackedItem.brand.trim()}'`,
					`'${cardBrand.trim()}'`,
					untrackedItem.brand.trim() === cardBrand.trim()
				)

				result = result || untrackedItem.brand.trim() === cardBrand.trim()
			}

			devLog('untrackedItem result = ', result)

			return acc || result
		}, false)

		if (UNTRACKED_res) {
			return
		}

		devLog('cardClick: ', card)
		card.click()

		counter++
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
