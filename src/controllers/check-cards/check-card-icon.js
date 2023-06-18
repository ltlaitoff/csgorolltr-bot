import { FIND_MODES } from '../../config/config'

const checkOnGreenFlash = (iconClassList, inlinesvg) => {
	return (
		iconClassList.contains('text-success') &&
		inlinesvg === 'assets/icons/flash.svg'
	)
}

const checkOnYellowFlash = (iconClassList, inlinesvg) => {
	return (
		iconClassList.contains('text-warning') &&
		inlinesvg === 'assets/icons/flash.svg'
	)
}

const checkOnYellowWarning = (iconClassList, inlinesvg) => {
	return (
		iconClassList.contains('text-warning') &&
		inlinesvg === 'assets/icons/warning.svg'
	)
}

const checkCardIcon = (cardIcon, findMode) => {
	if (findMode === FIND_MODES.all) {
		return cardIcon
	}

	const iconClassList = cardIcon.classList
	const inlinesvg = cardIcon.getAttribute('inlinesvg')

	if (
		findMode === FIND_MODES.greenFlash &&
		!checkOnGreenFlash(iconClassList, inlinesvg)
	) {
		return
	}

	if (
		findMode === FIND_MODES.yellowFlash &&
		!checkOnYellowFlash(iconClassList, inlinesvg)
	) {
		return
	}

	if (
		findMode === FIND_MODES.yellowWarning &&
		!checkOnYellowWarning(iconClassList, inlinesvg)
	) {
		return
	}

	if (
		findMode === FIND_MODES.greenFlashAndYellowWarning &&
		!checkOnGreenFlash(iconClassList, inlinesvg) &&
		!checkOnYellowWarning(iconClassList, inlinesvg)
	) {
		return
	}

	return cardIcon
}

export { checkCardIcon }
