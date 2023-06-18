import { devLog, log } from '../../helpers/logs'
import { UNTRACKED, UNTRACKED_WEAR, ITEMS_PER_CYCLE } from '../../config/config'
import { checkCardIcon } from './check-card-icon'

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

const getCards = findMode => {
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

		if (!checkCardIcon(cardIcon, findMode)) {
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

export { getCards }
