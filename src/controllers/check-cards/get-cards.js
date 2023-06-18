import { devLog, log } from '../../helpers/logs'
import { ITEMS_PER_CYCLE } from '../../config/config'
import { checkCardIcon } from './check-card-icon'
import { checkCardIsUntracked } from './check-card-is-untracked'
import { checkCardWear } from './check-card-wear'

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
