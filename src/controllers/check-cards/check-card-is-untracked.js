import { devLog } from '../../helpers/logs'
import { UNTRACKED } from '../../config/config'

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

export { checkCardIsUntracked }
