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

		const cardIcon = card.children[0]?.children[2]?.querySelector('.cw-icon')

		if (!cardIcon || !checkCardIcon(cardIcon, findMode)) {
			return
		}

		const cardName = card.querySelector('label').textContent
		const cardBrand =
			card.querySelector('label').previousElementSibling.textContent

		devLog('cardName: ', cardName)
		devLog('cardBrand: ', cardBrand)

		const UNTRACKED_res = checkCardIsUntracked(cardName, cardBrand)

		if (UNTRACKED_res) {
			return
		}

		const cardWear = card.querySelector('.wear')
		devLog('cardWear:', cardWear)

		if (cardWear) {
			const checkWearOnUntracked = checkCardWear(cardWear.innerText)
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
