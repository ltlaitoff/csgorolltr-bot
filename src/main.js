import {
	DELAY,
	AUTO_WITHDRAW,
	ITEMS_PER_CYCLE,
	TELEGRAM_BOT_TOKEN,
	TELEGRAM_BOT_USER,
	KEYS,
	FIND_MODES,
	DEFAULT_FIND_MODE,
	UNTRACKED_WEAR,
	UNTRACKED
} from './config/config'

import { log, devLog } from './helpers'

let WORKING = false
let interval = null
let findMode = DEFAULT_FIND_MODE

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

const checkCardIsUntracked = (cardName, cardBrand) => {
	devLog('checkCardIsUntracked: cardName', cardName)
	devLog('checkCardIsUntracked: cardBrand', cardBrand)

	return UNTRACKED.reduce((acc, untrackedItem) => {
		if (acc === true) return acc

		if (untrackedItem.name === null && untrackedItem.brand === null) {
			return acc
		}

		let resultName = false
		let resultBrand = false

		// console.log(cardName)

		if (untrackedItem.name?.length === 0) {
			untrackedItem.name = null
		}

		if (untrackedItem.brand?.length === 0) {
			untrackedItem.brand = null
		}

		if (untrackedItem.name !== null) {
			resultName = cardName.trim().includes(untrackedItem.name.trim())
		}

		if (untrackedItem.brand !== null) {
			resultBrand = cardBrand.trim().includes(untrackedItem.brand.trim())
		}

		devLog(
			`untrackedItem (${untrackedItem.name} | ${untrackedItem.brand}):\t| ${acc}`
		)

		if (untrackedItem.name !== null && untrackedItem.brand !== null) {
			return acc || (resultName && resultBrand)
		}

		if (untrackedItem.name !== null && untrackedItem.brand === null) {
			return acc || resultName
		}

		if (untrackedItem.name === null && untrackedItem.brand !== null) {
			return acc || resultBrand
		}

		return false
	}, false)
}

const checkCardWear = wear => {
	return UNTRACKED_WEAR.reduce((acc, item) => {
		if (acc) return acc

		const preparedItem = item.trim().toLowerCase()

		const preparedBaseWear = wear.trim().toLowerCase()

		const splitedWear = preparedBaseWear.split(' - ')

		if (splitedWear.length === 1) {
			return acc || preparedItem === preparedBaseWear
		}

		const preparedFirstWear = splitedWear[0].trim().toLowerCase()

		return acc || preparedItem === preparedFirstWear
	}, false)
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
	const cards = [
		...cardsGrid.querySelectorAll('cw-csgo-market-item-card .content')
	]

	devLog(cards)

	let counter = 0

	cards.forEach(card => {
		if (counter === ITEMS_PER_CYCLE) return

		const cardIcon = card.children[0].children[2].querySelector('.cw-icon')

		if (!checkCardIcon(cardIcon)) {
			return
		}

		const cardName = card.querySelector('label').textContent
		const cardBrand =
			card.querySelector('label').previousElementSibling.textContent

		devLog('cardName: ', cardName)
		devLog('cardBrand: ', cardBrand)

		const UNTRACKED_res = checkCardIsUntracked(cardName, cardBrand)
		// console.log(
		// 	'🚀 ~ file: bot.js:265 ~ getCards ~ UNTRACKED_res:',
		// 	cardName,
		// 	cardBrand,
		// 	UNTRACKED_res
		// )

		if (UNTRACKED_res) {
			return
		}

		const cardWear = card.querySelector('.wear')
		devLog('cardWear:', cardWear)
		// console.log('🚀 ~ file: bot.js:285 ~ getCards ~ cardWear:', cardWear)

		if (cardWear) {
			const checkWearOnUntracked = checkCardWear(cardWear.innerText)
			console.log(
				'🚀 ~ file: bot.js:304 ~ getCards ~ checkWearOnUntracked:',
				checkWearOnUntracked
			)

			// console.log(
			// 	'🚀 ~ file: bot.js:289 ~ getCards ~ checkWearOnUntracked:',
			// 	checkWearOnUntracked
			// )

			if (checkWearOnUntracked) {
				return
			}
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

/*
	checkItemIsSell
*/

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

/*
	Auto gem block
*/

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
			new setTimeout(() => res(), 60000)
		})
	}

	return Promise.resolve()
}

/* 
	Set tg message
*/

const sendTelegramBotMessage = text => {
	const date = new Date(Date.now())
	const currentTime = `${
		date.getUTCHours() - date.getTimezoneOffset() / 60
	}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`

	const textForSend = `[${currentTime}] ${text}`

	fetch(
		`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_BOT_USER}&text=${textForSend}`,
		{
			method: 'POST'
		}
	)
}

/*
	Main
*/
const main = () => {
	log('initialized')

	setTimeout(async function autoGemDropFunction() {
		await autoGemDrop()

		setTimeout(autoGemDropFunction, 5000)
	}, 5000)

	setTimeout(async function checkItemIsSellFunction() {
		checkItemIsSell()

		setTimeout(checkItemIsSellFunction, 5000)
	}, 5000)

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
