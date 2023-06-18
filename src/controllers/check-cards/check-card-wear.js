import { UNTRACKED_WEAR } from '../../config/config'

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

export { checkCardWear }
